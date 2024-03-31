import React, { useState } from 'react';
import { ITask } from '../types';

const Task: React.FC<{ task: ITask }> = ({ task }) => {
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
    const [showUpdatePopup, setShowUpdatePopup] = useState<boolean>(false);
    const [updatedTask, setUpdatedTask] = useState<ITask>(task);

    const handleDelete = () => {};

    const handleUpdate = () => {};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const dateObj: Date = new Date(updatedTask.dueDate);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const formattedDate: string = new Intl.DateTimeFormat("en-US", options).format(dateObj);

    return (
        <div className="border rounded-lg p-6 bg-white shadow-md">
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{updatedTask.title}</h3>
                <p className="text-gray-600 mb-4">{updatedTask.description}</p>
                <p className="text-gray-500 mb-2">Due Date: {formattedDate}</p>
                <p className="text-gray-500 mb-2">Completed: {updatedTask.completed ? 'Yes' : 'No'}</p>
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={() => setShowDeletePopup(true)} className="text-red-500 mr-2">
                    Delete
                </button>
                <button onClick={() => setShowUpdatePopup(true)} className="text-blue-500">
                    Update
                </button>
            </div>
            {showDeletePopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <p>Are you sure you want to delete this task?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShowDeletePopup(false)} className="mr-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="text-red-500 px-4 py-2 bg-red-200 rounded-md hover:bg-red-300">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showUpdatePopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Update Task</h3>
                        <input type="text" name="title" value={updatedTask.title} onChange={handleChange} className="input-field mb-4 px-4 py-2 bg-gray-100 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" />
                        <textarea name="description" value={updatedTask.description} onChange={handleChange} className="input-field mb-4 px-4 py-2 bg-gray-100 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" />
                        <input type="date" name="dueDate" value={updatedTask.dueDate instanceof Date ? updatedTask.dueDate.toISOString().split('T')[0] : ''} onChange={handleChange} className="input-field mb-4 px-4 py-2 bg-gray-100 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" />

                        <div className="flex justify-end">
                            <button onClick={() => setShowUpdatePopup(false)} className="mr-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                                Cancel
                            </button>
                            <button onClick={handleUpdate} className="text-blue-500 px-4 py-2 bg-blue-200 rounded-md hover:bg-blue-300">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Task;
