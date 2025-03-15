import React from 'react'
import { useAuth } from '../context/AuthContext';
import UserTicket from "../components/Dashboard/User/UserTicket";
import AdminTicket from "../components/Dashboard/Admin/AdminTicket";

export default function Tickets() {
  const {user} = useAuth();

  return (
    <div className='container py-3'>
            {
             (user.role === 'admin')
              ? <AdminTicket />
              : <UserTicket />
            }
    
          </div>
  )
}
