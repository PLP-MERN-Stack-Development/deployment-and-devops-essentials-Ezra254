import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(`${API_URL}/tasks/${editingTask._id}`, formData);
        setSuccess('Task updated successfully!');
      } else {
        await axios.post(`${API_URL}/tasks`, formData);
        setSuccess('Task created successfully!');
      }
      setFormData({ title: '', description: '', completed: false });
      setEditingTask(null);
      fetchTasks();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/tasks/${id}`);
        setSuccess('Task deleted successfully!');
        fetchTasks();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      completed: task.completed,
    });
  };

  const handleCancel = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '', completed: false });
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/tasks/${task._id}`, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      setTimeout(() => setError(null), 3000);
    }
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      (task.description && task.description.toLowerCase().includes(query))
    );
  });

  return (
    <div>
      <div className="header">
        <h1>MERN Stack Task Manager</h1>
        <p>Environment: {process.env.REACT_APP_ENV || 'development'}</p>
      </div>

      <div className="container">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <div className="task-form">
          <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.completed}
                  onChange={(e) =>
                    setFormData({ ...formData, completed: e.target.checked })
                  }
                />
                Completed
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
            {editingTask && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCancel}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="task-list">
          <h2>Tasks ({filteredTasks.length})</h2>
          
          <div className="search-section">
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="btn btn-secondary"
                onClick={() => setSearchQuery('')}
                style={{ marginLeft: '10px' }}
              >
                Clear Search
              </button>
            )}
          </div>

          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="loading">
              {searchQuery
                ? 'No tasks match your search. Try a different query!'
                : 'No tasks found. Create one above!'}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-content">
                  <div className="task-title">{task.title}</div>
                  {task.description && (
                    <div className="task-description">{task.description}</div>
                  )}
                  <span
                    className={`task-status ${
                      task.completed ? 'completed' : 'pending'
                    }`}
                  >
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <div className="task-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => toggleComplete(task)}
                  >
                    {task.completed ? 'Mark Pending' : 'Mark Complete'}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

