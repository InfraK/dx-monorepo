import {
  CreateProjectRequestSchema,
  CreateProjectResponseSchema,
  GetProjectsResponseSchema,
} from 'api-contract';
import { H3, readValidatedBody } from 'h3';
import { createService } from './service.ts';

const projectService = createService();

export const projects = new H3()
  .get('/', () => {
    const projects = projectService.get();
    return GetProjectsResponseSchema.parse(projects);
  })
  .post('/', async (event) => {
    const data = await readValidatedBody(event, CreateProjectRequestSchema);
    const project = projectService.create(data);
    return CreateProjectResponseSchema.parse(project);
  });
