import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';

import AvatarCard from './components/AvatarCard';
import CreateAvatarModal from './components/CreateAvatarModal';
import ThemeToggle from './components/ThemeToggle';

import Kshan from './assets/Kshan.png';
import Rynaa from './assets/Rynaa.png';
import Nadia from './assets/Nadia.png';

// Define the shape of an avatar
interface Avatar {
  id: number;
  name: string;
  image: string;
  description?: string;
}

// Some initial dummy avatars before API fetch
const initialAvatars: Avatar[] = [
  { id: 1001, name: 'Kshan Kshan', image: Kshan, description: 'AI Researcher' },
  { id: 1002, name: 'Rynaa', image: Rynaa, description: 'Virtual Assistant' },
  { id: 1003, name: 'Nadia', image: Nadia, description: 'Data Analyst' },
];

const App = () => {
  // Main states
  const [avatars, setAvatars] = useState<Avatar[]>(initialAvatars);
  const [userAvatars, setUserAvatars] = useState<Avatar[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState<Avatar | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch new avatars when app loads
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users?page=1');
        const data = await response.json();

        const apiAvatars = data.data.map((user: any) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          image: user.avatar,
          description: 'AI Assistant',
        }));

        setAvatars(prev => [...prev, ...apiAvatars]);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  // Open the modal to edit an existing avatar
  const openEditModal = (id: number) => {
    const allAvatars = [...avatars, ...userAvatars];
    const avatar = allAvatars.find(a => a.id === id);

    if (avatar) {
      setEditingAvatar(avatar);
      setIsModalOpen(true);
    }
  };

  // Save a new avatar or update an existing one
  const handleSaveAvatar = (avatar: { name: string; description: string; image: string }) => {
    if (editingAvatar) {
      const updateAvatar = (list: Avatar[]) =>
        list.map(a => (a.id === editingAvatar.id ? { ...a, ...avatar } : a));

      if (avatars.some(a => a.id === editingAvatar.id)) {
        setAvatars(prev => updateAvatar(prev));
      } else {
        setUserAvatars(prev => updateAvatar(prev));
      }

      setEditingAvatar(null);
    } else {
      const newAvatar: Avatar = {
        id: Date.now(), // simple ID generation
        ...avatar,
      };
      setUserAvatars(prev => [...prev, newAvatar]);
    }
  };

  // Open modal for creating a new avatar
  const openCreateModal = () => {
    setEditingAvatar(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-indigo-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900">
      <div className="container mx-auto px-6 py-12 relative font-sans">

        {/* Top-right Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">
            Welcome to AI Dashboard
          </h1>
          <p className="mt-3 text-base text-gray-700 dark:text-gray-300 max-w-xl">
            Manage your AI avatars with ease and a friendly touch.
          </p>
        </motion.div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Your Avatars
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-indigo-300 via-transparent to-pink-300 ml-6" />
        </div>

        {/* Avatar Cards or Loading Spinner */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-400"></div>
          </div>
        ) : (
          <div className="relative">
            {/* Blurred gradient background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-200/50 via-white/20 to-pink-200/50 dark:from-indigo-900/50 dark:via-gray-900/20 dark:to-pink-900/50 blur-2xl rounded-3xl" />

            {/* Avatar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...avatars, ...userAvatars].map(avatar => (
                <AvatarCard
                  key={avatar.id}
                  name={avatar.name}
                  image={avatar.image}
                  subtitle={avatar.description || 'AI Assistant'}
                  status="Active"
                  onEdit={() => openEditModal(avatar.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Create New Avatar Button */}
        <div className="flex justify-center mt-12">
          <motion.button
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08, boxShadow: '0 10px 20px rgba(219, 39, 119, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={openCreateModal}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-pink-600 hover:to-indigo-700 transition-all duration-300"
          >
            <PlusIcon className="h-6 w-6" />
            Create New Avatar
          </motion.button>
        </div>

        {/* Avatar Creation/Editing Modal */}
        <CreateAvatarModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleSaveAvatar}
          avatarToEdit={
            editingAvatar
              ? {
                  name: editingAvatar.name,
                  description: editingAvatar.description || '',
                  image: editingAvatar.image,
                }
              : null
          }
        />
      </div>
    </div>
  );
};

export default App;
