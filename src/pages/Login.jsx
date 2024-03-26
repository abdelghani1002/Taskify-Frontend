import { login } from '../API/Auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLogo from '../components/AppLogo';
import '../App.css';
import { Button, DarkThemeToggle, Spinner } from 'flowbite-react';


const Login = ({ isLoggedIn, setIsLoggedIn, setEmail }) => {
    const navigate = useNavigate();

    const [loggingIn, setLoggingIn] = useState(false);
    const [values, setValues] = useState({ email: '', password: '' });
    const [inputsStyle, setInputsStyle] = useState({ email: '', password: '' });
    const [valuesError, setValuesError] = useState({
        credentials: '',
        errors: [],
        email: '',
        password: ''
    });

    useEffect(() => {
        console.log("is logged in : " + isLoggedIn);
        if (isLoggedIn) navigate('/');
    }, [values, inputsStyle, valuesError, isLoggedIn, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoggingIn(() => true);

        try {
            const response = await login(values.email, values.password);
            if (response.data.status) {
                localStorage.setItem('token', response.data.authorisation.token);
                localStorage.setItem('email', values.email);
                setIsLoggedIn(true);
                setEmail(values.email);
                navigate('/');
            } else {
                // Handle errors
                setValuesError({ ...valuesError, errors: response.data.errors });
                setValuesError({ ...valuesError, credentials: response.data.message });
                console.log(valuesError.credentials);
            }
        } catch (error) {
            console.error(error);
        }
        setLoggingIn(() => false);
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setValuesError({ ...valuesError, [event.target.name]: '' });
        testRegExp(event.target);
    };

    const testRegExp = (target) => {
        if (target.name === 'email') {
            if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(target.value)) {
                setValuesError({ ...valuesError, [target.name]: 'Please enter a valid email' });
                setInputsStyle({ ...inputsStyle, [target.name]: 'border-2 border-red-500' });
            } else {
                setValuesError({ ...valuesError, [target.name]: '' });
                setInputsStyle({ ...inputsStyle, [target.name]: 'border-2 border-green-500' });
            }
        }

        if (target.name === 'password') {
            if (target.value.length < 8) {
                setValuesError({ ...valuesError, [target.name]: 'The password must be 8 characters or longer' });
                setInputsStyle({ ...inputsStyle, [target.name]: 'border-2 border-red-500' });
            } else {
                setValuesError({ ...valuesError, [target.name]: '' });
                setInputsStyle({ ...inputsStyle, [target.name]: 'border-2 border-green-500' });
            }
        }
    }

    return (
        <div className='h-screen flex justify-between items-center'>
            <div className='absolute right-1 top-1'>
                <DarkThemeToggle className='mr-2 hover:bg-transparent focus:ring-0 dark:hover:bg-transparent'/>
            </div>
            {
                !isLoggedIn && <div className="w-full md:w-1/2 lg:w-1/3 m-auto">
                    <div className='mb-3'>
                        <AppLogo />
                    </div>
                    <form
                        id='loginForm'
                        onSubmit={handleSubmit}
                        className="mx-auto border dark:border-gray-500 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">

                        {valuesError.errors.forEach(error => {
                            <p className='text-center text-red-500'>{error}</p>
                        })}
                        {valuesError.credentials && <p className='text-center text-red-500'>{valuesError.credentials}</p>}

                        {/* Email */}
                        <div className="mt-4">
                            <label htmlFor="email" className="">Email</label>
                            <div className='relative flex items-center'>
                                <input name='email' value={values.email} onChange={handleChange} type="email" placeholder="Enter Email"
                                    className={inputsStyle.email + " w-full pr-4 pl-9 py-3 dark:bg-gray-900 dark:text-gray-300 outline-none focus:outline-none rounded-md shadow-sm"} />
                                <span className="absolute pl-2">
                                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-200" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                            d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {valuesError.email && <span className='text-red-400'>{valuesError.email}</span>}

                        {/* Password */}
                        <div className="mt-4 ">
                            <label htmlFor="password" className="">Password</label>
                            <div className='relative flex items-center'>
                                <input name='password' value={values.password} onChange={handleChange} type="password" placeholder="Enter Password"
                                    className={inputsStyle.password + " w-full pr-4 pl-9 py-3 dark:bg-gray-900 dark:text-gray-300 outline-none focus:outline-none rounded-md shadow-sm"} />
                                <span className="absolute pl-2">
                                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-200" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path fillRule="evenodd"
                                            d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                                            clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {valuesError.password && <span className='text-red-400'>{valuesError.password}</span>}

                        {!loggingIn ?
                            <button type="submit"
                                onClick={handleSubmit}
                                className="px-6 py-2.5 w-full !mt-8 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded active:bg-blue-700">
                                Login
                            </button>
                            :
                            <Button className="w-full !mt-8 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded active:bg-blue-700">
                                <Spinner aria-label="Spinner button example" size="sm" />
                                <span className="pl-3">Logging...</span>
                            </Button>
                        }

                        <hr className='mt-4' />

                        <div className="py-3">
                            <p className='text-sm mb-2'>Don't have an account ?</p>
                            <span className="flex justify-center text-blue-500 bg-gray-50 dark:text-gray-200 dark:bg-gray-600 rounded-md">
                                <Link to="/register" className="text-md w-full text-center py-2 hover:font-medium rounded-md">
                                    Create new account
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default Login;