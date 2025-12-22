import {
  CreateProjectRequestSchema,
  CreateProjectResponseSchema,
  GetProjectByIdResponseSchema,
  GetProjectsResponseSchema,
  ProjectIdParamSchema,
  UpdateProjectRequestSchema,
  UpdateProjectResponseSchema,
} from 'api-contract';
import { H3, HTTPError, getValidatedRouterParams, readValidatedBody } from 'h3';
import { createService } from './service.ts';

const projectService = createService();

export const projects = new H3()
  .get('/', () => {
    const projects = projectService.get();
    return GetProjectsResponseSchema.parse(projects);
  })
  .post('/', async (event) => {
    event.res.status = 201;
    const data = await readValidatedBody(event, CreateProjectRequestSchema);
    const project = projectService.create(data);
    return CreateProjectResponseSchema.parse(project);
  })
  .get('/:id', async (event) => {
    const { id } = await getValidatedRouterParams(event, ProjectIdParamSchema);
    const project = projectService.getById(id);
    if (!project) {
      throw HTTPError.status(404, 'Not Found');
    }
    return GetProjectByIdResponseSchema.parse(project);
  })
  .patch('/:id', async (event) => {
    const { id } = await getValidatedRouterParams(event, ProjectIdParamSchema);
    const data = await readValidatedBody(event, UpdateProjectRequestSchema);
    const project = projectService.update(id, data);
    if (!project) {
      throw HTTPError.status(404, 'Not Found');
    }
    return UpdateProjectResponseSchema.parse(project);
  })
  .delete('/:id', async (event) => {
    const { id } = await getValidatedRouterParams(event, ProjectIdParamSchema);
    const deleted = projectService.delete(id);
    if (!deleted) {
      throw HTTPError.status(404, 'Not Found');
    }
    event.res.status = 204;
  });
