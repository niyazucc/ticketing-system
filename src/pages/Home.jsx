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
                    <HeroSection/>

                    {/* Right Column: Map (Moves Below When Screen is Small) */}
                    <div className="col-lg-6">
                        <div className="map-container" style={{ height: "100%", width: "100%" }}>
                            <MapComponent />
                        </div>
                    </div>
                </div>

                <hr className='mt-5' />
                <div className='text-center mt-5'>
                    <h1 className='display-4'>See current issues!</h1>
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
                        <div className="card shadow-sm p-4">
                            <h3>📝 Report an Issue</h3>
                            <p>Fill out a form to describe the problem and select the location.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-4">
                            <h3>📍 View on Map</h3>
                            <p>See reported issues on a map with real-time updates.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-4">
                            <h3>✅ Get Updates</h3>
                            <p>Track the progress of your report until it's resolved.</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
