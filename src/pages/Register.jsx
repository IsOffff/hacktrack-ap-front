import React from 'react';

const Register = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">Inscription</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          className="w-full border px-4 py-2 rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border px-4 py-2 rounded-md"
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
