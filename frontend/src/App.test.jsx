import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { userApi } from './services/api';

// Mock the API
jest.mock('./services/api', () => ({
  userApi: {
    getUsers: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  },
}));

const mockUsers = [
  {
    id: 1,
    email: 'john@example.com',
    username: 'johndoe',
    first_name: 'John',
    last_name: 'Doe',
    is_active: true,
    created_at: '2023-01-01T00:00:00Z',
  },
  {
    id: 2,
    email: 'jane@example.com',
    username: 'janedoe',
    first_name: 'Jane',
    last_name: 'Doe',
    is_active: false,
    created_at: '2023-01-02T00:00:00Z',
  },
];

describe('App Component', () => {
  beforeEach(() => {
    userApi.getUsers.mockResolvedValue({ data: mockUsers });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders app header', () => {
    render(<App />);
    expect(screen.getByText('Full Stack User Management')).toBeInTheDocument();
    expect(screen.getByText('React + FastAPI + PostgreSQL')).toBeInTheDocument();
  });

  test('loads and displays users on mount', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
    
    expect(userApi.getUsers).toHaveBeenCalledTimes(1);
  });

  test('shows Add New User button', () => {
    render(<App />);
    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });

  test('opens user form when Add New User is clicked', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Add New User')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Add New User'));
    
    await waitFor(() => {
      expect(screen.getByText('Create New User')).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    userApi.getUsers.mockRejectedValue(new Error('API Error'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to load users/)).toBeInTheDocument();
    });
  });

  test('shows loading state', () => {
    userApi.getUsers.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<App />);
    
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  test('refreshes users when refresh button is clicked', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Refresh')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Refresh'));
    
    expect(userApi.getUsers).toHaveBeenCalledTimes(2);
  });

  test('shows empty state when no users', async () => {
    userApi.getUsers.mockResolvedValue({ data: [] });
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('No users found')).toBeInTheDocument();
    });
  });
});