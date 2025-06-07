// import { Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import Calendar from './components/Calendar';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import ErrorBoundary from './components/ErrorBoundary';

// function App() {
//   return (
//     <ErrorBoundary>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//         <Route index element={<Calendar />} />
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//       </Route>
//       </Routes>
//     </ErrorBoundary>
//   );
// }
// export default App;

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Calendar from './components/Calendar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Calendar />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;