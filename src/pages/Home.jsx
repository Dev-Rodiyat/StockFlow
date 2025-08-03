import React from "react";
import { Link } from "react-router-dom";
import { FiBarChart2, FiBox, FiBell, FiSmartphone } from "react-icons/fi";

const features = [
  {
    icon: <FiBox className="w-12 h-12 text-blue-500 mb-4" />,
    title: "Real-time Inventory Tracking",
    description: "Always know exactly what's in stock with real-time updates.",
  },
  {
    icon: <FiBell className="w-12 h-12 text-blue-500 mb-4" />,
    title: "Low Stock Alerts",
    description: "Get notified when stock levels are low to avoid running out.",
  },
  {
    icon: <FiBarChart2 className="w-12 h-12 text-blue-500 mb-4" />,
    title: "Dashboard Analytics",
    description: "Visualize your inventory data with charts and metrics.",
  },
  {
    icon: <FiSmartphone className="w-12 h-12 text-blue-500 mb-4" />,
    title: "Mobile-Friendly Interface",
    description: "Manage your inventory on the go with our responsive design.",
  },
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20 pt-28">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Simplify Your Inventory Management
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in">
            Track your stock, save time, and grow your business with our easy-to-use inventory tracker.
          </p>
          <Link
            to="/add-item"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-300 animate-fade-in"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center animate-fade-in"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Trusted by Small Businesses</h2>
          <p className="text-xl mb-6">
            Join thousands of small businesses who trust us to manage their inventory.
          </p>
          <Link
            to="/inventory"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Try It Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
