/* eslint-disable no-magic-numbers */
import { type ZodOpenApiOperationObject, createDocument } from 'zod-openapi';
import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.uuid(),
  lead: z.string(),
  name: z.string().min(3).max(100),
  progress: z.number().int().min(0).max(100),
  status: z.enum(['Active', 'On Hold', 'Complete', 'Blocked']),
  updatedAt: z.iso.datetime(),
});

export const CreateProjectRequestSchema = ProjectSchema.omit({ id: true, updatedAt: true });

export const CreateProjectResponseSchema = ProjectSchema;

export const GetProjectsResponseSchema = z.array(ProjectSchema);

const getProjectsOperation: ZodOpenApiOperationObject = {
  operationId: 'getProjects',
  responses: {
    '200': {
      content: {
        'application/json': {
          schema: GetProjectsResponseSchema,
        },
      },
      description: 'Successful operation',
    },
  },
  summary: 'Get All Projects',
};

const createProjectOperation: ZodOpenApiOperationObject = {
  operationId: 'createProject',
  requestBody: {
    content: {
      'application/json': {
        schema: CreateProjectRequestSchema,
      },
    },
  },
  responses: {
    '201': {
      content: {
        'application/json': {
          schema: CreateProjectResponseSchema,
        },
      },
      description: 'Successful creation',
    },
  },
  summary: 'Create New Project',
};

export const openApiDocument = createDocument({
  info: {
    description: 'API for managing project status dashboard',
    title: 'Project API',
    version: '1',
  },
  openapi: '3.1.0',
  paths: {
    '/api/projects': {
      get: getProjectsOperation,
      post: createProjectOperation,
    },
  },
  servers: [
    {
      description: 'Local Endpoint',
      url: 'http://localhost:3000',
    },
    {
      description: 'Prod Endpoint',
      url: 'http://corp.com/prod',
    },
  ],
});

await Bun.write('./dist/openapi.json', JSON.stringify(openApiDocument, undefined, 2));
