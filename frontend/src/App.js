import NavBar from './components/navbar/NavBar';
import './App.css';
import AuthProvider from './hooks/AuthProvider';
import Login from './components/login/Login';
import PrivateRoute from './components/router/route';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route element={<PrivateRoute />}>  
              <Route path='/dashboard' element={<Dashboard />}/>
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
