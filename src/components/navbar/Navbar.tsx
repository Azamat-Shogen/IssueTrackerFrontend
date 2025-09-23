import { NavLink } from 'react-router-dom';
import "./navbar.css";

const Navbar: React.FC = () => {
    const isLoggedIn = false;

    return (
        <nav className='navbar'>
            <ul className="nav-links">
                <li className="nav-logo">
                    <NavLink to="/" className={""}>
                        IssueTracker
                    </NavLink>
                </li>
                {isLoggedIn ? (
                   <>
                    <li>
                      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : undefined}>
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/logout" className={({ isActive }) => isActive ? "active-link" : undefined}>
                        Logout
                      </NavLink>
                    </li>
                   </>
                ) : (
                   <>
                    <li>
                      <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : undefined}>
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : undefined}>
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : undefined}>
                        Register
                      </NavLink>
                    </li>
                   </>
                )}
            </ul>
            {isLoggedIn && (
                <div className='logout-container'>
                    <button className='btn btn-secondary'>Logout</button>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
