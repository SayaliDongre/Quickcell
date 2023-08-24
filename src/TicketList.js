import React from 'react';
import './TicketList.css';

const TicketList = ({ tickets, groupingOption, sortingOption }) => {
  const groupByStatus = tickets => {
    const grouped = {};
    tickets.forEach(ticket => {
      const status = ticket.status;
      if (!grouped[status]) {
        grouped[status] = [];
      }
      grouped[status].push(ticket);
    });
    return grouped;
  };

  const groupByUser = tickets => {
    const grouped = {};
    tickets.forEach(ticket => {
      const user = ticket.userId;
      if (!grouped[user]) {
        grouped[user] = [];
      }
      grouped[user].push(ticket);
    });
    return grouped;
  };

  const groupByPriority = tickets => {
    const grouped = {};
    tickets.forEach(ticket => {
      const priority = ticket.priority;
      if (!grouped[priority]) {
        grouped[priority] = [];
      }
      grouped[priority].push(ticket);
    });
    return grouped;
  };

  const sortTicketsByPriority = groupedTickets => {
    Object.keys(groupedTickets).forEach(key => {
      groupedTickets[key].sort((a, b) => b.priority - a.priority);
    });
  };

  const sortTicketsByTitle = groupedTickets => {
    Object.keys(groupedTickets).forEach(key => {
      groupedTickets[key].sort((a, b) => a.title.localeCompare(b.title));
    });
  };

  let groupedTickets = [];
  if (groupingOption === 'status') {
    groupedTickets = groupByStatus(tickets);
  } else if (groupingOption === 'user') {
    groupedTickets = groupByUser(tickets);
  } else if (groupingOption === 'priority') {
    groupedTickets = groupByPriority(tickets);
  }

  if (sortingOption === 'priority') {
    sortTicketsByPriority(groupedTickets);
  } else if (sortingOption === 'title') {
    sortTicketsByTitle(groupedTickets);
  }

  return (
    <div className="ticket-list">
      {Object.keys(groupedTickets).map(group => (
        <div key={group} className="ticket-group">
          <h3>{group}</h3>
          <ul>
            {groupedTickets[group].map(ticket => (
              <li key={ticket.id}>{ticket.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
