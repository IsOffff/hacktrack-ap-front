import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CreateHackathon = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/hackathons', { title, description, date });
      navigate('/hackathons');
    } catch (err) {
      setError('Erreur lors de la création du hackathon');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="backdrop-blur-lg bg-white/60 border border-white/40 rounded-xl shadow-2xl p-8 max-w-lg w-full transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Créer un nouveau Hackathon
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Ex: HackTrack Battle"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              placeholder="Décris ton hackathon"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 text-white bg-gradient-to-r from-teal-500 to-blue-600 rounded-md font-semibold hover:opacity-90 transition-all"
          >
             Créer le Hackathon
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHackathon;
