import React, { useState, useEffect } from "react";
import { X, Package, Tag, DollarSign, Building, FileText, Calendar, Hash, AlertCircle, CheckCircle, Upload, Edit3 } from "lucide-react";
import { useInventory } from "../contexts/InventoryContext";
import { toast } from "react-toastify";

const EditInventory = ({ isOpen, onClose, item }) => {
    const { editItem } = useInventory()
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
        image: null
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

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
        "Other"
    ];

    const locations = [
        "Warehouse A",
        "Warehouse B",
        "Store Floor",
        "Storage Room",
        "Cold Storage",
        "Display Area",
        "Back Office"
    ];

    useEffect(() => {
        if (item) {
            const initialForm = {
                name: item.name || "",
                quantity: item.quantity || "",
                category: item.category || "",
                price: item.price || "",
                supplier: item.supplier || "",
                description: item.description || "",
                sku: item.sku || "",
                minStockLevel: item.minStockLevel || "",
                location: item.location || "",
                expiryDate: item.expiryDate || "",
                image: item.image || null
            };
            setForm(initialForm);
            setHasChanges(false);
            setErrors({});
        }
    }, [item]);

    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Item name is required";
        if (!form.quantity || form.quantity <= 0) newErrors.quantity = "Valid quantity is required";
        if (!form.category) newErrors.category = "Category is required";
        if (!form.price || form.price <= 0) newErrors.price = "Valid price is required";
        if (!form.minStockLevel || form.minStockLevel < 0) newErrors.minStockLevel = "Minimum stock level is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setHasChanges(true);

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            editItem({ ...item, ...form })
            console.log("Updating item:", { ...item, ...form });

            setHasChanges(false);
            toast.success('Item added successfully!')
        } catch (error) {
            console.error("Error updating item:", error);
            toast.error("Error updating item");
        } finally {
            setIsSubmitting(false);
            onClose();
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleInputChange('image', file);
        }
    };

    const handleCancel = () => {
        if (hasChanges) {
            const confirmDiscard = window.confirm("You have unsaved changes. Are you sure you want to discard them?");
            if (!confirmDiscard) return;
        }
        onClose();
    };

    const getStockStatus = () => {
        const quantity = Number(form.quantity);
        const minLevel = Number(form.minStockLevel);

        if (!quantity || !minLevel) return { label: "Unknown", color: "text-slate-500" };

        if (quantity <= 2) return { label: "Critical", color: "text-red-600" };
        if (quantity <= minLevel) return { label: "Low Stock", color: "text-amber-600" };
        return { label: "In Stock", color: "text-emerald-600" };
    };

    if (!isOpen || !item) return null;

    const stockStatus = getStockStatus();

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 p-6 text-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                                <Edit3 size={28} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Edit Inventory Item</h2>
                                <p className="text-emerald-100">Update product details and inventory information</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCancel}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                            disabled={isSubmitting}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Current Status Indicator */}
                    <div className="mt-4 flex items-center gap-4">
                        <div className="text-sm">
                            <span className="text-emerald-100">Current Status: </span>
                            <span className={`font-semibold ${stockStatus.color === 'text-red-600' ? 'text-red-200' : stockStatus.color === 'text-amber-600' ? 'text-amber-200' : 'text-emerald-200'}`}>
                                {stockStatus.label}
                            </span>
                        </div>
                        {hasChanges && (
                            <div className="flex items-center gap-2 text-sm text-amber-200">
                                <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
                                Unsaved changes
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-6">
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
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-100 ${errors.name
                                            ? 'border-red-300 focus:border-red-500'
                                            : 'border-slate-200 focus:border-blue-500'
                                            }`}
                                        value={form.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
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
                                            onChange={(e) => handleInputChange('sku', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Category *
                                    </label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                                        <select
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-blue-100 appearance-none bg-white ${errors.category
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-slate-200 focus:border-blue-500'
                                                }`}
                                            value={form.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                        >
                                            <option value="">Select category</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
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
                                            onChange={(e) => handleInputChange('supplier', e.target.value)}
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
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-green-100 ${errors.quantity
                                            ? 'border-red-300 focus:border-red-500'
                                            : 'border-slate-200 focus:border-green-500'
                                            }`}
                                        value={form.quantity}
                                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                                    />
                                    {errors.quantity && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
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
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-green-100 ${errors.minStockLevel
                                            ? 'border-red-300 focus:border-red-500'
                                            : 'border-slate-200 focus:border-green-500'
                                            }`}
                                        value={form.minStockLevel}
                                        onChange={(e) => handleInputChange('minStockLevel', e.target.value)}
                                    />
                                    {errors.minStockLevel && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
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
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                    >
                                        <option value="">Select location</option>
                                        {locations.map((loc) => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Stock Status Preview */}
                            <div className="mt-4 p-4 bg-white/50 rounded-xl border border-emerald-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700">Stock Status Preview:</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${stockStatus.label === "Critical" ? "bg-red-100 text-red-700" :
                                        stockStatus.label === "Low Stock" ? "bg-amber-100 text-amber-700" :
                                            stockStatus.label === "In Stock" ? "bg-emerald-100 text-emerald-700" :
                                                "bg-slate-100 text-slate-700"
                                        }`}>
                                        {stockStatus.label}
                                    </span>
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
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-purple-100 ${errors.price
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-slate-200 focus:border-purple-500'
                                                }`}
                                            value={form.price}
                                            onChange={(e) => handleInputChange('price', e.target.value)}
                                        />
                                    </div>
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
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
                                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Total Value Display */}
                            {form.quantity && form.price && (
                                <div className="mt-4 p-4 bg-white/50 rounded-xl border border-purple-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-700">Total Inventory Value:</span>
                                        <span className="text-lg font-bold text-purple-600">
                                            ${(Number(form.quantity) * Number(form.price)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            )}
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
                                        onChange={(e) => handleInputChange('description', e.target.value)}
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
                                            id="image-upload-edit"
                                        />
                                        <label
                                            htmlFor="image-upload-edit"
                                            className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-amber-400 transition-colors duration-200 cursor-pointer group"
                                        >
                                            <div className="text-center">
                                                <Upload className="mx-auto h-8 w-8 text-slate-400 group-hover:text-amber-500 transition-colors duration-200" />
                                                <p className="mt-2 text-sm text-slate-600">
                                                    {form.image ? (typeof form.image === 'string' ? 'Current image' : form.image.name) : "Click to upload new image"}
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-slate-50 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-500">
                            Last updated: {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Never'}
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                className="px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-200 bg-slate-100 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !hasChanges}
                                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={18} />
                                        Update Item
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInventory;