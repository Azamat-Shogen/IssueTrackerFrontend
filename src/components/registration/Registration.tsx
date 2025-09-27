import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthCard from '../shared/AuthCard';
import { register } from '../../api/authApi';

const Registration: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {

            const response = await register({ username, password });
            console.log("response: ", response)
           

            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => navigate('/login'), 1500);
        } catch (err: any) {
            setError(err.message || "Registration failed");
        }
    };

    return (
        <AuthCard title="Register">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        id="role"
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value as "USER" | "ADMIN")}
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div> */}
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <div className="d-grid">
                    <button type="submit" className="btn btn-success">Register</button>
                </div>
            </form>
            <div className="mt-3 text-center">
            <small>
                Already have an account?{' '}
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
            </small>
            </div>
        </AuthCard>
    );
};

export default Registration;
