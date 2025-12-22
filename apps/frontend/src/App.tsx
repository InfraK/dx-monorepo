import { $api } from './lib/api/client';
import { ProjectForm } from './components/ProjectForm';
import { ProjectsTable } from './components/ProjectsTable';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = $api.useQuery('get', '/api/projects');

  const mutation = $api.useMutation('post', '/api/projects', {
    onSuccess: async () => {
      setIsModalOpen(false);
      await queryClient.invalidateQueries({ queryKey: ['get', '/api/projects'] });
    },
  });

  const handleFormSubmit = (formData: {
    name: string;
    lead: string;
    status: 'Active' | 'On Hold' | 'Complete' | 'Blocked';
    progress: number;
  }) => {
    mutation.mutate({
      body: formData,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            New
          </button>
        </div>

        <ProjectsTable projects={data || []} isLoading={isLoading} />

        <ProjectForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          onSubmit={handleFormSubmit}
          isSubmitting={mutation.isPending}
          error={mutation.isError ? mutation.error.message : undefined}
        />
      </div>
    </div>
  );
};
