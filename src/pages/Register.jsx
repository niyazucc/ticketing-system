import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        alert("Registration successful (This is a demo)");
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    {/* Left Side - Image */}
                    <div className="col-sm-6 col-md">
                        <img className="img-fluid" src="images/signup.png" alt="Register" />
                    </div>

                    {/* Right Side - Form */}
                    <div className="col-sm-6 col-md border shadow-sm rounded m-3 p-4">
                        <h2>Create Your Account</h2>
                        <p>Start your journey now. Already have an account? <a href="/login">Login here</a>.</p>

                        <form onSubmit={handleRegister} className="mt-3">
                            <div className="mb-3">
                                <label className="form-label">Your Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Re-enter Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="updatesCheck" />
                                <label className="form-check-label" htmlFor="updatesCheck">
                                    Email me about ticket updates and resources.
                                </label>
                            </div>

                            <button type="submit" className="btn btn-light w-100">Create Account</button>
                        </form>

                        <p className="text-center mt-3">or</p>

                        <button className="btn btn-outline-dark w-100 mb-2"><i className="bi bi-google"></i> Log in with Google</button>
                        <button className="btn btn-outline-dark w-100 mb-3"><i className="bi bi-apple"></i> Log in with Apple</button>
                        <p className="text-muted mt-3 text-center">
                            By signing up, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
