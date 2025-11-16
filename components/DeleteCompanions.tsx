// components/DeleteCompanionButton.tsx
'use client';

import { deleteCompanion } from '@/lib/actions/companion.actions';
import { Trash2 } from 'lucide-react';

interface DeleteCompanionButtonProps {
  companionId: string;
}

const DeleteCompanionButton = ({ companionId }: DeleteCompanionButtonProps) => {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this companion?')) {
      return;
    }

    try {
      await deleteCompanion(companionId);
      window.location.reload();  // Refresh the page after deletion
    } catch (error) {
      console.error('Failed to delete companion:', error);
      alert('Failed to delete companion. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="absolute cursor-pointer  top-2 right-2 z-10 p-2 mt-3 mr-14 bg-white rounded-full shadow-md text-red-500 hover:text-white  hover:bg-red-700 transition-colors"
      title="Delete companion"
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteCompanionButton;