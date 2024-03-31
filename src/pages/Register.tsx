import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../features/hooks/redux';
import { register } from '../features/reducers/authSlice';

import AuthForm from '../components/AuthForm';
import SuccessPopup from '../components/SuccessPopup';

interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                navigate('/login');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(registerData)).then(() => {
            setShowSuccess(true);
        });
    };

    return (
        <AuthForm title="Register" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={registerData.username}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
                Register
            </button>
            {showSuccess && <SuccessPopup />}
            <div className="mt-4 text-center">
                <span className="text-gray-600">Already have an account?</span>{' '}
                <Link to="/login" className="text-blue-500 hover:text-blue-700 font-bold">
                    Log In
                </Link>
            </div>
        </AuthForm>
    );
};

export default RegisterForm;
