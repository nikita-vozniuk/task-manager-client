import axios from 'axios';

import { backendUrl } from '../config';

import { ITask } from '../types';

export const createNewTaskAPI = async (taskData: ITask) => {
    return await axios.post(backendUrl + '/tasks', taskData);
};

export const getAllUserTasksAPI = async (userId: string) => {
    return await axios.post(backendUrl + '/tasks/user', { userId });
};
