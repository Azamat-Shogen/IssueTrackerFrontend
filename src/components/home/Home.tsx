import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Left Column: Text & CTA */}
        <div className="col-md-6 mb-4 mb-md-0">
          <h1 className="display-5 fw-bold">Welcome to Issue Tracker</h1>
          <p className="lead">
            Track, manage, and resolve your issues efficiently. Keep everything organized in one place.
          </p>
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            Go to Dashboard
          </Link>
        </div>

        {/* Right Column: Illustration / Icon */}
        <div className="col-md-6 text-center">
          {/* Placeholder for an image or icon */}
          <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
               style={{ width: "200px", height: "200px", fontSize: "3rem" }}>
            🛠️
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
