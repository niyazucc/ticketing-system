import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Register() {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        alert("Registration successful (This is a demo)");
    };

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <div className="row">
                    {/* Left Side - Image */}
                    <div className="col">
                        <img className="img-fluid" src="images/signup.png" alt="Register" />
                    </div>

                    {/* Right Side - Form */}
                    <div className="col border rounded m-3 p-4">
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
                                <label className="form-label">Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="e.g. Bonnie Green"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Country</label>
                                <select 
                                    className="form-select"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                >
                                    <option value="">Choose a country</option>
                                    <option value="USA">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="MY">Malaysia</option>
                                    <option value="SG">Singapore</option>
                                    {/* Add more countries */}
                                </select>
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

                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="updatesCheck" />
                                <label className="form-check-label" htmlFor="updatesCheck">
                                    Email me about product updates and resources.
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Create Account</button>
                        </form>

                        <p className="text-center mt-3">or</p>

                        <button className="btn btn-outline-dark w-100 mb-2">Sign up with Google</button>
                        <button className="btn btn-outline-dark w-100">Sign up with Apple</button>

                        <p className="text-muted mt-3 text-center">
                            By signing up, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
