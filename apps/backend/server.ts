import {
  CreateProjectRequestSchema,
  CreateProjectResponseSchema,
  GetProjectsResponseSchema,
} from 'api-contract';
import { H3, readValidatedBody, serve } from 'h3';
import { createService } from './projects.ts';

const projectService = createService();

const app = new H3()
  .get('/api/projects', () => {
    const projects = projectService.get();
    return {
      body: GetProjectsResponseSchema.parse(projects),
      status: 200,
    };
  })
  .post('/api/projects', async (event) => {
    const data = await readValidatedBody(event, CreateProjectRequestSchema);
    const project = projectService.create(data);
    return {
      body: CreateProjectResponseSchema.parse(project),
      status: 201,
    };
  });

serve(app, { port: 3000 });
