import React from 'react';

interface AuthCardProps {
    title: string;
    children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => {
    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default AuthCard;
