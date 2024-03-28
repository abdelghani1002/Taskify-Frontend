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
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
      setEmail(localStorage.getItem('email'));
      setUser(localStorage.getItem('user'));
    }
  }, [isLoggedIn, email, setIsLoggedIn, setEmail, setUser]);

  return (
    <div className="App w-full bg-gray-50 dark:bg-gradient-to-r from-indigo-800 to-violet-900 dark:text-gray-50">
      <BrowserRouter>
        {isLoggedIn && <Header user={user}/>}
        <Routes>
          <Route path="/" element={<Home email={email} isLoggedIn={isLoggedIn} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setUser={setUser} setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>} />
          <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setUser={setUser} setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>} />
          <Route path="/logout" element={<Logout isLoggedIn={isLoggedIn} setUser={setUser} setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App