import React, { ReactNode } from 'react';

interface AuthFormProps {
    title: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, children }) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
                <form className="mb-4" onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
