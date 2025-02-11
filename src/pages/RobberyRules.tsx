import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RobberyRules = () => {
  const [robberyRules, setRobberyRules] = useState('');

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await fetch('/rules.json');
        const data = await response.json();
        setRobberyRules(data.robbery);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };

    fetchRules();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-black/30 p-8 rounded-lg"
    >
      <h1 className="text-3xl font-bold mb-6 text-[#ff6b00]">قوانین رابری</h1>
      <div className="space-y-4 text-white">
        <div dangerouslySetInnerHTML={{ __html: robberyRules || 'قوانین مربوط به رابری در سرور در اینجا قرار می‌گیرد...' }} />
      </div>
    </motion.div>
  );
};

export default RobberyRules;
