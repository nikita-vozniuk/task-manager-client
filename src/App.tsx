import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from './features/hooks/redux';
import { isAuth } from './features/reducers/authSlice';
import { fetchAllUserTasks } from './features/reducers/taskActions';

import Loader from './components/Loader';

import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

function App() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
    const [tasksLoaded, setTasksLoaded] = useState<boolean>(false);

    useEffect(() => {
        const sessionToken = localStorage.getItem('auth-session-token');

        if (sessionToken) {
            dispatch(isAuth({ sessionToken })).then(() => {
                setIsAuthChecked(true);
            });
        } else {
            setIsAuthChecked(true);
        }
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(fetchAllUserTasks(user._id)).then(() => {
                setTasksLoaded(true);
            });
        } else {
            setTasksLoaded(true);
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (user && tasksLoaded) {
            setIsAuthChecked(true);
        }
    }, [user, tasksLoaded]);


    if (!isAuthChecked) {
        return <Loader />;
    }

    return (
        <Router>
            <Routes>
                {!user && <Route path="/" element={<Navigate to="/login" />} />}
                {user && <Route path="/" element={<Tasks />} />}

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
