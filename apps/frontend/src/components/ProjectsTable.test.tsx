import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectsTable } from './ProjectsTable';

describe('ProjectsTable', () => {
  it('should display loading spinner when isLoading is true', () => {
    render(<ProjectsTable projects={[]} isLoading={true} />);
    const spinner = screen.getByLabelText('loading');
    expect(spinner).toBeInTheDocument();
  });

  it('should display empty state message when projects array is empty', () => {
    render(<ProjectsTable projects={[]} isLoading={false} />);
    expect(screen.getByText(/No projects yet/i)).toBeInTheDocument();
  });

  it('should render table with project data when projects are provided', () => {
    const projects = [
      {
        id: '1',
        lead: 'John Doe',
        name: 'Test Project',
        progress: 50,
        status: 'Active' as const,
        updatedAt: '2025-01-15T10:00:00Z',
      },
    ];

    render(<ProjectsTable projects={projects} isLoading={false} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should format dates correctly in the table', () => {
    const projects = [
      {
        id: '1',
        lead: 'John Doe',
        name: 'Test Project',
        progress: 50,
        status: 'Active' as const,
        updatedAt: '2025-01-15T10:00:00Z',
      },
    ];

    render(<ProjectsTable projects={projects} isLoading={false} />);
    const formattedDate = screen.getByText(/Jan/i);
    expect(formattedDate).toBeInTheDocument();
  });
});
