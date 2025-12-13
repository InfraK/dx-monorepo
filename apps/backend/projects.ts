interface Project {
  id: string;
  lead: string;
  name: string;
  progress: number;
  status: 'Active' | 'On Hold' | 'Complete' | 'Blocked';
  updatedAt: string;
}

const projects: Project[] = [];

export const getProjects = (): Project[] => projects;

export const createProject = (data: Project): Project => {
  projects.push(data);
  return data;
};
