import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { taskService } from '../services/api'
import { format } from 'date-fns'
import './Dashboard.css'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [recentTasks, setRecentTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [statsData, tasksData] = await Promise.all([
        taskService.getStats(),
        taskService.getAll({ sort: '-createdAt' })
      ])
      setStats(statsData.data)
      setRecentTasks(tasksData.data.slice(0, 5))
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
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

  const getStatusCount = (status) => {
    if (!stats?.byStatus) return 0
    const statusObj = stats.byStatus.find(s => s._id === status)
    return statusObj ? statusObj.count : 0
  }

  const getPriorityCount = (priority) => {
    if (!stats?.byPriority) return 0
    const priorityObj = stats.byPriority.find(p => p._id === priority)
    return priorityObj ? priorityObj.count : 0
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          + New Task
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-content">
            <h3>{stats?.total || 0}</h3>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-content">
            <h3>{getStatusCount('pending')}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">🔄</div>
          <div className="stat-content">
            <h3>{getStatusCount('in-progress')}</h3>
            <p>In Progress</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">✅</div>
          <div className="stat-content">
            <h3>{getStatusCount('completed')}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Priority Breakdown</h2>
          <div className="priority-stats">
            <div className="priority-item">
              <span className="priority-badge high">High</span>
              <span className="priority-count">{getPriorityCount('high')}</span>
            </div>
            <div className="priority-item">
              <span className="priority-badge medium">Medium</span>
              <span className="priority-count">{getPriorityCount('medium')}</span>
            </div>
            <div className="priority-item">
              <span className="priority-badge low">Low</span>
              <span className="priority-count">{getPriorityCount('low')}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Tasks</h2>
            <Link to="/tasks" className="view-all">View All →</Link>
          </div>
          {recentTasks.length === 0 ? (
            <p className="empty-state">No tasks yet. Create your first task!</p>
          ) : (
            <div className="recent-tasks">
              {recentTasks.map(task => (
                <Link key={task._id} to={`/tasks/${task._id}/edit`} className="recent-task-item">
                  <div className="task-item-header">
                    <h4>{task.title}</h4>
                    <span className={`status-badge ${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                  <div className="task-item-footer">
                    <span className={`priority-badge ${task.priority}`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="due-date">
                        Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

