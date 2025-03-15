import React from 'react'
import Navbar from '../components/Dashboard/Navbar';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className='container py-3'>
        {children}
      </div>
    </>
  )
}
