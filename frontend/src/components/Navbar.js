import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Transition } from '@headlessui/react';

const Navbar = ({ onNewProject, onNewSkill }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <span className="text-2xl font-bold">Portfolio</span>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNewProject}
                className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-200"
              >
                Nouveau Projet
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNewSkill}
                className="bg-transparent border-2 border-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-indigo-700 transition-colors duration-200"
              >
                Nouvelle Compétence
              </motion.button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none"
            >
              <span className="sr-only">Menu principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                onNewProject();
                setIsOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600"
            >
              Nouveau Projet
            </button>
            <button
              onClick={() => {
                onNewSkill();
                setIsOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600"
            >
              Nouvelle Compétence
            </button>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;
