import { createRoot } from 'react-dom/client'
import './index.css'
import { StrictMode } from 'react';
import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { RouterProvider } from 'react-router-dom'
import router from './routes';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

