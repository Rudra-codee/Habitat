import React from 'react';
import { motion } from 'framer-motion';

interface AvatarCardProps {
  name: string;
  image: string;
  onEdit: () => void;
  subtitle?: string;
  status?: string;
}

const AvatarCard = ({ name, image, onEdit, subtitle = 'AI Assistant', status = 'Active' }: AvatarCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.05, boxShadow: '0 8px 24px rgba(219, 39, 119, 0.3)' }}
      className="glass-effect rounded-xl shadow-md border border-white/30 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-pink-400 dark:hover:border-pink-500 group relative overflow-hidden"
    >
      <div className="relative h-40 w-full flex items-center justify-center bg-gradient-to-tr from-pink-200/40 to-purple-200/40 dark:from-pink-900/40 dark:to-purple-900/40">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-md group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
        <span className="text-sm text-pink-600 dark:text-pink-400 mb-1">{subtitle}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 mb-2">{status}</span>
        <button
          onClick={onEdit}
          className="mt-2 px-4 py-1.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-300 shadow-sm font-medium"
        >
          Edit
        </button>
      </div>
    </motion.div>
  );
};

export default AvatarCard;
