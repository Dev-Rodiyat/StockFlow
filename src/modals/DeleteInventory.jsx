import React from "react";
import { useInventory } from "../contexts/InventoryContext";

const DeleteInventory = ({ isOpen, onClose, item }) => {
  const { deleteItem } = useInventory();

  const handleDelete = () => {
    deleteItem(item.id);
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          Are you sure you want to delete <span className="font-bold">{item.name}</span>?
        </h2>
        <div className="flex justify-center gap-4 pt-4">
            <button type="button" onClick={onClose} className="text-gray-600 hover:bg-gray-200 bg-gray-100 px-6 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInventory;
