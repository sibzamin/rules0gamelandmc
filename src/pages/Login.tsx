import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [password3, setPassword3] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password, password2, password3)) {
      navigate('/admin/panel');
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-black/30 p-8 rounded-lg"
    >
      <h1 className="text-3xl font-bold mb-6 text-[#ff6b00]">ورود به پنل مدیریت</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-white mb-2">نام کاربری</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-white mb-2">رمز عبور 1</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]"
          />
        </div>
        <div>
          <label htmlFor="password2" className="block text-white mb-2">رمز عبور 2</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]"
          />
        </div>
        <div>
          <label htmlFor="password3" className="block text-white mb-2">رمز عبور 3</label>
          <input
            type="password"
            id="password3"
            value={password3}
            onChange={(e) => setPassword3(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#ff6b00] hover:bg-[#ff8533] text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          ورود
        </button>
      </form>
    </motion.div>
  );
};

export default Login;
