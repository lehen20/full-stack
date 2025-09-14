import React from 'react';

const UserList = ({ users, onEdit, onDelete, loading }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="empty-state">
        <h3>No users found</h3>
        <p>Create your first user to get started.</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h2>Users ({users.length})</h2>
      
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={!user.is_active ? 'inactive-user' : ''}>
                <td>{user.id}</td>
                <td>
                  <div className="user-name">
                    <strong>{user.first_name} {user.last_name}</strong>
                  </div>
                </td>
                <td>
                  <code className="username">{user.username}</code>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <time dateTime={user.created_at}>
                    {formatDate(user.created_at)}
                  </time>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(user)}
                      className="btn-edit"
                      title="Edit user"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="btn-delete"
                      title="Delete user"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;