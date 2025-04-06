import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const HackathonDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleJoinTeam = async (teamId) => {
    try {
      await api.post(`/teams/${teamId}/join`);
      alert('✅ Tu as rejoint l’équipe !');
      window.location.reload();
    } catch (err) {
      alert(err?.response?.data?.message || "Erreur lors de l’ajout dans l’équipe");
    }
  };

  const handleCreateTeam = async () => {
    const teamName = prompt("Nom de l'équipe :");
    if (!teamName) return;

    try {
      await api.post('/teams', {
        name: teamName,
        hackathonId: hackathon.id,
      });
      alert("✅ Équipe créée !");
      window.location.reload();
    } catch (err) {
      alert(err?.response?.data?.message || "Erreur lors de la création de l’équipe");
    }
  };

  useEffect(() => {
    api.get(`/hackathons/${id}`)
      .then((res) => setHackathon(res.data))
      .catch(() => setError('Hackathon introuvable'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-blue-600">Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{hackathon.title}</h1>
      <p className="text-gray-600 mb-4">{hackathon.description}</p>
      <p className="text-sm text-gray-500 mb-4">{new Date(hackathon.date).toLocaleDateString()}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Équipes inscrites :</h2>
      {hackathon.teams.length === 0 ? (
        <p className="text-gray-500 italic">Aucune équipe pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {hackathon.teams.map((team) => (
            <li key={team.id} className="bg-white p-4 shadow rounded">
              <strong>{team.name}</strong> — {team.members.length} membre(s)
              <div className="text-sm text-gray-500">
                👥 {team.members.map((m) => m.name).join(', ')}
              </div>
              {user && (
                <button
                  onClick={() => handleJoinTeam(team.id)}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Rejoindre cette équipe
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {user && (
        <button
          onClick={handleCreateTeam}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Créer une équipe
        </button>
      )}
    </div>
  );
};

export default HackathonDetail;
