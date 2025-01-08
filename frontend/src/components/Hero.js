import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 sm:px-12 rounded-3xl shadow-xl mb-16"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
        >
          Développeur Passionné
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl sm:text-2xl lg:text-3xl text-purple-100 mb-10"
        >
          Créateur d'applications web modernes et innovantes
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap gap-6"
        >
          <a 
            href="#projects" 
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Voir mes projets
          </a>
          <a 
            href="#skills" 
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-200 transform hover:-translate-y-1"
          >
            Mes compétences
          </a>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-3xl"></div>
    </motion.div>
  );
};

export default Hero;
