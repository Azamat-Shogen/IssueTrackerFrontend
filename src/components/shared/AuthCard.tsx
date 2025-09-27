import React from 'react';

interface AuthCardProps {
    title: string;
    children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => {
    // Determine background class based on title
    const headerBgClass =
        title.toLowerCase() === 'login'
            ? 'bg-primary bg-opacity-50'
            : 'bg-success bg-opacity-50';

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <div className={`p-3 rounded ${headerBgClass}`}>
                   <h2 className="text-center mb-4">{title}</h2>
                </div>
                
                {children}
            </div>
        </div>
    );
};

export default AuthCard;
