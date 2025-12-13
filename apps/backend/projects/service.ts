interface Project {
  id: string;
  lead: string;
  name: string;
  progress: number;
  status: 'Active' | 'On Hold' | 'Complete' | 'Blocked';
  updatedAt: string;
}

interface ProjectService {
  get: () => Project[];
  create: (project: Project) => Project;
}

export const createService = (initialProjects: Project[] = []): ProjectService => {
  const projects: Project[] = initialProjects;

  return {
    create: (data) => {
      projects.push({ ...data });
      return { ...data };
    },
    get: () => [...projects],
  };
};
