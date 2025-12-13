import { describe, expect, it } from 'vitest';
import { createService } from './projects.ts';

describe('projects', () => {
  it('should return empty array initially', () => {
    const service = createService();
    const projects = service.get();
    expect(projects).toEqual([]);
  });

  it('should add project and return it', () => {
    const service = createService();
    const newProject = {
      id: '1',
      lead: 'John Doe',
      name: 'Test Project',
      progress: 0,
      status: 'Active' as const,
      updatedAt: '2025-12-13',
    };

    const result = service.create(newProject);

    expect(result).toEqual(newProject);
  });

  it('should return all created projects', () => {
    const service = createService();
    const project1 = {
      id: '1',
      lead: 'John Doe',
      name: 'Project 1',
      progress: 0,
      status: 'Active' as const,
      updatedAt: '2025-12-13',
    };

    const project2 = {
      id: '2',
      lead: 'Jane Smith',
      name: 'Project 2',
      progress: 50,
      status: 'On Hold' as const,
      updatedAt: '2025-12-13',
    };

    service.create(project1);
    service.create(project2);

    const projects = service.get();
    expect(projects).toEqual([project1, project2]);
  });
});
