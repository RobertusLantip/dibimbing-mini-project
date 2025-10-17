import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'
import Register from './pages/Register'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoute'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/users/:id" element={<ProtectedRoute><UserDetail /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

export default App
