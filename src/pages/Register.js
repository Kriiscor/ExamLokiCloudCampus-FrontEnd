// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formData);
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      navigate('/login');
    } catch (err) {
      //console.error('Erreur lors de l\'inscription', err);
      if (err.response) {
        // Erreur renvoyée par le serveur
        const { message } = err.response.data;
        alert(message); // Affiche un message à l'utilisateur (vous pouvez remplacer par un toast)
      } else {
        // Erreur réseau ou autre
        console.error("Erreur réseau ou serveur", err);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
      //setError('Une erreur est survenue lors de la création du compte.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 w-80 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Inscription</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          className="p-2 mb-4 w-full border border-gray-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 mb-4 w-full border border-gray-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          className="p-2 mb-4 w-full border border-gray-300"
        />
        <button type="submit" className="p-2 w-full text-white bg-blue-500 rounded">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
