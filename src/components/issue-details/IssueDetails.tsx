import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Issue, IssueStatus } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { deleteIssue, getIssueById, updateIssueStatus } from '../../api/issuesApi';
import UpdateStatusModal from './UpdateStatusModal';
import DeleteIssueModal from './DeleteIssueModal';


function IssueDetails() {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  const auth = useAuth();
  const { issueId } = useParams<{ issueId: string }>();
  const role = auth?.user?.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (!issueId) return;

    const fetchIssue = async () => {
      try {
        const data = await getIssueById(issueId);
        setIssue(data);
      } catch {
        setError('Failed to fetch issue details.');
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [issueId]);


  const handleStatusUpdate = async (newStatus: IssueStatus) => {
    if (!issue || !issueId) return;

    const updatedIssue = await updateIssueStatus(issueId, newStatus);
    if (updatedIssue) {
        setIssue(prev => prev ? {
            ...prev,
            status: updatedIssue.status,
            updatedAt: new Date().toISOString()
        } : null);
        setShowUpdateModal(false);
    } else {
        alert("Failed to update status")
    }
  };

  const handleDelete = async () => {
    if (!issue || !issueId) return;

    setDeleting(true);
    try {
        const message = await deleteIssue(issueId); // get actual message
        setDeleteMessage(message); // Save message to show in modal
        if (message.toLocaleLowerCase().includes("success")) {
            setTimeout( () => {
                setShowDeleteModal(false)
                setDeleteMessage(null);
                navigate("/dashboard")
            }, 2000)
        }
    } catch (err) {
        console.error(err);
        setDeleteMessage("Failed to delete issue")
    } finally {
        setDeleting(false);
    }
  }

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
                <button className="btn btn-danger btn-sm"
                onClick={() => setShowDeleteModal(true)}
                >Delete</button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowUpdateModal(true)}
                >
                  Change Status
                </button>
                <Link
                  to="/dashboard"
                  className="btn btn-sm btn-outline-primary"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="btn btn-sm btn-outline-primary"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ✅ React-Bootstrap Modal */}
      {issue && (
        <UpdateStatusModal
          visible={showUpdateModal}
          currentStatus={issue.status}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleStatusUpdate}
        />
      )}
      {issue && (
        <DeleteIssueModal
        show={showDeleteModal}
        onHide={() => {
            setShowDeleteModal(false);
            setDeleteMessage(null) // reset modal props on hide
        }}
        onConfirm={handleDelete}
        loading={deleting}
        message={deleteMessage || undefined}
        issueTitle={issue?.title}
        />
      )}
    </div>
  );
}

export default IssueDetails;
