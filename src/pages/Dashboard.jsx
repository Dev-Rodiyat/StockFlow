import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from "recharts";
import { AlertTriangle, Boxes, CalendarClock, PackageCheck, TrendingUp, TrendingDown, DollarSign, Eye, Filter, RefreshCw, Download, ArrowUpRight, ArrowDownRight, Package, Building, Tag, Clock } from "lucide-react";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("quantity");

  // Mock comprehensive data
  const items = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      quantity: 23,
      price: 299.99,
      category: "Electronics",
      supplier: "TechCorp Inc.",
      createdAt: "2024-07-15",
      minStockLevel: 5
    },
    {
      id: 2,
      name: "Organic Coffee Beans",
      quantity: 3,
      price: 24.99,
      category: "Food & Beverages",
      supplier: "Green Valley Co.",
      createdAt: "2024-07-20",
      minStockLevel: 10
    },
    {
      id: 3,
      name: "Office Chair Ergonomic",
      quantity: 15,
      price: 189.99,
      category: "Office Supplies",
      supplier: "Office Pro Ltd.",
      createdAt: "2024-07-10",
      minStockLevel: 3
    },
    {
      id: 4,
      name: "Running Shoes",
      quantity: 8,
      price: 129.99,
      category: "Sports & Outdoors",
      supplier: "SportMax",
      createdAt: "2024-07-18",
      minStockLevel: 5
    },
    {
      id: 5,
      name: "Laptop Stand",
      quantity: 12,
      price: 79.99,
      category: "Electronics",
      supplier: "TechCorp Inc.",
      createdAt: "2024-07-22",
      minStockLevel: 4
    }
  ];

  const totalItems = items.length;
  const totalQuantity = items.reduce((acc, item) => acc + Number(item.quantity), 0);
  const totalValue = items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0);
  const lowStockItems = items.filter(item => Number(item.quantity) <= item.minStockLevel);
  const criticalStockItems = items.filter(item => Number(item.quantity) <= 2);

  const recentItems = [...items]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const categoryData = items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = { name: category, value: 0, count: 0, totalValue: 0 };
    }
    acc[category].value += Number(item.quantity);
    acc[category].count += 1;
    acc[category].totalValue += Number(item.quantity) * Number(item.price);
    return acc;
  }, {});

  const pieData = Object.values(categoryData);

  const stockStatusData = [
    { name: "In Stock", value: items.filter(item => item.quantity > item.minStockLevel).length, color: "#10b981" },
    { name: "Low Stock", value: items.filter(item => item.quantity <= item.minStockLevel && item.quantity > 2).length, color: "#f59e0b" },
    { name: "Critical", value: criticalStockItems.length, color: "#ef4444" }
  ];

  const trendData = [
    { date: "Jul 01", quantity: 45, value: 12400, items: 18 },
    { date: "Jul 05", quantity: 52, value: 14200, items: 19 },
    { date: "Jul 10", quantity: 48, value: 13800, items: 20 },
    { date: "Jul 15", quantity: 61, value: 16500, items: 21 },
    { date: "Jul 20", quantity: 58, value: 15900, items: 22 },
    { date: "Jul 25", quantity: 61, value: 17200, items: 23 }
  ];

  const supplierData = items.reduce((acc, item) => {
    if (!acc[item.supplier]) {
      acc[item.supplier] = { name: item.supplier, items: 0, totalValue: 0 };
    }
    acc[item.supplier].items += 1;
    acc[item.supplier].totalValue += Number(item.quantity) * Number(item.price);
    return acc;
  }, {});

  const topSuppliers = Object.values(supplierData)
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 5);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getChangePercentage = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-2">
                Inventory Dashboard
              </h1>
              <p className="text-slate-600">Real-time insights into your inventory performance</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-white/70 border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-white transition-all duration-200"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white border border-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02]">
                <RefreshCw size={16} />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Boxes className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                <ArrowUpRight size={16} />
                +12%
              </div>
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">Total Items</p>
              <p className="text-3xl font-bold text-slate-800">{totalItems}</p>
              <p className="text-slate-500 text-xs mt-1">Across all categories</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                <PackageCheck className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                <ArrowUpRight size={16} />
                +8%
              </div>
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">Total Stock</p>
              <p className="text-3xl font-bold text-slate-800">{totalQuantity.toLocaleString()}</p>
              <p className="text-slate-500 text-xs mt-1">Units in inventory</p>
            </div>
          </div>

          {/* Total Value */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <DollarSign className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                <ArrowUpRight size={16} />
                +15%
              </div>
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">Total Value</p>
              <p className="text-3xl font-bold text-slate-800">{formatCurrency(totalValue)}</p>
              <p className="text-slate-500 text-xs mt-1">Current inventory worth</p>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
                <AlertTriangle className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                <ArrowDownRight size={16} />
                Alert
              </div>
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">Low Stock Items</p>
              <p className="text-3xl font-bold text-slate-800">{lowStockItems.length}</p>
              <p className="text-slate-500 text-xs mt-1">Require attention</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Inventory Trend */}
          <div className="xl:col-span-2 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Inventory Trends</h3>
                <p className="text-slate-600 text-sm">Stock levels over time</p>
              </div>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
              >
                <option value="quantity">Quantity</option>
                <option value="value">Value</option>
                <option value="items">Items Count</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey={selectedMetric}
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stock Status Distribution */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Stock Status</h3>
              <p className="text-slate-600 text-sm">Current stock distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={stockStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                >
                  {stockStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {stockStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Analysis & Top Suppliers */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Category Distribution */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Category Distribution</h3>
              <p className="text-slate-600 text-sm">Inventory breakdown by category</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pieData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Suppliers */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Top Suppliers</h3>
              <p className="text-slate-600 text-sm">By inventory value</p>
            </div>
            <div className="space-y-4">
              {topSuppliers.map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                      <Building className="text-white" size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{supplier.name}</p>
                      <p className="text-sm text-slate-500">{supplier.items} items</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">{formatCurrency(supplier.totalValue)}</p>
                    <p className="text-sm text-slate-500">Total value</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity & Low Stock Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Items */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Recent Activity</h3>
                <p className="text-slate-600 text-sm">Latest inventory additions</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <Eye size={16} />
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                      <Package className="text-white" size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>Qty: {item.quantity}</span>
                        <span className="flex items-center gap-1">
                          <Tag size={12} />
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">{formatCurrency(item.price)}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Stock Alerts</h3>
                <p className="text-slate-600 text-sm">Items requiring attention</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                <AlertTriangle size={14} />
                {lowStockItems.length} alerts
              </div>
            </div>
            <div className="space-y-3">
              {lowStockItems.length > 0 ? (
                lowStockItems.map((item) => {
                  const isCritical = item.quantity <= 2;
                  return (
                    <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                      isCritical 
                        ? 'bg-gradient-to-r from-red-50 to-red-25 border-red-200' 
                        : 'bg-gradient-to-r from-amber-50 to-amber-25 border-amber-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isCritical 
                            ? 'bg-gradient-to-r from-red-500 to-red-600' 
                            : 'bg-gradient-to-r from-amber-500 to-amber-600'
                        }`}>
                          <AlertTriangle className="text-white" size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{item.name}</p>
                          <p className={`text-sm font-medium ${
                            isCritical ? 'text-red-600' : 'text-amber-600'
                          }`}>
                            {item.quantity} left (Min: {item.minStockLevel})
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          isCritical 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {isCritical ? 'Critical' : 'Low Stock'}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl w-fit mx-auto mb-3">
                    <PackageCheck className="text-white" size={24} />
                  </div>
                  <p className="text-slate-600 font-medium">All items are well stocked!</p>
                  <p className="text-slate-500 text-sm">No alerts at this time</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;