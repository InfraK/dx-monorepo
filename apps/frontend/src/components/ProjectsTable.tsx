interface Project {
  id: string;
  name: string;
  lead: string;
  status: 'Active' | 'On Hold' | 'Complete' | 'Blocked';
  progress: number;
  updatedAt: string;
}

interface ProjectsTableProps {
  projects: Project[];
  isLoading: boolean;
}

export const ProjectsTable = ({ projects, isLoading }: ProjectsTableProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No projects yet. Click "New" to create your first project.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Lead
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {project.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{project.lead}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {project.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {project.progress}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(project.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString('en-US', {
    day: 'numeric',
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    month: 'short',
    year: 'numeric',
  });
