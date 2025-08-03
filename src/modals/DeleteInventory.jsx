import React, { useState } from "react";
import { X, Trash2, AlertCircle } from "lucide-react";
import { useInventory } from "../contexts/InventoryContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteInventory = ({ isOpen, onClose, item }) => {
  const { deleteItem } = useInventory();
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItem(item.id);
      toast.success("Item deleted successfully!");
      onClose();
      navigate("/inventory");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error(error.message || "Failed to delete item");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative bg-gradient-to-r from-red-600 via-rose-600 to-red-800 p-6 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-rose-600/20"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Trash2 size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Delete Inventory Item</h2>
                <p className="text-red-100">Confirm deletion of this item</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
              disabled={isDeleting}
              aria-label="Close delete modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 text-center">
          <p className="text-lg text-slate-800 mb-4">
            Are you sure you want to delete{" "}
            <span className="font-bold text-red-600">{item.name}</span>?
          </p>
          <p className="text-sm text-slate-600 flex items-center justify-center gap-2">
            <AlertCircle size={16} className="text-red-500" />
            This action cannot be undone.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-200 bg-slate-100 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Cancel deletion"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            aria-label="Confirm delete item"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInventory;