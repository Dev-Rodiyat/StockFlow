import React, { useState } from "react";
import { X, Package, Tag, DollarSign, Building, FileText, Calendar, Hash, AlertCircle, CheckCircle, Upload } from "lucide-react";
import { useInventory } from "../contexts/InventoryContext";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const AddInventory = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    category: "",
    price: "",
    supplier: "",
    description: "",
    sku: "",
    minStockLevel: "",
    location: "",
    expiryDate: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addItem } = useInventory();

  const categories = [
    "Electronics",
    "Clothing",
    "Food & Beverages",
    "Home & Garden",
    "Health & Beauty",
    "Sports & Outdoors",
    "Books & Media",
    "Office Supplies",
    "Automotive",
    "Other",
  ];

  const locations = [
    "Warehouse A",
    "Warehouse B",
    "Store Floor",
    "Storage Room",
    "Cold Storage",
    "Display Area",
    "Back Office",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Item name is required";
    if (!form.quantity || parseFloat(form.quantity) <= 0) newErrors.quantity = "Valid quantity is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.price || parseFloat(form.price) <= 0) newErrors.price = "Valid price is required";
    if (!form.minStockLevel || parseInt(form.minStockLevel) < 0) newErrors.minStockLevel = "Minimum stock level is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Convert form data to match InventoryContext item structure
      const newItem = {
        id: uuidv4(), // Generate unique ID
        name: form.name,
        sku: form.sku || `SKU-${Date.now()}`, // Fallback SKU
        quantity: parseInt(form.quantity),
        minStockLevel: parseInt(form.minStockLevel),
        category: form.category,
        price: parseFloat(form.price),
        supplier: form.supplier || "",
        location: form.location || "",
        description: form.description || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiryDate: form.expiryDate || "",
        image: form.image ? URL.createObjectURL(form.image) : null, // Convert File to URL
      };

      await addItem(newItem);

      setForm({
        name: "",
        quantity: "",
        category: "",
        price: "",
        supplier: "",
        description: "",
        sku: "",
        minStockLevel: "",
        location: "",
        expiryDate: "",
        image: null,
      });
      setErrors({});
      toast.success("Item added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error(error.message || "Error adding item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ ...errors, image: "Image size must be under 5MB" });
        return;
      }
      setForm({ ...form, image: file });
      setErrors({ ...errors, image: null });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-6 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Package size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Add New Inventory Item</h2>
                <p className="text-blue-100">Fill in the details to add a new product</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
              disabled={isSubmitting}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter item name"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-100 ${
                      errors.name ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
                    }`}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    SKU/Product Code
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Enter SKU"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      value={form.sku}
                      onChange={(e) => setForm({ ...form, sku: e.target.value })}
                      aria-describedby={errors.sku ? "sku-error" : undefined}
                    />
                  </div>
                  {errors.sku && (
                    <p id="sku-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.sku}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <select
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-100 appearance-none bg-white ${
                        errors.category ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
                      }`}
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      required
                      aria-invalid={errors.category ? "true" : "false"}
                      aria-describedby={errors.category ? "category-error" : undefined}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  {errors.category && (
                    <p id="category-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.category}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Supplier
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Enter supplier name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      value={form.supplier}
                      onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Inventory Details */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Package size={20} className="text-green-600" />
                Inventory Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Quantity *
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-green-100 ${
                      errors.quantity ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-green-500"
                    }`}
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    min="1"
                    required
                    aria-invalid={errors.quantity ? "true" : "false"}
                    aria-describedby={errors.quantity ? "quantity-error" : undefined}
                  />
                  {errors.quantity && (
                    <p id="quantity-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.quantity}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Minimum Stock Level *
                  </label>
                  <input
                    type="number"
                    placeholder="5"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-green-100 ${
                      errors.minStockLevel ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-green-500"
                    }`}
                    value={form.minStockLevel}
                    onChange={(e) => setForm({ ...form, minStockLevel: e.target.value })}
                    min="0"
                    required
                    aria-invalid={errors.minStockLevel ? "true" : "false"}
                    aria-describedby={errors.minStockLevel ? "minStockLevel-error" : undefined}
                  />
                  {errors.minStockLevel && (
                    <p id="minStockLevel-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.minStockLevel}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Storage Location
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 appearance-none bg-white"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  >
                    <option value="">Select location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Financial Information */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-purple-600" />
                Financial Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Unit Price *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-purple-100 ${
                        errors.price ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-purple-500"
                      }`}
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      min="0"
                      required
                      aria-invalid={errors.price ? "true" : "false"}
                      aria-describedby={errors.price ? "price-error" : undefined}
                    />
                  </div>
                  {errors.price && (
                    <p id="price-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.price}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                      value={form.expiryDate}
                      onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Information */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-amber-600" />
                Additional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter item description..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 resize-none"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-amber-400 transition-colors duration-200 cursor-pointer group"
                    >
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-slate-400 group-hover:text-amber-500 transition-colors duration-200" />
                        <p className="mt-2 text-sm text-slate-600">
                          {form.image ? form.image.name : "Click to upload image"}
                        </p>
                      </div>
                    </label>
                  </div>
                  {errors.image && (
                    <p id="image-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-200">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-200 bg-slate-100 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Cancel adding item"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                aria-label="Add new item"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Add Item
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventory;