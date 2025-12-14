import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectForm } from './ProjectForm';
import userEvent from '@testing-library/user-event';

describe('ProjectForm', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(
      <ProjectForm
        isOpen={false}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        isSubmitting={false}
        error={undefined}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render form when isOpen is true', () => {
    render(
      <ProjectForm
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        isSubmitting={false}
        error={undefined}
      />,
    );
    expect(screen.getByText('Create New Project')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Lead')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByLabelText(/Progress/i)).toBeInTheDocument();
  });

  it('should call onSubmit with form data when form is submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <ProjectForm
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={onSubmit}
        isSubmitting={false}
        error={undefined}
      />,
    );

    await user.type(screen.getByLabelText('Name'), 'Test Project');
    await user.type(screen.getByLabelText('Lead'), 'John Doe');
    await user.selectOptions(screen.getByLabelText('Status'), 'On Hold');
    await user.clear(screen.getByLabelText(/Progress/i));
    await user.type(screen.getByLabelText(/Progress/i), '75');

    await user.click(screen.getByRole('button', { name: /Create Project/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      lead: 'John Doe',
      name: 'Test Project',
      progress: 75,
      status: 'On Hold',
    });
  });

  it('should call onClose when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ProjectForm
        isOpen={true}
        onClose={onClose}
        onSubmit={vi.fn()}
        isSubmitting={false}
        error={undefined}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ProjectForm
        isOpen={true}
        onClose={onClose}
        onSubmit={vi.fn()}
        isSubmitting={false}
        error={undefined}
      />,
    );

    const backdrop = screen.getByRole('presentation');
    await user.click(backdrop);

    expect(onClose).toHaveBeenCalled();
  });

  it('should update form fields when user types', async () => {
    const user = userEvent.setup();

    render(
      <ProjectForm
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        isSubmitting={false}
        error={undefined}
      />,
    );

    const nameInput = screen.getByLabelText<HTMLInputElement>('Name');
    const leadInput = screen.getByLabelText<HTMLInputElement>('Lead');

    await user.type(nameInput, 'My Project');
    await user.type(leadInput, 'Jane Doe');

    expect(nameInput.value).toBe('My Project');
    expect(leadInput.value).toBe('Jane Doe');
  });

  it('should display error message when error prop is provided', () => {
    render(
      <ProjectForm
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        isSubmitting={false}
        error="Something went wrong"
      />,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should disable buttons when isSubmitting is true', () => {
    render(
      <ProjectForm
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        isSubmitting={true}
        error={undefined}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    const submitButton = screen.getByRole('button', { name: /Creating/i });

    expect(cancelButton).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
