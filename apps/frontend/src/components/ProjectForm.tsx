import { useState } from 'react';

interface ProjectFormData {
  name: string;
  lead: string;
  status: 'Active' | 'On Hold' | 'Complete' | 'Blocked';
  progress: number;
}

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  isSubmitting: boolean;
  error: string | undefined;
}

export const ProjectForm = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  error,
}: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    lead: '',
    name: '',
    progress: 0,
    status: 'Active',
  });

  if (!isOpen) {
    return;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Create New Project</h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(event) => {
                    setFormData({ ...formData, name: event.target.value });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="lead" className="block text-sm font-medium text-gray-700 mb-1">
                  Lead
                </label>
                <input
                  type="text"
                  id="lead"
                  value={formData.lead}
                  onChange={(event) => {
                    setFormData({ ...formData, lead: event.target.value });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(event) => {
                    const newStatus = event.target.value;
                    if (
                      newStatus === 'Active' ||
                      newStatus === 'On Hold' ||
                      newStatus === 'Complete' ||
                      newStatus === 'Blocked'
                    ) {
                      setFormData({
                        ...formData,
                        status: newStatus,
                      });
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Complete">Complete</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <div>
                <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
                  Progress (0-100)
                </label>
                <input
                  type="number"
                  id="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      progress: parseInt(event.target.value, 10),
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {error !== undefined && error !== '' && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting && (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                )}
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
