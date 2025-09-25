import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { getIssues } from '../../api/issuesApi';

function Dashboard() {

const [issues, setIssues] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const auth = useAuth();
 
const username = auth?.user?.username;
const role = auth?.user?.role;

    useEffect(() => {
        if (!auth?.user) return; // wait for user to load

        const fetchIssues = async () => {
            try {
                const data = await getIssues();
                setIssues(data);
                console.log("data is : ", data)
            } catch (err) {
                setError("Failed to fetch issues");
            } finally{
                setLoading(false);
            }
        }

        fetchIssues();
    }, [auth?.user])

    console.log("issues; ", issues);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>
      {auth?.user ? (
        <div className="card p-3">
          <h4>Welcome, <strong>{username}</strong>!</h4>
          <p><strong>Role:</strong> {role}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  )
}

export default Dashboard;