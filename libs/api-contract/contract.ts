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

export const ProjectIdParamSchema = z.object({ id: z.uuid().meta({ format: 'uuid' }) });

export const GetProjectByIdResponseSchema = ProjectSchema;

export const UpdateProjectRequestSchema = ProjectSchema.omit({
  id: true,
  updatedAt: true,
}).partial();

export const UpdateProjectResponseSchema = ProjectSchema;

const ValidationIssueSchema = z.looseObject({
  code: z.string(),
  expected: z.string().optional(),
  message: z.string(),
  path: z.array(z.string()),
  values: z.array(z.string()).optional(),
});

export const ValidationErrorResponseSchema = z.object({
  data: z.object({
    issues: z.array(ValidationIssueSchema),
    message: z.literal('Validation failed'),
  }),
  message: z.literal('Validation failed'),
  status: z.literal(400),
  statusText: z.literal('Validation failed'),
});

const getProjectsOperation: ZodOpenApiOperationObject = {
  operationId: 'getProjects',
  responses: {
    '200': {
      content: {
        'application/json': {
          example: [
            {
              id: '123e4567-e89b-12d3-a456-426614174000',
              lead: 'John Doe',
              name: 'Website Redesign',
              progress: 75,
              status: 'Active',
              updatedAt: '2024-01-15T10:30:00Z',
            },
            {
              id: '987fcdeb-51a2-43f7-9c8d-1234567890ab',
              lead: 'Jane Smith',
              name: 'Mobile App Development',
              progress: 40,
              status: 'On Hold',
              updatedAt: '2024-01-14T14:20:00Z',
            },
          ],
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
        example: {
          lead: 'John Doe',
          name: 'Website Redesign',
          progress: 0,
          status: 'Active',
        },
        schema: CreateProjectRequestSchema,
      },
    },
    required: true,
  },
  responses: {
    '201': {
      content: {
        'application/json': {
          example: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            lead: 'John Doe',
            name: 'Website Redesign',
            progress: 0,
            status: 'Active',
            updatedAt: '2024-01-15T10:30:00Z',
          },
          schema: CreateProjectResponseSchema,
        },
      },
      description: 'Successful creation',
    },
    '400': {
      content: {
        'application/json': {
          schema: ValidationErrorResponseSchema,
        },
      },
      description: 'Validation Error',
    },
  },
  summary: 'Create New Project',
};

const getProjectByIdOperation: ZodOpenApiOperationObject = {
  operationId: 'getProjectById',
  requestParams: {
    path: ProjectIdParamSchema,
  },
  responses: {
    '200': {
      content: {
        'application/json': {
          example: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            lead: 'John Doe',
            name: 'Website Redesign',
            progress: 75,
            status: 'Active',
            updatedAt: '2024-01-15T10:30:00Z',
          },
          schema: GetProjectByIdResponseSchema,
        },
      },
      description: 'Successful operation',
    },
    '400': {
      content: {
        'application/json': {
          schema: ValidationErrorResponseSchema,
        },
      },
      description: 'Validation Error',
    },
    '404': {
      description: 'Project not found',
    },
  },
  summary: 'Get Project By ID',
};

const updateProjectOperation: ZodOpenApiOperationObject = {
  operationId: 'updateProject',
  requestBody: {
    content: {
      'application/json': {
        schema: UpdateProjectRequestSchema,
        example: {
          progress: 85,
          status: 'Active',
        },
      },
    },
    required: true,
  },
  requestParams: {
    path: ProjectIdParamSchema,
  },
  responses: {
    '200': {
      content: {
        'application/json': {
          schema: UpdateProjectResponseSchema,
          example: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            lead: 'John Doe',
            name: 'Website Redesign',
            progress: 85,
            status: 'Active',
            updatedAt: '2024-01-15T11:45:00Z',
          },
        },
      },
      description: 'Successful update',
    },
    '400': {
      content: {
        'application/json': {
          schema: ValidationErrorResponseSchema,
        },
      },
      description: 'Validation Error',
    },
    '404': {
      description: 'Project not found',
    },
  },
  summary: 'Update Project',
};

const deleteProjectOperation: ZodOpenApiOperationObject = {
  operationId: 'deleteProject',
  requestParams: {
    path: ProjectIdParamSchema,
  },
  responses: {
    '204': {
      description: 'Project deleted successfully',
    },
    '400': {
      content: {
        'application/json': {
          schema: ValidationErrorResponseSchema,
        },
      },
      description: 'Validation Error',
    },
    '404': {
      description: 'Project not found',
    },
  },
  summary: 'Delete Project',
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
    '/api/projects/{id}': {
      delete: deleteProjectOperation,
      get: getProjectByIdOperation,
      patch: updateProjectOperation,
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
