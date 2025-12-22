/* eslint-disable no-magic-numbers */
import { describe, expect, it, vi } from 'vitest';
import { createService } from './service.ts';
import { randomUUID } from 'node:crypto';

const createTestProjectData = () => ({
  lead: 'John Doe',
  name: 'Test Project',
  progress: 0,
  status: 'Active' as const,
});

describe('projects', () => {
  it('should return empty array initially', () => {
    const service = createService();
    const projects = service.get();
    expect(projects).toEqual([]);
  });

  it('should add project and return it', () => {
    const service = createService();
    const newProjectData = createTestProjectData();

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

  it('should return project by id', () => {
    const service = createService();
    const newProjectData = createTestProjectData();

    const created = service.create(newProjectData);
    const found = service.getById(created.id);

    expect(found).toEqual(created);
  });

  it('should return undefined for non-existent id', () => {
    const service = createService();
    const found = service.getById(randomUUID());

    expect(found).toBeUndefined();
  });

  it('should update project fields', () => {
    const service = createService();
    const newProjectData = createTestProjectData();

    const created = service.create(newProjectData);
    const updated = service.update(created.id, { progress: 50, status: 'On Hold' });

    expect(updated).toBeDefined();
    expect(updated!.id).toBe(created.id);
    expect(updated!.progress).toBe(50);
    expect(updated!.status).toBe('On Hold');
    expect(updated!.lead).toBe('John Doe');
    expect(updated!.name).toBe('Test Project');
  });

  it('should refresh updatedAt on update', () => {
    vi.useFakeTimers();
    const service = createService();
    const newProjectData = createTestProjectData();

    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    const created = service.create(newProjectData);

    vi.setSystemTime(new Date('2024-01-02T00:00:00Z'));
    const updated = service.update(created.id, { progress: 50 });

    expect(updated!.updatedAt).not.toBe(created.updatedAt);
    expect(updated!.updatedAt).toBe('2024-01-02T00:00:00.000Z');
    vi.useRealTimers();
  });

  it('should partially update project', () => {
    const service = createService();
    const newProjectData = createTestProjectData();

    const created = service.create(newProjectData);
    const updated = service.update(created.id, { progress: 75 });

    expect(updated!.progress).toBe(75);
    expect(updated!.status).toBe('Active');
    expect(updated!.lead).toBe('John Doe');
    expect(updated!.name).toBe('Test Project');
  });

  it('should handle empty update object', () => {
    vi.useFakeTimers();
    const service = createService();
    const newProjectData = createTestProjectData();

    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    const created = service.create(newProjectData);

    vi.setSystemTime(new Date('2024-01-02T00:00:00Z'));
    const updated = service.update(created.id, {});

    expect(updated).toBeDefined();
    expect(updated!.progress).toBe(0);
    expect(updated!.status).toBe('Active');
    expect(updated!.updatedAt).toBe('2024-01-02T00:00:00.000Z');
    vi.useRealTimers();
  });

  it('should return undefined when updating non-existent project', () => {
    const service = createService();
    const updated = service.update(randomUUID(), { progress: 50 });

    expect(updated).toBeUndefined();
  });

  it('should delete project and return true', () => {
    const service = createService();
    const newProjectData = createTestProjectData();

    const created = service.create(newProjectData);
    const deleted = service.delete(created.id);

    expect(deleted).toBe(true);
    expect(service.getById(created.id)).toBeUndefined();
  });

  it('should return false when deleting non-existent project', () => {
    const service = createService();
    const deleted = service.delete(randomUUID());

    expect(deleted).toBe(false);
  });
});
