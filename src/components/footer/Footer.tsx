

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left Side */}
        <div className="mb-2 mb-md-0">
          &copy; {new Date().getFullYear()} Issue Tracker. All rights reserved.
        </div>

        {/* Right Side */}
        <div>
          <a href="#" className="text-white me-3 text-decoration-none">
            Privacy
          </a>
          <a href="#" className="text-white me-3 text-decoration-none">
            Terms
          </a>
          <a href="#" className="text-white text-decoration-none">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
