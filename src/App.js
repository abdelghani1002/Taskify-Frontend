import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Register from './pages/Register.jsx'
import Logout from './pages/Logout.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
      setEmail(localStorage.getItem('email'));
    }
  }, [isLoggedIn, email, setIsLoggedIn, setEmail]);

  return (
    <div className="App w-full bg-gray-50 dark:bg-gray-800 dark:text-gray-50">
      <BrowserRouter>
        {isLoggedIn && <Header />}
        <Routes>
          <Route path="/" element={<Home email={email} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>} />
          <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>} />
          <Route path="/logout" element={<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App