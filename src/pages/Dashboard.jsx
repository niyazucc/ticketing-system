import React from 'react'
import Navbar from '../components/Dashboard/Navbar';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/Dashboard/Admin/AdminDashboard';
import UserDashboard from '../components/Dashboard/User/UserDashboard';

export default function Dashboard() {
  const {user} = useAuth();

  return (
    <>
      <div className='container py-3'>
        {
         (user.role === 'admin')
          ? <AdminDashboard /> 
          : <UserDashboard />
        }

      </div>
    </>
  )
}
