// import { useAuth } from '../contexts/AuthContext';
// import { Link } from 'react-router-dom';

// export default function Layout({ children }) {
//   console.log('Layout children:', children);
//   const { user, logout } = useAuth();
//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <nav>
//           <Link to="/" className="logo">PetDaycare</Link>
//           <div className="nav-links">
//             {user ? (
//               <button onClick={logout} className="nav-button">Logout</button>
//             ) : (
//               <>
//                 <Link to="/login" className="nav-link">Login</Link>
//                 <Link to="/register" className="nav-link">Register</Link>
//               </>
//             )}
//           </div>
//         </nav>
//       </header>
//       <main>{children}</main>
//     </div>
//   );
// }

import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-container">
      <header className="app-header">
        <nav>
          <Link to="/" className="logo">PetDaycare</Link>
          <div className="nav-links">
            {user ? (
              <button onClick={logout} className="nav-button">Logout</button>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet /> {/* This renders the child routes */}
      </main>
    </div>
  );
}