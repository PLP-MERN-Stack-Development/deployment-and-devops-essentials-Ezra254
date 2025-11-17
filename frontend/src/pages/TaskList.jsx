import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { taskService } from '../services/api'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import './TaskList.css'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sort: '-createdAt'
  })

  useEffect(() => {
    loadTasks()
  }, [filters])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const response = await taskService.getAll(filters)
      setTasks(response.data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      await taskService.delete(id)
      toast.success('Task deleted successfully')
      loadTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="task-list-header">
        <h1>All Tasks</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          + New Task
        </Link>
      </div>

      <div className="filters">
        <select
          className="filter-select"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="filter-select"
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          className="filter-select"
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          <option value="-createdAt">Newest First</option>
          <option value="createdAt">Oldest First</option>
          <option value="title">Title A-Z</option>
          <option value="-title">Title Z-A</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found. Create your first task!</p>
          <Link to="/tasks/new" className="btn btn-primary">
            + New Task
          </Link>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <div key={task._id} className="task-card">
              <div className="task-card-header">
                <Link to={`/tasks/${task._id}/edit`} className="task-title-link">
                  <h3>{task.title}</h3>
                </Link>
                <div className="task-badges">
                  <span className={`status-badge ${task.status}`}>
                    {task.status}
                  </span>
                  <span className={`priority-badge ${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
              </div>

              {task.description && (
                <p className="task-description">{task.description}</p>
              )}

              <div className="task-card-footer">
                <div className="task-meta">
                  {task.dueDate && (
                    <span className="due-date">
                      📅 {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </span>
                  )}
                  <span className="created-date">
                    Created: {format(new Date(task.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="task-actions">
                  <Link
                    to={`/tasks/${task._id}/edit`}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-danger"
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList

