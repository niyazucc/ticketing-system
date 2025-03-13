import React from 'react'
import Navbar from '../components/Dashboard/Navbar';
import SideNav from '../components/Dashboard/SideNav';
import Content from '../components/Dashboard/Content';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className='container py-3'>
      <div className='row'>
        <div className='border border-rounded p-4 col-md-3'>
          <SideNav />
        </div>
        <div className='border border-rounded p-4 col'>
          <Content />
        </div>
      </div>
      </div>
      
    </>
  )
}
