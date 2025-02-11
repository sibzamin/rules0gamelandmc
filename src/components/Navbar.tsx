import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="bg-black/80 backdrop-blur-sm p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="https://i.ibb.co/0R613JJY/gamelandmc.webp" alt="GameLandMC Logo" className="h-12" />
          <h1 className="text-2xl font-bold flex gap-2" style={{
              background: 'linear-gradient(to right, #ff6b00, white)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            <span>گیم</span>
            <span>لند</span>
            <span>ام‌سی</span>
          </h1>
        </div>
        
        <motion.div 
          className="flex gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NavLink to="/global">قوانین اصلی</NavLink>
          <NavLink to="/jobs">قوانین شغل‌ها</NavLink>
          <NavLink to="/robberies">قوانین رابری</NavLink>
          <NavLink to="/gangs">قوانین گنگ‌ها</NavLink>
           <a href="https://discord.gg/YPY3H56VtH" target="_blank" rel="noopener noreferrer" className="text-[#5865F2] hover:text-[#7289DA] transition-colors duration-300">
           دیسکورد
          </a>
        </motion.div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-white hover:text-[#ff6b00] transition-colors duration-300"
  >
    {children}
  </Link>
);

export default Navbar;
