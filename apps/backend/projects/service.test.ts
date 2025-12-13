/* eslint-disable no-magic-numbers */
import { describe, expect, it } from 'vitest';
import { createService } from './service.ts';

describe('projects', () => {
  it('should return empty array initially', () => {
    const service = createService();
    const projects = service.get();
    expect(projects).toEqual([]);
  });

  it('should add project and return it', () => {
    const service = createService();
    const newProjectData = {
      lead: 'John Doe',
      name: 'Test Project',
      progress: 0,
      status: 'Active' as const,
    };

    const result = service.create(newProjectData);

    expect(result).toMatchObject(newProjectData);
    expect(result.id).toBeDefined();
    expect(result.updatedAt).toBeDefined();
    expect(typeof result.id).toBe('string');
    expect(typeof result.updatedAt).toBe('string');
  });

  it('should return all created projects', () => {
    const service = createService();
    const projectData1 = {
      lead: 'John Doe',
      name: 'Project 1',
      progress: 0,
      status: 'Active' as const,
    };

    const projectData2 = {
      lead: 'Jane Smith',
      name: 'Project 2',
      progress: 50,
      status: 'On Hold' as const,
    };

    const created1 = service.create(projectData1);
    const created2 = service.create(projectData2);

    const projects = service.get();
    expect(projects).toHaveLength(2);
    expect(projects).toContainEqual(created1);
    expect(projects).toContainEqual(created2);
  });
});
