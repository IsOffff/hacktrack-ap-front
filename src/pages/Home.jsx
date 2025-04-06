import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await api.get('/hackathons?page=1');
        setHackathons(res.data.hackathons.slice(0, 3)); 
      } catch (err) {
        console.error('Erreur chargement des hackathons :', err);
      }
    };

    fetchHackathons();
  }, []);

  return (
    <div className="text-center px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
        Bienvenue sur HackTrack 
      </h1>
      <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
        Participez à des hackathons, créez des équipes et construisez des projets.
        Une plateforme moderne pour les esprits créatifs.
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tous les hackathons</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {hackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 text-left"
          >
            <p className="text-sm text-gray-500 mb-1">
              📅 {new Date(hackathon.date).toLocaleDateString()}
            </p>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{hackathon.title}</h3>
            <p className="text-gray-600 mb-4">{hackathon.description}</p>
            <Link
              to={`/hackathons/${hackathon.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Voir les details
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/hackathons"
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg text-lg transition"
        >
          Voir tous les hackathons
        </Link>
      </div>
    </div>
  );
};

export default Home;
