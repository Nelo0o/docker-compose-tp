import React from 'react';
import { motion } from 'framer-motion';

const FilterTags = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap gap-3"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          !selectedCategory 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Tous
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default FilterTags;
