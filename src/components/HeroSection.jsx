import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function HeroSection() {
  const text = "Welcome to the Ticketing System";
  const {user} = useAuth();

  return (
    <div className="col-lg-6 d-flex flex-column justify-content-center text-center text-lg-start">
      <motion.h1 className="display-4">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <p className="lead">
        Our ticketing system allows users to report issues, track their status, and find issue locations on a map.
        Whether it’s road damage, maintenance requests, or customer support, we make issue reporting easy!
      </p>
      
      {user ? (
        <a href="/create-ticket" className="btn btn-lg btn-light">Create your Ticket Now!</a>
      ) : (
        <a href="/login" className="btn btn-lg btn-light">Get Started</a>
      )}
    </div>
  );
}
