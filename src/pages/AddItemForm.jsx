import React, { useState } from "react";
import { useInventory } from "../contexts/InventoryContext";

const AddItemForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const { addItem } = useInventory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity) return;
    addItem({ name, quantity: parseInt(quantity) });
    setName("");
    setQuantity("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
