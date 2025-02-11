import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Editor from '../components/Editor';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { logout } = useAuth();
  const [rules, setRules] = useState({
    main: '',
    job: '',
    robbery: '',
    gang: '',
  });
  const [activeTab, setActiveTab] = useState('main');
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await fetch('/rules.json');
        const data = await response.json();
        setRules(data);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };

    fetchRules();
  }, []);

  const handleSave = async (type: string, content: string) => {
    try {
      const response = await fetch('/rules.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...rules, [type]: content }),
      });

      if (response.ok) {
        setRules(prevRules => ({ ...prevRules, [type]: content }));
        console.log(`${type} rules saved successfully!`);
      } else {
        console.error(`Failed to save ${type} rules`);
      }
    } catch (error) {
      console.error(`Error saving ${type} rules:`, error);
    }
  };

  const handleAutoSave = (type: string, content: string) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      handleSave(type, content);
    }, 1000);
  };

  const handleChange = (type: string, content: string) => {
    setRules(prevRules => ({ ...prevRules, [type]: content }));
    handleAutoSave(type, content);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 rounded-lg"
      style={{ background: '#282c34', color: 'white', minHeight: '100vh' }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#61dafb' }}>پنل مدیریت</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
        >
          خروج
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'main' ? 'bg-[#61dafb] text-black' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('main')}
        >
          قوانین اصلی
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'job' ? 'bg-[#61dafb] text-black' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('job')}
        >
          قوانین شغل‌ها
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'robbery' ? 'bg-[#61dafb] text-black' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('robbery')}
        >
          قوانین رابری
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'gang' ? 'bg-[#61dafb] text-black' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('gang')}
        >
          قوانین گنگ‌ها
        </button>
      </div>

      {activeTab === 'main' && (
        <>
          <h2 className="text-xl font-semibold mb-2">قوانین اصلی</h2>
          <Editor
            content={rules.main}
            onChange={(content) => handleChange('main', content)}
          />
        </>
      )}
      {activeTab === 'job' && (
        <>
          <h2 className="text-xl font-semibold mb-2">قوانین شغل‌ها</h2>
          <Editor
            content={rules.job}
            onChange={(content) => handleChange('job', content)}
          />
        </>
      )}
      {activeTab === 'robbery' && (
        <>
          <h2 className="text-xl font-semibold mb-2">قوانین رابری</h2>
          <Editor
            content={rules.robbery}
            onChange={(content) => handleChange('robbery', content)}
          />
        </>
      )}
      {activeTab === 'gang' && (
        <>
          <h2 className="text-xl font-semibold mb-2">قوانین گنگ‌ها</h2>
          <Editor
            content={rules.gang}
            onChange={(content) => handleChange('gang', content)}
          />
        </>
      )}
    </motion.div>
  );
};

export default AdminPanel;
