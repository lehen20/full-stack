import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { userApi } from './services/api';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userApi.getUsers();
      setUsers(response.data);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Failed to load users. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const response = await userApi.createUser(userData);
      setUsers(prevUsers => [...prevUsers, response.data]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error('Error creating user:', err);
      throw err; // Re-throw to let form handle the error
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const response = await userApi.updateUser(editingUser.id, userData);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === editingUser.id ? response.data : user
        )
      );
      setEditingUser(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error('Error updating user:', err);
      throw err; // Re-throw to let form handle the error
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      await userApi.deleteUser(user.id);
      setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
      setDeleteConfirm(null);
      setError(null);
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteClick = (user) => {
    setDeleteConfirm(user);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      handleDeleteUser(deleteConfirm);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Full Stack User Management</h1>
        <p>React + FastAPI + PostgreSQL</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="close-error">×</button>
          </div>
        )}

        {showForm ? (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
            onCancel={handleFormCancel}
            isEditing={!!editingUser}
          />
        ) : (
          <>
            <div className="actions-bar">
              <button 
                onClick={() => setShowForm(true)} 
                className="btn-primary"
              >
                Add New User
              </button>
              <button 
                onClick={loadUsers} 
                className="btn-secondary"
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            <UserList
              users={users}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              loading={loading}
            />
          </>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Confirm Delete</h3>
              <p>
                Are you sure you want to delete user{' '}
                <strong>{deleteConfirm.first_name} {deleteConfirm.last_name}</strong>?
              </p>
              <p>This action cannot be undone.</p>
              <div className="modal-actions">
                <button onClick={cancelDelete} className="btn-cancel">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;