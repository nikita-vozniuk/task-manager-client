import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../features/hooks/redux';
import { logout } from '../features/reducers/authSlice';

import Task from '../components/Task';
import TaskForm from '../components/TaskForm';
import Loader from '../components/Loader';

const Tasks: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.auth.user);
    const { isLoading, tasks } = useAppSelector((state) => state.tasks);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-gray-800 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="text-white text-lg mr-4">TASK MANAGER</span>
                    </div>
                    {user && (
                        <div className="relative inline-block text-left ml-auto">
                            <span className="rounded-md shadow-sm">
                                <button
                                    type="button"
                                    className="flex items-center text-white"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <span className="mr-1">{user.email}</span>
                                    <svg
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 4.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>

                            {isMenuOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            <div className="max-w-7xl mx-auto mt-8 p-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
                    onClick={() => setIsFormOpen(true)}
                >
                    Create Task
                </button>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {tasks.map((task, index) => (
                        <li key={index} className="bg-white p-4 rounded-md shadow-md">
                            <Task task={task} />
                        </li>
                    ))}
                </ul>
            </div>
            {isFormOpen && (
                <TaskForm onClose={() => setIsFormOpen(false)} />
            )}
        </div>
    );
};

export default Tasks;
