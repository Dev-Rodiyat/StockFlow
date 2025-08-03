import React, { useState } from "react";
import { Search, X, Edit3, Trash2, FileDown, Plus, Filter, Package, AlertTriangle, CheckCircle, TrendingUp, Eye, DollarSign, Building, Tag, Calendar, Grid, List } from "lucide-react";
import AddInventory from "../modals/AddInventory";
import EditInventory from "../modals/EditInventory";
import DeleteInventory from "../modals/DeleteInventory";

const Inventory = () => {
    // Mock data with comprehensive fields
    const mockItems = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            sku: "WH-001",
            quantity: 23,
            minStockLevel: 5,
            category: "Electronics",
            price: 299.99,
            supplier: "TechCorp Inc.",
            location: "Warehouse A",
            description: "High-quality wireless headphones with noise cancellation",
            createdAt: "2024-01-15",
            updatedAt: "2024-07-20",
            expiryDate: "",
            image: null
        },
        {
            id: 2,
            name: "Organic Coffee Beans",
            sku: "CB-002",
            quantity: 3,
            minStockLevel: 10,
            category: "Food & Beverages",
            price: 24.99,
            supplier: "Green Valley Co.",
            location: "Storage Room",
            description: "Premium organic coffee beans from Ethiopia",
            createdAt: "2024-02-10",
            updatedAt: "2024-07-18",
            expiryDate: "2024-12-31",
            image: null
        },
        {
            id: 3,
            name: "Office Chair Ergonomic",
            sku: "OC-003",
            quantity: 15,
            minStockLevel: 3,
            category: "Office Supplies",
            price: 189.99,
            supplier: "Office Pro Ltd.",
            location: "Display Area",
            description: "Ergonomic office chair with lumbar support",
            createdAt: "2024-03-05",
            updatedAt: "2024-07-15",
            expiryDate: "",
            image: null
        }
    ];

    const [items] = useState(mockItems);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [monthFilter, setMonthFilter] = useState("");
    const [viewMode, setViewMode] = useState("table"); // table or grid
    const [showFilters, setShowFilters] = useState(false);

    const [showAdd, setShowAdd] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);

    const categories = ["Electronics", "Food & Beverages", "Office Supplies", "Clothing", "Home & Garden"];

    const filteredItems = items.filter((item) => {
        const isMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

        const isStatus = statusFilter === "all" ? true :
            statusFilter === "low" ? Number(item.quantity) <= item.minStockLevel :
                statusFilter === "critical" ? Number(item.quantity) <= 2 :
                    Number(item.quantity) > item.minStockLevel;

        const isCategory = categoryFilter === "all" ? true : item.category === categoryFilter;

        const isMonth = monthFilter === "" ? true :
            new Date(item.createdAt).getMonth().toString() === monthFilter;

        return isMatch && isStatus && isCategory && isMonth;
    });

    const getStockStatus = (item) => {
        const quantity = Number(item.quantity);
        if (quantity <= 2) return { label: "Critical", color: "from-red-500 to-red-600", bgColor: "bg-red-50", textColor: "text-red-700", borderColor: "border-red-200" };
        if (quantity <= item.minStockLevel) return { label: "Low Stock", color: "from-amber-500 to-orange-500", bgColor: "bg-amber-50", textColor: "text-amber-700", borderColor: "border-amber-200" };
        return { label: "In Stock", color: "from-emerald-500 to-green-500", bgColor: "bg-emerald-50", textColor: "text-emerald-700", borderColor: "border-emerald-200" };
    };

    const handleExportPDF = () => {
        console.log("Exporting PDF...");
    };

    const navigate = (path) => {
        console.log(`Navigating to: ${path}`);
    };

    const stats = {
        total: items.length,
        inStock: items.filter(item => item.quantity > item.minStockLevel).length,
        lowStock: items.filter(item => item.quantity <= item.minStockLevel && item.quantity > 2).length,
        critical: items.filter(item => item.quantity <= 2).length,
        totalValue: items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-8">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-2">
                                Inventory Management
                            </h1>
                            <p className="text-slate-600">Manage your products and stock levels</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setShowAdd(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                            >
                                <Plus size={18} />
                                Add Item
                            </button>
                            <button
                                onClick={handleExportPDF}
                                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                            >
                                <FileDown size={18} />
                                Export
                            </button>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 bg-white/70 hover:bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                            >
                                <Filter size={18} />
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">Total Items</p>
                                    <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                                </div>
                                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                                    <Package className="text-white" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">In Stock</p>
                                    <p className="text-2xl font-bold text-emerald-600">{stats.inStock}</p>
                                </div>
                                <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                                    <CheckCircle className="text-white" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">Low Stock</p>
                                    <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
                                </div>
                                <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl">
                                    <TrendingUp className="text-white" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">Critical</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
                                </div>
                                <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
                                    <AlertTriangle className="text-white" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">Total Value</p>
                                    <p className="text-2xl font-bold text-purple-600">${stats.totalValue.toLocaleString()}</p>
                                </div>
                                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                                    <DollarSign className="text-white" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, SKU, or supplier..."
                                className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <X
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-red-500 cursor-pointer transition-colors duration-200"
                                    size={20}
                                />
                            )}
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex bg-slate-100 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode("table")}
                                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "table"
                                        ? "bg-white shadow-sm text-blue-600"
                                        : "text-slate-600 hover:text-slate-800"
                                    }`}
                            >
                                <List size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "grid"
                                        ? "bg-white shadow-sm text-blue-600"
                                        : "text-slate-600 hover:text-slate-800"
                                    }`}
                            >
                                <Grid size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                            >
                                <option value="all">All Statuses</option>
                                <option value="available">In Stock</option>
                                <option value="low">Low Stock</option>
                                <option value="critical">Critical</option>
                            </select>

                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <select
                                value={monthFilter}
                                onChange={(e) => setMonthFilter(e.target.value)}
                                className="px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                            >
                                <option value="">All Months</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Data Display */}
                {viewMode === "table" ? (
                    <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">SKU</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Supplier</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map((item) => {
                                            const stockStatus = getStockStatus(item);
                                            return (
                                                <tr key={item.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                                                    <td className="px-6 py-4">
                                                        <div
                                                            onClick={() => navigate(`/inventory/${item.id}`)}
                                                            className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
                                                        >
                                                            <div className="font-semibold text-slate-800">{item.name}</div>
                                                            <div className="text-sm text-slate-500 truncate max-w-xs">{item.description}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-mono">
                                                            {item.sku}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Tag size={14} className="text-slate-400" />
                                                            <span className="text-slate-700">{item.category}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-slate-800">{item.quantity}</span>
                                                            <span className="text-slate-500 text-sm">/ {item.minStockLevel} min</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="font-semibold text-slate-800">${item.price}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Building size={14} className="text-slate-400" />
                                                            <span className="text-slate-700">{item.supplier}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                                                            {item.location}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.bgColor} ${stockStatus.textColor} ${stockStatus.borderColor} border`}>
                                                            {stockStatus.label === "Critical" && <AlertTriangle size={12} />}
                                                            {stockStatus.label === "Low Stock" && <TrendingUp size={12} />}
                                                            {stockStatus.label === "In Stock" && <CheckCircle size={12} />}
                                                            {stockStatus.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => navigate(`/inventory/${item.id}`)}
                                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                                                            >
                                                                <Eye size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingItem(item)}
                                                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all duration-200"
                                                            >
                                                                <Edit3 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => setDeletingItem(item)}
                                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Package className="text-slate-300" size={48} />
                                                    <p className="text-slate-400 text-lg">No matching items found</p>
                                                    <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    // Grid View
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredItems.map((item) => {
                            const stockStatus = getStockStatus(item);
                            return (
                                <div key={item.id} className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3
                                                onClick={() => navigate(`/inventory/${item.id}`)}
                                                className="font-semibold text-slate-800 hover:text-blue-600 cursor-pointer transition-colors duration-200 mb-1"
                                            >
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-slate-500 mb-2">{item.description}</p>
                                            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-mono">
                                                {item.sku}
                                            </span>
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${stockStatus.bgColor} ${stockStatus.textColor}`}>
                                            {stockStatus.label === "Critical" && <AlertTriangle size={10} />}
                                            {stockStatus.label === "Low Stock" && <TrendingUp size={10} />}
                                            {stockStatus.label === "In Stock" && <CheckCircle size={10} />}
                                            {stockStatus.label}
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm">Stock</span>
                                            <span className="font-semibold">{item.quantity} / {item.minStockLevel} min</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm">Price</span>
                                            <span className="font-semibold text-green-600">${item.price}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm">Category</span>
                                            <span className="text-sm">{item.category}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm">Location</span>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{item.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                                        <span className="text-xs text-slate-500">{item.supplier}</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => navigate(`/inventory/${item.id}`)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                                            >
                                                <Eye size={14} />
                                            </button>
                                            <button
                                                onClick={() => setEditingItem(item)}
                                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all duration-200"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            <button
                                                onClick={() => setDeletingItem(item)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <AddInventory isOpen={showAdd} onClose={() => setShowAdd(false)} />
                <EditInventory
                    isOpen={!!editingItem}
                    onClose={() => setEditingItem(null)}
                    item={editingItem}
                />
                <DeleteInventory
                    isOpen={!!deletingItem}
                    onClose={() => setDeletingItem(null)}
                    item={deletingItem}
                />
            </div>
        </div>
    );
};

export default Inventory;
