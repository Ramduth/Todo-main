import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Reg = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (error) setError('');
    };

    const url = "https://todo-main-backend2.onrender.com";

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            setError('Please fill in all fields');
            return false;
        }
        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone.replace(/[-()\s]/g, ''))) {
            setError('Please enter a valid 10-digit phone number');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await axios.post(url + "/userreg", formData);
            navigate('/');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError(err.response.data.message || 'Email is already registered');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-[85vh] md:min-h-screen w-full px-4">
            <form
                className=" p-10 rounded-xl shadow-lg w-full max-w-xl "
                onSubmit={handleSubmit}
            >
                <div className="text-center">
                    <p className="text-black text-2xl font-bold ">
                        Create Account
                    </p>

                    <p className="text-slate-500 text-base">
                        Get started with your new account
                    </p>
                </div>



                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="block text-slate-700 font-medium text-sm">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className="w-full p-2 border-2 border-slate-200 rounded-md text-base transition focus:outline-none focus:border-blue-600 focus:bg-white bg-slate-50 placeholder:text-slate-400"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="block text-slate-700 font-medium text-sm">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="w-full p-2 border-2 border-slate-200 rounded-md text-base transition focus:outline-none focus:border-blue-600 focus:bg-white bg-slate-50 placeholder:text-slate-400"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="phone" className="block text-slate-700 font-medium text-sm">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            className="w-full p-2 border-2 border-slate-200 rounded-md text-base transition focus:outline-none focus:border-blue-600 focus:bg-white bg-slate-50 placeholder:text-slate-400"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="block text-slate-700 font-medium text-sm">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="w-full p-2 border-2 border-slate-200 rounded-md text-base transition focus:outline-none focus:border-blue-600 focus:bg-white bg-slate-50 placeholder:text-slate-400"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-600 text-sm mt-2 text-center p-2 bg-red-50 rounded-md mb-4">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className={`w-full py-3 rounded-md text-white font-semibold text-base transition duration-300 h-12 font-mono ${isLoading
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 shadow-md active:translate-y-0'
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="text-center mt-6 pt-6 border-t border-slate-200">
                    <a href="/" className="text-blue-600 text-sm font-medium hover:underline hover:text-blue-700">
                        Already have an account? Login here
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Reg;
