// src/components/UpdateStatusModal.tsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IssueStatus } from '../../types';

interface UpdateStatusModalProps {
  visible: boolean;
  currentStatus: IssueStatus;
  onClose: () => void;
  onUpdate: (newStatus: IssueStatus) => Promise<void>;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  visible,
  currentStatus,
  onClose,
  onUpdate,
}) => {
  const [newStatus, setNewStatus] = useState<IssueStatus>(currentStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setNewStatus(currentStatus);
    }
  }, [visible, currentStatus]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onUpdate(newStatus);
      onClose(); // close modal on success
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={visible} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Update Status</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId="statusSelect">
          <Form.Label>Select New Status</Form.Label>
          <Form.Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as IssueStatus)}
          >
            <option value="PENDING">PENDING</option>
            <option value="RESOLVED">RESOLVED</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateStatusModal;
