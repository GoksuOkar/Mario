import React, { useState, useEffect } from 'react';
import EventCards from './EventCards.jsx'

const Dashboard = () => {
  const [sortBy, setSortBy] = useState('upcoming');
  return (
    <>
      <div>
        Dashboard
      </div>
      <EventCards sortBy={sortBy} setSortBy={setSortBy}/>
    </>
  )

}

export default Dashboard;