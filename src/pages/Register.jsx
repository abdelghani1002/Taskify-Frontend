import { register } from '../API/Auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLogo from '../components/AppLogo';
import '../App.css';
import { Button, DarkThemeToggle, Spinner } from 'flowbite-react';


const Register = ({ isLoggedIn, setUser, setIsLoggedIn, setEmail }) => {
    const navigate = useNavigate();

    const [registering, setRegistring] = useState(false);
    const [values, setValues] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [inputsStyle, setInputsStyle] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [valuesError, setValuesError] = useState({
        errors: [],
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, [isLoggedIn, setUser, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setRegistring(() => true);

        try {
            const response = await register(values.name, values.email, values.password, values.password_confirmation);
            if (!response.data.status) {
                setValuesError({ ...valuesError, errors: response.data.errors });
            } else {
                localStorage.setItem('token', response.data.authorisation.token);
                localStorage.setItem('email', values.email);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setIsLoggedIn(true);
                setEmail(values.email);
                setUser(JSON.stringify(response.data.user));
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
        setRegistring(() => false);
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setValuesError({ ...valuesError, [event.target.name]: '' });
        testRegExp(event.target);
    };

    const testRegExp = (target) => {
        if (target.name === 'name') {
            if (!/^[a-zA-Z\s]*$/.test(target.value)) {
                setValuesError({ ...valuesError, [target.name]: 'Please enter a valid name' });
                setInputsStyle({ ...inputsStyle, [target.name]: 'border-2 border-red-500' });
            } else {
                setValuesError({ ...valuesError, [target.name]: '' });
                setInputsStyle({ ...inputsStyle, [target.name]: 'border-2 border-green-500' });
            }
        }

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

        if (target.name === 'password_confirmation') {
            if (target.value !== values.password) {
                setValuesError({ ...valuesError, [target.name]: 'The confirmation must match the password' });
                setInputsStyle({ ...inputsStyle, [target.name]: 'border-2 border-red-500' });
            } else {
                setValuesError({ ...valuesError, [target.name]: '' });
                setInputsStyle({ ...inputsStyle, [target.name]: 'border-2 border-green-500' });
            }
        }
    }

    return (
        <div className='min-h-screen flex justify-between items-center'>
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

                        {/* Name */}
                        <div className="mt-2">
                            <label htmlFor="name" className="">Name</label>
                            <div className='relative flex items-center'>
                                <input name='name' value={values.name} onChange={handleChange} type="text" placeholder="Enter Name"
                                    className={inputsStyle.name + " w-full pr-4 pl-9 py-2 dark:bg-gray-900 dark:text-gray-300 outline-none focus:outline-none rounded-md shadow-sm"} />
                                <span className="absolute pl-2">
                                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {valuesError.name && <span className='text-red-400'>{valuesError.name}</span>}
                        {valuesError.errors.name && valuesError.errors.name.map((error, index) => (
                            <p key={index} className='text-red-500'>{error}</p>
                        ))}

                        {/* Email */}
                        <div className="mt-2">
                            <label htmlFor="email" className="">Email</label>
                            <div className='relative flex items-center'>
                                <input name='email' value={values.email} onChange={handleChange} type="email" placeholder="Enter Email"
                                    className={inputsStyle.email + " w-full pr-4 pl-9 py-2 dark:bg-gray-900 dark:text-gray-300 outline-none focus:outline-none rounded-md shadow-sm"} />
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
                        {valuesError.errors.email && valuesError.errors.email.map((error, index) => (
                            <p key={index} className='text-red-500'>{error}</p>
                        ))}

                        {/* Password */}
                        <div className="mt-2 ">
                            <label htmlFor="password" className="">Password</label>
                            <div className='relative flex items-center'>
                                <input name='password' value={values.password} onChange={handleChange} type="password" placeholder="Enter Password"
                                    className={inputsStyle.password + " w-full pr-4 pl-9 py-2 dark:bg-gray-900 dark:text-gray-300 outline-none focus:outline-none rounded-md shadow-sm"} />
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
                        {valuesError.errors.password && valuesError.errors.password.map((error, index) => (
                            <p key={index} className='text-red-500'>{error}</p>
                        ))}

                        {/* Password Confirmation */}
                        <div className="mt-2 ">
                            <label htmlFor="password_confirmation" className="">Password_confirmation</label>
                            <div className='relative flex items-center'>
                                <input name='password_confirmation' value={values.password_confirmation} onChange={handleChange} type="password" placeholder="Renter Password"
                                    className={inputsStyle.password_confirmation + " w-full pr-4 pl-9 py-2 dark:bg-gray-900 dark:text-gray-300 outline-none focus:outline-none rounded-md shadow-sm"} />
                                <span className="absolute pl-2">
                                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M10 5a2 2 0 0 0-2 2v3h2.4A7.48 7.48 0 0 0 8 15.5a7.48 7.48 0 0 0 2.4 5.5H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1V7a4 4 0 1 1 8 0v1.15a7.446 7.446 0 0 0-1.943.685A.999.999 0 0 1 12 8.5V7a2 2 0 0 0-2-2Z" clip-rule="evenodd" />
                                        <path fill-rule="evenodd" d="M10 15.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Zm6.5-1.5a1 1 0 1 0-2 0v1.5a1 1 0 0 0 .293.707l1 1a1 1 0 0 0 1.414-1.414l-.707-.707V14Z" clip-rule="evenodd" />
                                    </svg>

                                </span>
                            </div>
                        </div>
                        {valuesError.password_confirmation && <span className='text-red-400'>{valuesError.password_confirmation}</span>}
                        {valuesError.errors.password_confirmation && valuesError.errors.password_confirmation.map((error, index) => (
                            <p key={index} className='text-red-500'>{error}</p>
                        ))}

                        {!registering ?
                            <button type="submit"
                                onClick={handleSubmit}
                                className="px-6 py-2.5 w-full !mt-4 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded active:bg-blue-700">
                                Register
                            </button>
                            :
                            <Button className="w-full !mt-4 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded active:bg-blue-700">
                                <Spinner aria-label="Spinner button example" size="sm" />
                                <span className="pl-3">Registring...</span>
                            </Button>
                        }

                        <hr className='mt-3' />

                        <div className="py-2">
                            <p className='text-sm mb-2'>Already have account ?</p>
                            <span className="flex justify-center text-blue-500 bg-gray-50 dark:text-gray-200 dark:bg-gray-600 rounded-md">
                                <Link to="/login" className="text-md w-full text-center py-2 hover:font-medium rounded-md">
                                    Login
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default Register;