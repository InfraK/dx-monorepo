import { $api } from './lib/api/client';

export const App = () => {
  const { data, isLoading } = $api.useQuery('get', '/api/projects');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Projects</h1>
      <ul>
        {data?.map((project) => (
          <li key={project.id}>
            {project.name} - {project.status}
          </li>
        ))}
      </ul>
    </div>
  );
};
