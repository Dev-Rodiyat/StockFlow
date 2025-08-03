import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, Package, Calendar, Tag, AlertTriangle, CheckCircle, TrendingUp, Clock, Printer } from "lucide-react";
import { useInventory } from "../contexts/InventoryContext";
import EditInventory from "../modals/EditInventory";
import DeleteInventory from "../modals/DeleteInventory";

const InventoryDetails = () => {
    const { items } = useInventory();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const item = items.find((item) => item.id === id);

    if (!item) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-xl rounded-3xl p-8 text-center">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Item Not Found</h2>
                    <p className="text-slate-600 mb-6">The requested inventory item does not exist.</p>
                    <button
                        onClick={() => navigate("/inventory")}
                        className="group flex items-center gap-3 mx-auto text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                        aria-label="Back to inventory list"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                        Back to Inventory
                    </button>
                </div>
            </div>
        );
    }

    const isLowStock = Number(item.quantity) <= 5;
    const isCriticalStock = Number(item.quantity) <= 2;

    const getStockStatus = () => {
        if (isCriticalStock) return { label: "Critical", color: "from-red-500 to-red-600", textColor: "text-red-50", bgColor: "bg-red-50", borderColor: "border-red-200" };
        if (isLowStock) return { label: "Low Stock", color: "from-amber-500 to-orange-500", textColor: "text-amber-50", bgColor: "bg-amber-50", borderColor: "border-amber-200" };
        return { label: "In Stock", color: "from-emerald-500 to-green-500", textColor: "text-emerald-50", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" };
    };

    const stockStatus = getStockStatus();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <style>
                {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-content, .printable-content * {
              visibility: visible;
            }
            .printable-content {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              background: white;
              padding: 0;
              border: none;
              box-shadow: none;
            }
            .printable-content .header-section {
              background: linear-gradient(to right, #1e293b, #0f172a, #1e293b);
              position: relative;
            }
            .printable-content .header-section::before {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(to right, rgba(37, 99, 235, 0.2), rgba(147, 51, 234, 0.2));
            }
            .no-print {
              display: none;
            }
          }
        `}
            </style>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8 no-print">
                    <button
                        onClick={() => navigate("/inventory")}
                        className="group flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-all duration-200 hover:gap-4"
                        aria-label="Back to inventory list"
                    >
                        <div className="p-2 rounded-full bg-white shadow-sm group-hover:shadow-md transition-all duration-200">
                            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                        </div>
                        <span className="font-medium">Back to Inventory</span>
                    </button>
                </div>

                <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-xl rounded-3xl overflow-hidden printable-content">
                    <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white header-section">
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
                                onClick={() => setIsEditModalOpen(true)}
                                className="group p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl transition-all duration-200 hover:scale-105 no-print"
                                aria-label="Edit item"
                            >
                                <Edit3 size={20} className="text-white group-hover:rotate-12 transition-transform duration-200" />
                            </button>
                        </div>
                        <div className="mt-6 flex items-center gap-6">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${stockStatus.color} shadow-lg`}>
                                {isCriticalStock ? (
                                    <AlertTriangle size={16} className={stockStatus.textColor} />
                                ) : (
                                    <CheckCircle size={16} className={stockStatus.textColor} />
                                )}
                                <span className={`font-semibold ${stockStatus.textColor}`} id="stock-status" aria-describedby="stock-status">
                                    {stockStatus.label}
                                </span>
                            </div>
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-20 w-20 object-cover rounded-xl border border-slate-200"
                                />
                            )}
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 rounded-2xl hover:shadow-lg transition-all duration-200">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 bg-white rounded-xl shadow-sm">
                                        <Tag size={20} className="text-purple-600" />
                                    </div>
                                </div>
                                <h3 className="font-semibold text-slate-700 mb-1">Category</h3>
                                <p className="text-purple-700 font-medium">{item.category}</p>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-2xl hover:shadow-lg transition-all duration-200">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 bg-white rounded-xl shadow-sm">
                                        <span className="text-blue-600 font-bold text-lg">$</span>
                                    </div>
                                    <span className="text-2xl font-bold text-slate-800">${Number(item.price).toFixed(2)}</span>
                                </div>
                                <h3 className="font-semibold text-slate-700 mb-1">Unit Price</h3>
                                <p className="text-sm text-slate-500">Per item</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Calendar size={20} className="text-slate-600" />
                                        <h3 className="font-semibold text-slate-800">Timeline</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600">Date Added</span>
                                            <span className="font-medium text-slate-800">
                                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                                            </span>
                                        </div>
                                        {item.updatedAt && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-600">Last Updated</span>
                                                <span className="font-medium text-slate-800">
                                                    {new Date(item.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </span>
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

                        <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200 no-print">
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                                aria-label="Delete stock"
                            >
                                Delete Stock
                            </button>
                            <button
                                onClick={handlePrint}
                                className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                                aria-label="Print item details"
                            >
                                <Printer size={18} className="inline-block mr-2" />
                                Print Details
                            </button>
                        </div>
                    </div>
                </div>

                <EditInventory
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    item={item}
                />
                <DeleteInventory
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    item={item}
                />
            </div>
        </div>
    );
};

export default InventoryDetails;