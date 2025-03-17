import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionTimeout = () => {
  const timeoutInterval = 1000 * 60 * 1; // 1 minute
  const navigate = useNavigate();
  const timeoutId = useRef(null);

  const resetTimeout = () => 
  {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(logout, timeoutInterval);
  };

  const handleUserActivity = () => {
    resetTimeout();
  };

  const logout = () => {
    console.log('logout click..')
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    console.log('Use Effect call..')
    const events = ['mousemove', 'keydown', 'click'];
    events.forEach(event => window.addEventListener(event, handleUserActivity));
    resetTimeout();
    return () => {
      events.forEach(event => window.removeEventListener(event, handleUserActivity));
      clearTimeout(timeoutId.current);
    };
  }, []);
};

export default SessionTimeout;