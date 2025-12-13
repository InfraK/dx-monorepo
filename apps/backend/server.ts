import {
  CreateProjectRequestSchema,
  CreateProjectResponseSchema,
  GetProjectsResponseSchema,
} from 'api-contract';
import { H3, readValidatedBody, serve } from 'h3';
import { createProject, getProjects } from './projects.ts';

const app = new H3()
  .get('/api/projects', () => {
    const projects = getProjects();
    return {
      body: GetProjectsResponseSchema.parse(projects),
      status: 200,
    };
  })
  .post('/api/projects', async (event) => {
    const data = await readValidatedBody(event, CreateProjectRequestSchema);
    const project = createProject(data);
    return {
      body: CreateProjectResponseSchema.parse(project),
      status: 201,
    };
  });

serve(app, { port: 3000 });
