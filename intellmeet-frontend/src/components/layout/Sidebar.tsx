import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
return ( <aside className="sidebar"> <h2 className="logo">
IntellMeet<span>.</span> </h2>

  <p className="menu-heading">WORKSPACE</p>

  <nav className="sidebar-nav">
    <NavLink to="/" end className="nav-link">
      ▦ Dashboard
    </NavLink>

    <NavLink to="/meetings" className="nav-link">
      ▣ Meetings
    </NavLink>

    <NavLink to="/tasks" className="nav-link">
      ✓ Tasks
    </NavLink>

    <NavLink to="/workspace" className="nav-link">
      ▤ Workspace
    </NavLink>
  </nav>

  <div className="sidebar-bottom">
    <NavLink to="/login" className="nav-link">
      ↪ Sign out
    </NavLink>
  </div>
</aside>

);
}

export default Sidebar;
