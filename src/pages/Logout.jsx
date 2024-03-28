import { useNavigate } from "react-router-dom";
import { logout } from "../API/Auth";


export default function Logout({ isLoggedIn, setUser, setIsLoggedIn, setEmail }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    let LogOut = async () => {
        try {
            const response = await logout(token);
            if (response.data.status) {
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                setEmail('');
                setUser(null);
                navigate('/login');
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (!isLoggedIn || !token) {
        navigate('/login');
    } else {
        LogOut(); 
    }
    
    return null;
}