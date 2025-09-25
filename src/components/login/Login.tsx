import React, { useState } from 'react'
import { login } from '../../api/authApi'
import { setToken } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { IUser, useAuth } from '../../context/AuthContext'
import { jwtDecode } from 'jwt-decode'
import AuthCard from '../shared/AuthCard'

interface ILoginUser {
    sub: string;
    role: "USER"|"ADMIN"
}

const Login:React.FC = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string|null>(null)

    const auth = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login({ username, password });
            console.log('res : ', response)
            setToken(response.token);

            const decoded = jwtDecode<ILoginUser>(response.token);
            console.log('decoded: ', decoded)
            auth?.setUser({
                username: decoded.sub,
                role: decoded.role
            });

            navigate("/dashboard")
            
        } catch (err: any) {
            setError(err.message)
        }
    }

  return (
           <AuthCard title='Login'>
            <form onSubmit={handleSubmit} 
                  className="">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
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
                {error && (
                    <div className="alert alert-danger" role="alert">
                    {error}
                    </div>
                )}
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
       </AuthCard>
  )
}

export default Login