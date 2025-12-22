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
  getById: (id: string) => Project | undefined;
  update: (id: string, data: Partial<Omit<Project, 'id' | 'updatedAt'>>) => Project | undefined;
  delete: (id: string) => boolean;
}

export const createService = (initialProjects: Project[] = []): ProjectService => {
  const projects: Project[] = initialProjects;

  return {
    create: (data) => {
      const project = { ...data, id: uuidv4(), updatedAt: new Date().toISOString() };
      projects.push(project);
      return { ...project };
    },
    delete: (id) => {
      const index = projects.findIndex((p) => p.id === id);
      if (index === -1) return false;
      projects.splice(index, 1);
      return true;
    },
    get: () => [...projects],
    getById: (id) => {
      const project = projects.find((p) => p.id === id);
      return project ? { ...project } : undefined;
    },
    update: (id, data) => {
      const project = projects.find((p) => p.id === id);
      if (!project) return;
      Object.assign(project, data, { updatedAt: new Date().toISOString() });
      return { ...project };
    },
  };
};
