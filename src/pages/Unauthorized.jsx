import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Unauthorized = () => {
  return (
    <>
      <Navbar />
      <div className="text-center mt-5">
        <img src="/images/404.png" className="img-fluid w-25" alt="Unauthorized Access" />
        <h2 className="mt-3 text-danger">Access Denied</h2>
        <p className="text-muted">
          You do not have permission to view this page. <br />
          Please log in with an authorized account.
        </p>
        <div className="mt-3">
          <Link to="/login" className="btn  bg-primary text-white">Go to Login</Link>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
