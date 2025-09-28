import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Issue, UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { getIssueById } from '../../api/issuesApi';
import { Link } from 'react-router-dom';

function IssueDetails() {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const auth = useAuth();
  const { issueId } = useParams<{ issueId: string }>();

  const role = auth?.user?.role;

  useEffect(() => {
    if (!issueId) return;

    const fetchIssue = async () => {
      try {
        const data = await getIssueById(issueId);
        setIssue(data);
      } catch {
        setError('Failed to fetch');
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [issueId]);

  return (
    <div className="container mt-4">
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {!loading && !error && !issue && (
        <div className="alert alert-warning text-center">Issue not found.</div>
      )}

      {!loading && !error && issue && (
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-header bg-primary text-white text-center">
            <h4 className="mb-0">{issue.title}</h4>
          </div>

          <div className="card-body d-flex flex-column align-items-start ps-3">
            <p className="card-text mb-3">
              <strong>Description:</strong> {issue.description}
            </p>

            <p className="card-text mb-3 d-flex align-items-center">
              <strong className="me-2">Status:</strong>
              <span
                className={`badge text-uppercase px-3 py-2 fw-semibold ${
                  issue.status === 'PENDING'
                    ? 'bg-warning text-dark'
                    : 'bg-success'
                }`}
              >
                {issue.status}
              </span>
            </p>

            <p className="card-text mb-3">
              <strong>Created At:</strong>{' '}
              {new Date(issue.createdAt).toLocaleString()}
            </p>

            {issue.status === 'RESOLVED' && (
            <p className="card-text mb-3">
                <strong>Updated At:</strong>{' '}
                {new Date(issue.updatedAt).toLocaleString()}
            </p>
            )}

            {role === 'ADMIN' && (
              <p className="card-text">
                <strong>Reported By:</strong> {issue.reportedByUsername}
              </p>
            )}
          </div>

           <div className="card-footer d-flex justify-content-end gap-2">
              {role === 'ADMIN' ? (
                <>
                <button className="btn btn-danger btn-sm">Delete</button>
                <button className="btn btn-outline-secondary btn-sm">
                    Change Status
                </button>
                <Link
                    to="/dashboard"
                    className="btn btn-sm btn-outline-primary">
                    Dashboard
                </Link>
               </>

            ): <>
                <Link
                    to="/dashboard"
                    className="btn btn-sm btn-outline-primary">
                    Dashboard
                </Link>
              </>
            }
            </div>

          
        </div>
      )}
    </div>
  );
}

export default IssueDetails;
