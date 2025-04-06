import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await api.get(`/hackathons?page=${page}`);
        setHackathons(res.data.hackathons);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        setError('Impossible de charger les hackathons');
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, [page]);

  const handleCreateTeam = async (hackathonId) => {
    const teamName = prompt("Nom de l'équipe ?");
    if (!teamName) return;
    try {
      await api.post('/teams', { name: teamName, hackathonId });
      alert('Équipe créée avec succès !');
    } catch {
      alert("Erreur lors de la création de l'équipe");
    }
  };

  const sortedHackathons = {
    upcoming: [],
    ongoing: [],
    past: [],
  };

  if (hackathons.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    hackathons.forEach((hackathon) => {
      const hackathonDate = new Date(hackathon.date);
      hackathonDate.setHours(0, 0, 0, 0);
      if (hackathonDate > today) {
        sortedHackathons.upcoming.push(hackathon);
      } else if (hackathonDate.getTime() === today.getTime()) {
        sortedHackathons.ongoing.push(hackathon);
      } else {
        sortedHackathons.past.push(hackathon);
      }
    });
  }

  if (loading) return <p className="text-center text-blue-600">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const renderHackathonSection = (title, hackathonsList) => (
    <>
      <h3 className="text-xl font-semibold mt-6 mb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hackathonsList.map((hackathon) => (
          <div key={hackathon.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-700 mb-2">{hackathon.title}</h3>
            <p className="text-gray-600 mb-2">{hackathon.description}</p>
            <p className="text-sm text-gray-500">📅 {new Date(hackathon.date).toLocaleDateString()}</p>
            <Link
              to={`/hackathons/${hackathon.id}`}
              className="mt-2 inline-block text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Voir détails
            </Link>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Hackathons disponibles</h2>
      {renderHackathonSection("À venir :", sortedHackathons.upcoming)}
      {renderHackathonSection("En cours :", sortedHackathons.ongoing)}
      {renderHackathonSection("Passés :", sortedHackathons.past)}

    </div>
  );
};

export default Hackathons;
