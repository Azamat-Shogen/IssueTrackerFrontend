import React, { useState } from 'react'
import { IssueCreate } from '../../types'
import { createIssue } from '../../api/issuesApi';
import { useNavigate } from 'react-router-dom';

function CreateIssue() {
    const [formData, setFormData] = useState<IssueCreate>({
        title: "",
        description: ""
    });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const data = await createIssue(formData);

    if (data) {
        setSuccess("Issue created successfully!");
        // add a delay
        setTimeout(() => {
            navigate("/dashboard")
        }, 2000)
    } else {
        setError('Failed to create issue, try again.')
    }

    setIsSubmitting(false);

  }

  return (
    <div className="container my-5 d-flex justify-content-center">
            <div className="card shadow-sm w-100" style={{ maxWidth: '600px' }}>
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Create an Issue</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id='title'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter issue title"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id='description'
                                name='description'
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Describe the issue in detail"
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Issue'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default CreateIssue