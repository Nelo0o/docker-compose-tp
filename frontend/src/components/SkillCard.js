import React from 'react';
import { motion } from 'framer-motion';

const getCategoryColor = (category) => {
  const colors = {
    Frontend: 'from-pink-500 to-rose-500',
    Backend: 'from-blue-500 to-cyan-500',
    Database: 'from-green-500 to-emerald-500',
    DevOps: 'from-purple-500 to-indigo-500',
    Other: 'from-orange-500 to-amber-500'
  };
  return colors[category] || 'from-gray-500 to-slate-500';
};

const SkillCard = ({ skill, onEdit, onDelete }) => {
  const categoryColor = getCategoryColor(skill.category);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Gradient background accent */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${categoryColor}`} />

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{skill.name}</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${categoryColor} text-white`}>
              {skill.category}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(skill)}
              className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(skill._id)}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        </div>

        <div className="relative pt-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Niveau de maîtrise</span>
            <span className="text-sm font-medium text-gray-700">{skill.level}/5</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(skill.level / 5) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${categoryColor}`}
            />
          </div>
        </div>

        {/* Skill level indicators */}
        <div className="flex justify-between mt-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} className="text-xs text-gray-500">
              {level === 1 && "Débutant"}
              {level === 3 && "Intermédiaire"}
              {level === 5 && "Expert"}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
