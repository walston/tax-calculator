import {Outlet, NavLink} from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <div className="container">
        <nav>
          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "") + " nav-link"}
              >
                Home
              </NavLink>

            </li>
            <li className="nav-item">
              <NavLink
                to="/federal-income-tax-calculator"
                className={({ isActive }) => (isActive ? "active" : "") + " nav-link"}
              >
                Federal Income Tax
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet/>
      </div>
    </>
  )
}

export default Layout
