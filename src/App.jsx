import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Hackathons from './pages/Hackathons';
import HackathonDetail from './pages/HackathonDetail';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import CreateHackathon from './pages/CreateHackathon';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-800">
          <Navbar />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/hackathons"
                element={
                  <PrivateRoute>
                    <Hackathons />
                  </PrivateRoute>
                }
              />

              <Route
                path="/hackathons/:id"
                element={
                  <PrivateRoute>
                    <HackathonDetail />
                  </PrivateRoute>
                }
              />
              <Route
  path="/hackathons/create"
  element={
    <PrivateRoute>
      <CreateHackathon />
    </PrivateRoute>
  }
/>
              <Route
  path="/hackathons/create"
  element={
    <PrivateRoute>
      <CreateHackathon />
    </PrivateRoute>
  }
/>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
