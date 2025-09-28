import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getIssues } from "../../api/issuesApi";
import { Issue } from "../../types";
import "./dashboard.css";


function Dashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const auth = useAuth();

  const username = auth?.user?.username;
  const role = auth?.user?.role;

  useEffect(() => {
    if (!auth?.user) return;

    const fetchIssues = async () => {
      try {
        const data = await getIssues();
        setIssues(data);
      } catch {
        setError("Failed to fetch issues");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [auth?.user]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        {role === "USER" && (
            <Link to="/create" className="btn btn-primary">
          + Create Issue
        </Link>
        )}
        
      </div>

      {auth?.user ? (
        <>
          {/* User Info */}
         <div
            className={`card p-4 mb-4 shadow-sm ${
                role === "ADMIN" ? "bg-dark text-white" : "bg-light"
            }`}
            >
            <h4 className="mb-2">
                👋 Welcome, <strong>{username}</strong>!
            </h4>
            <p className="mb-0">
                <strong>Role:</strong>{" "}
                <span className={`badge ${role === "ADMIN" ? "bg-danger" : "bg-primary"}`}>
                {role}
                </span>
            </p>
        </div>

          {/* Loading / Error / No Issues */}
          {loading && <p>Loading issues...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && issues.length === 0 && <p>No issues found.</p>}

          {/* Issues Table */}
          {!loading && issues.length > 0 && (
            <div className="table-responsive border rounded"
             style={{ maxHeight: '400px', overflowY: 'auto'}}
            >
              <table className="table table-striped table-hover shadow-sm mb-0">
                <thead className="table-dark sticky-header">
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Created At</th>
                    {role === "ADMIN" && <th>Reported By</th>}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td>{issue.title}</td>
                      <td>
                        <span
                          className={`badge ${
                            issue.status === "RESOLVED"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {issue.status}
                        </span>
                      </td>
                      <td>{new Date(issue.createdAt).toLocaleString()}</td>
                      {role === "ADMIN" && (
                        <td>{issue.reportedByUsername}</td>
                      )}
                      <td>
                        <Link
                          to={`/issues/${issue.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Dashboard;
