import React from 'react';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';

interface DeleteIssueModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
  message?: string;
  issueTitle?: string;
}

const DeleteIssueModal: React.FC<DeleteIssueModalProps> = ({
  show,
  onHide,
  onConfirm,
  loading = false,
  message,
  issueTitle,
}) => {
  const isSuccess = message?.toLowerCase().includes('success');

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton={!loading && !message}>
        <Modal.Title>{message ? (isSuccess ? 'Success' : 'Error') : 'Confirm Delete'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {message ? (
          <Alert variant={isSuccess ? 'success' : 'danger'}>
            {message}
          </Alert>
        ) : (
          <>
            Are you sure you want to delete{' '}
            <strong>{issueTitle ? `"${issueTitle}"` : 'this issue'}</strong>?<br />
            This action cannot be undone.
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        {!message && (
          <>
            <Button variant="secondary" onClick={onHide} disabled={loading}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm} disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </>
        )}

        {message && (
          <Button variant="primary" onClick={onHide} disabled={loading}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteIssueModal;
