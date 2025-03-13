import React from 'react'
import Navbar from '../components/Dashboard/Navbar';
import HeroSection from '../components/HeroSection';
import MapComponent from '../components/Map';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className='container py-5 '>
        <div className='row'>
            <HeroSection />
          
          <div className="col-lg-6">
            <div className="map-container" style={{ height: "100%", width: "100%" }}>
              <MapComponent />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
