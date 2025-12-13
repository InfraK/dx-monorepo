import { v4 as uuidv4 } from 'uuid';

interface Project {
  id: string;
  lead: string;
  name: string;
  progress: number;
  status: 'Active' | 'On Hold' | 'Complete' | 'Blocked';
  updatedAt: string;
}

type CreateProject = Omit<Project, 'id' | 'updatedAt'>;

interface ProjectService {
  get: () => Project[];
  create: (project: CreateProject) => Project;
}

export const createService = (initialProjects: Project[] = []): ProjectService => {
  const projects: Project[] = initialProjects;

  return {
    create: (data) => {
      const project = { ...data, id: uuidv4(), updatedAt: new Date().toISOString() };
      projects.push(project);
      return { ...project };
    },
    get: () => [...projects],
  };
};
