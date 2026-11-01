import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import About from './pages/About'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import Recognition from './pages/Recognition'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import Chatbot from './components/Chatbot'
import ProtectedRoute from './components/ProtectedRoute'



const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* Public routes - no authentication required */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        {/* Protected routes - require authentication */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recognition" 
          element={
            <ProtectedRoute>
              <Recognition />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } 
        />
      </Routes>
  
      <Footer />
      <Chatbot />
    </BrowserRouter>
  )
}

export default App
