import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (avatar: { name: string; description: string; image: string }) => void;
  avatarToEdit?: { name: string; description: string; image: string } | null;
}

const CreateAvatarModal = ({ isOpen, onClose, onCreate, avatarToEdit }: CreateAvatarModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; image?: string }>({});

  useEffect(() => {
    if (avatarToEdit) {
      setName(avatarToEdit.name || '');
      setDescription(avatarToEdit.description || '');
      setImage(avatarToEdit.image || '');
    } else {
      setName('');
      setDescription('');
      setImage('');
    }
    setErrors({});
  }, [avatarToEdit, isOpen]);

  const validate = () => {
    const newErrors: { name?: string; image?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!image.trim()) newErrors.image = 'Image URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onCreate({ name, description, image });
    setName('');
    setDescription('');
    setImage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="glass-effect bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md relative shadow-3xl"
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
              {avatarToEdit ? 'Edit Avatar' : 'Create New Avatar'}
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-4 transition ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 dark:border-gray-700 focus:ring-blue-400 dark:focus:ring-blue-600'
                  } bg-gray-50 dark:bg-gray-900`}
                  placeholder="Enter avatar name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                  required
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
                  placeholder="Enter avatar description"
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Avatar Image URL
                </label>
                <input
                  id="image"
                  type="url"
                  className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-4 transition ${
                    errors.image
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 dark:border-gray-700 focus:ring-blue-400 dark:focus:ring-blue-600'
                  } bg-gray-50 dark:bg-gray-900`}
                  placeholder="Paste image URL here"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  aria-invalid={!!errors.image}
                  aria-describedby="image-error"
                  required
                />
                {errors.image && (
                  <p id="image-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.image}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-400 shadow-lg font-extrabold text-lg"
              >
                {avatarToEdit ? 'Update' : 'Upload'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateAvatarModal;
