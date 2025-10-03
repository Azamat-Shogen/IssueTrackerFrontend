import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { IUser } from "../../types";
import { deleteUser, fetchUsers } from "../../api/authApi";
import DeleteUserModal from "./DeleteUserModal";

const Users:React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState<string>("");

    const auth = useAuth();

    useEffect(() => {
        if (!auth?.user) return;
        
        const fetchAllUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch {
                setError("Failed to fetch users.")
            } finally {
                setLoading(false)
            }
        }

        fetchAllUsers();

    }, [auth?.user])

    // Delete User Handler
    const handleDeleteUser = async () => {
        if (!selectedUser || !selectedUser.id) return;
        try {
            setModalLoading(true);
            setModalMessage("") // Clear old messages
            const response = await deleteUser(selectedUser.id);

            setUsers(users.filter(u => u.id !== selectedUser.id));
            setModalMessage(response);
        } catch (err) {
            setModalMessage("Error deleting user.");
        } finally {
            setModalLoading(false);
        }
    }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Users</h2>

      {/* Loading State */}
      {loading && <div className="text-center mt-4">Loading...</div>}

      {/* Error State */}
      {!loading && error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {/* No Users */}
      {!loading && !error && users.length === 0 && (
        <div className="alert alert-warning text-center">No users found.</div>
      )}

      {/* Users Table */}
      {!loading && !error && users.length > 0 && (
        <div className="table-responsive border rounded"
             style={{ maxHeight: '400px', overflowY: 'auto'}}
            >
        <table className="table table-striped table-hover shadow-sm rounded">
          <thead className="table-dark sticky-header">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id}>
                <th scope="row">{idx + 1}</th>
                <td>{user.username}</td>
                <td>
                  <span className="badge bg-primary">{user.role}</span>
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-danger"
                    
                    onClick={() => {
                      setSelectedUser(user);
                      setModalMessage(""); // clear old state
                      setShowModal(true);
                    }}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      {selectedUser && selectedUser.id && (
        <DeleteUserModal
          id={selectedUser.id}
          username={selectedUser.username}
          show={showModal}
          onHide={() => {
            setShowModal(false);
            setSelectedUser(null);
            setModalMessage("");
          }}
          onConfirm={handleDeleteUser}
          loading={modalLoading}
          message={modalMessage}
        />
      )}
    </div>
  );
  
}

export default Users