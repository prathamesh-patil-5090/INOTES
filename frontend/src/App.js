import NavBar from './components/navbar/NavBar';
import './App.css';
import AuthProvider from './hooks/AuthProvider';
import Login from './components/login/Login';
import Register from './components/register/Register';
import PrivateRoute from './components/router/route';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './components/notes/Notes';
import Profile from './components/profile/Profile'; 

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Notes />}/>
              <Route path='/profile' element={<Profile />}/>
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
