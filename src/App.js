import React, { useState, useEffect } from 'react';
import './App.css';
import TicketList from './TicketList';

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [displayOptionsOpen, setDisplayOptionsOpen] = useState(false);

  useEffect(() => {
    // Fetch tickets from the API and update the 'tickets' state
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
      });
  }, []);

  const toggleDisplayOptions = () => {
    setDisplayOptionsOpen(prevState => !prevState);
  };

  const handleGroupingChange = option => {
    setGroupingOption(option);
    toggleDisplayOptions();
  };

  const handleSortingChange = option => {
    setSortingOption(option);
    toggleDisplayOptions();
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className={`display-button ${displayOptionsOpen ? 'active' : ''}`} onClick={toggleDisplayOptions}>
          Display <div className={`display-arrow ${displayOptionsOpen ? 'active' : ''}`}>▼</div>
          {displayOptionsOpen && (
            <div className="dropdown">
              <div className="dropdown-section">
                <p>Grouping</p>
                <button onClick={() => handleGroupingChange('status')}>By Status</button>
                <button onClick={() => handleGroupingChange('user')}>By User</button>
                <button onClick={() => handleGroupingChange('priority')}>By Priority</button>
              </div>
              <div className="dropdown-section">
                <p>Order</p>
                <button onClick={() => handleSortingChange('priority')}>Priority</button>
                <button onClick={() => handleSortingChange('title')}>Title</button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="display-page">
        <TicketList tickets={tickets} groupingOption={groupingOption} sortingOption={sortingOption} />
      </div>
    </div>
  );
}

export default App;
