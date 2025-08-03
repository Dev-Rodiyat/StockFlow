import React from 'react';
import { ArrowLeft, Edit3, Package, Calendar, Tag, AlertTriangle, CheckCircle, TrendingUp, Clock } from "lucide-react";

const InventoryDetails = () => {
  // Mock data for demonstration
  const item = {
    id: 1,
    name: "Premium Wireless Headphones",
    quantity: 23,
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for professional use and entertainment.",
    createdAt: "2024-01-15",
    updatedAt: "2024-07-20",
    price: 299.99,
    supplier: "TechCorp Inc."
  };

  const isLowStock = Number(item.quantity) <= 5;
  const isCriticalStock = Number(item.quantity) <= 2;

  const getStockStatus = () => {
    if (isCriticalStock) return { label: "Critical", color: "from-red-500 to-red-600", textColor: "text-red-50", bgColor: "bg-red-50", borderColor: "border-red-200" };
    if (isLowStock) return { label: "Low Stock", color: "from-amber-500 to-orange-500", textColor: "text-amber-50", bgColor: "bg-amber-50", borderColor: "border-amber-200" };
    return { label: "In Stock", color: "from-emerald-500 to-green-500", textColor: "text-emerald-50", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" };
  };

  const stockStatus = getStockStatus();

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-all duration-200 hover:gap-4"
          >
            <div className="p-2 rounded-full bg-white shadow-sm group-hover:shadow-md transition-all duration-200">
              <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            </div>
            <span className="font-medium">Back to Inventory</span>
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-xl rounded-3xl overflow-hidden">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="relative flex justify-between items-start">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                    <Package size={28} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      {item.name}
                    </h1>
                    <p className="text-slate-300 font-medium">Product ID: #{item.id}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => navigate(`/inventory/${item.id}/edit`)}
                className="group p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl transition-all duration-200 hover:scale-105"
              >
                <Edit3 size={20} className="text-white group-hover:rotate-12 transition-transform duration-200" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="mt-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${stockStatus.color} shadow-lg`}>
                {isCriticalStock ? (
                  <AlertTriangle size={16} className={stockStatus.textColor} />
                ) : (
                  <CheckCircle size={16} className={stockStatus.textColor} />
                )}
                <span className={`font-semibold ${stockStatus.textColor}`}>
                  {stockStatus.label}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Quantity Card */}
              <div className={`p-6 rounded-2xl border-2 ${stockStatus.bgColor} ${stockStatus.borderColor} hover:shadow-lg transition-all duration-200`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <TrendingUp size={20} className="text-slate-700" />
                  </div>
                  <span className="text-2xl font-bold text-slate-800">{item.quantity}</span>
                </div>
                <h3 className="font-semibold text-slate-700 mb-1">Current Stock</h3>
                <p className="text-sm text-slate-500">Units available</p>
              </div>

              {/* Category Card */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 rounded-2xl hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <Tag size={20} className="text-purple-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-slate-700 mb-1">Category</h3>
                <p className="text-purple-700 font-medium">{item.category}</p>
              </div>

              {/* Price Card */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-2xl hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <span className="text-blue-600 font-bold text-lg">$</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-800">${item.price}</span>
                </div>
                <h3 className="font-semibold text-slate-700 mb-1">Unit Price</h3>
                <p className="text-sm text-slate-500">Per item</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar size={20} className="text-slate-600" />
                    <h3 className="font-semibold text-slate-800">Timeline</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Date Added</span>
                      <span className="font-medium text-slate-800">Jan 15, 2024</span>
                    </div>
                    {item.updatedAt && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Last Updated</span>
                        <span className="font-medium text-slate-800">Jul 20, 2024</span>
                      </div>
                    )}
                  </div>
                </div>

                {item.supplier && (
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <h3 className="font-semibold text-slate-800 mb-2">Supplier</h3>
                    <p className="text-green-700 font-medium">{item.supplier}</p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div>
                {item.description && (
                  <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock size={20} className="text-indigo-600" />
                      <h3 className="font-semibold text-slate-800">Description</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{item.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                Update Stock
              </button>
              <button className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetails;