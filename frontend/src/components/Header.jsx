import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation()

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">✓</span>
            <span className="logo-text">Task Manager</span>
          </Link>
          <nav className="nav">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
            >
              Dashboard
            </Link>
            <Link 
              to="/tasks" 
              className={location.pathname === '/tasks' ? 'nav-link active' : 'nav-link'}
            >
              Tasks
            </Link>
            <Link 
              to="/tasks/new" 
              className="nav-link btn btn-primary"
            >
              + New Task
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

