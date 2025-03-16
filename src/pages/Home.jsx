import React from 'react'
import Navbar from '../components/Navbar';
import "../styles/Navbar.css";
import MapComponent from '../components/Map';
import Issues from '../components/Issues';
import HeroSection from '../components/HeroSection';


export default function Home() {
    return (
        <>

            <Navbar />
            <div className="container mt-5">
                {/* Header Section */}
                <div className="row g-4 align-items-center">
                    {/* Left Column: Text Content */}
                    <HeroSection />

                    {/* Right Column: Map (Moves Below When Screen is Small) */}
                    <div className="col-lg-6">
                        <div className="map-container" style={{ height: "100%", width: "100%" }}>
                            <MapComponent />
                        </div>
                    </div>
                </div>

                <hr className='mt-5' />
                <div className='text-center mt-5'>
                    <h1 className='display-4'>See recent issues!</h1>
                </div>
                {/* Current Issues */}
                <div className="row mt-2 g-3">
                    <Issues />
                </div>
                <hr className='mt-5' />
                <div className='text-center mt-5'>
                    <h1 className='display-4'>How it works?</h1>
                </div>

                {/* Features Section */}
                <div className="row mt-2 mb-5 g-3">
                    <div className="col-md-4">
                        <div className="card shadow-sm p-4 text-center">
                            <img src="/images/submit.png" alt="Report an Issue" className="img-fluid mb-3"  />
                            <h5>📝 Report an Issue</h5>
                            <p className='text-muted'>Submit a report with details and location. Your issue is logged into the system.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-4 text-center">
                            <img src="/images/report.png" alt="Admin Reviews" className="img-fluid mb-3"  />
                            <h5>👨‍💻 Admin & Handlers Review</h5>
                            <p className='text-muted'>Admins and handlers verify the issue and assign it to the right team for action.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-4 text-center">
                            <img src="/images/completed.png" alt="Problem Resolved" className="img-fluid mb-3"  />
                            <h5>✅ Problem Resolved!</h5>
                            <p className='text-muted'>The issue is fixed, and you receive an update on the resolution status.</p>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}
