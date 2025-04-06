import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      alert("Erreur de connexion");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 space-y-4 bg-white p-6 shadow-md rounded-md">
      <input
        type="email"
        placeholder="Email"
        {...register('email')}
        className="w-full border px-4 py-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      <input
        type="password"
        placeholder="Mot de passe"
        {...register('password')}
        className="w-full border px-4 py-2 rounded"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
        Se connecter
      </button>
    </form>
  );
};

export default Login;
