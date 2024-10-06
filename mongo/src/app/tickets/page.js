'use client';

import { useState, useEffect } from 'react';

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch tickets when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/tickets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTickets(data);
        } else {
          setError('Failed to load tickets');
        }
      } catch (err) {
        setError('Error fetching tickets');
      }
    };

    fetchTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, active }),
      });

      if (res.ok) {
        const newTicket = await res.json();
        setTickets([...tickets, newTicket]); // Add new ticket to the list
        setSuccess('Ticket added successfully!');
        setTitle('');
        setDescription('');
        setActive(false);
      } else {
        setError('Failed to add ticket');
      }
    } catch (err) {
      setError('Error creating ticket');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>

      {/* Display any success or error messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* Ticket Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Ticket</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium mr-4" htmlFor="active">Active</label>
          <input
            type="checkbox"
            id="active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="h-4 w-4 text-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Ticket
        </button>
      </form>

      {/* Ticket List */}
      <h2 className="text-xl font-bold mb-4">Existing Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{ticket.title}</h3>
              <p className="text-gray-700">{ticket.description}</p>
              <p>Status: {ticket.active ? 'Active' : 'Inactive'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
