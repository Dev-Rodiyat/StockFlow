import React from "react";
import {
    FiBox,
    FiBarChart2,
    FiBell,
    FiSmartphone,
} from "react-icons/fi";
import FAQSection from "../components/FAQSection";

const features = [
    {
        icon: <FiBox className="w-6 h-6 text-blue-600" />,
        label: "Inventory Management",
        desc: "Add, edit, delete, and view inventory items.",
    },
    {
        icon: <FiBarChart2 className="w-6 h-6 text-blue-600" />,
        label: "Dashboard Analytics",
        desc: "Get insights into your inventory with charts and metrics.",
    },
    {
        icon: <FiBell className="w-6 h-6 text-blue-600" />,
        label: "Low Stock Alerts",
        desc: "Receive notifications when stock levels are low.",
    },
    {
        icon: <FiSmartphone className="w-6 h-6 text-blue-600" />,
        label: "Responsive Design",
        desc: "Access your inventory from any device.",
    },
];


const About = () => {
    return (
        <>
            {/* About Intro */}
            <section className="py-16 pt-20">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4 animate-fade-in">
                        About Small Business Inventory Tracker
                    </h1>
                    <p className="text-xl text-gray-700 mb-8 animate-fade-in">
                        Small Business Inventory Tracker is a web-based application designed to help small businesses manage their inventory efficiently. With features like real-time tracking, low stock alerts, and dashboard analytics, our app makes inventory management simple and effective.
                    </p>
                </div>
            </section>

            {/* Why We Built This */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Why We Built This</h2>
                    <p className="text-xl text-gray-700">
                        Managing inventory can be a challenge for small businesses, often leading to overstocking, stockouts, or inefficient use of resources. Our app provides real-time tracking, low stock alerts, and analytics to help businesses optimize their inventory levels and reduce costs.
                    </p>
                </div>
            </section>

            {/* Features */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Features</h2>
                    <ul className="space-y-6">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-4">
                                <span className="mt-1">{feature.icon}</span>
                                <div>
                                    <h3 className="text-xl font-semibold">{feature.label}</h3>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-xl text-gray-700">
                        To empower small businesses with tools that simplify inventory management, allowing them to focus on growing their business.
                    </p>
                </div>
            </section>

            <FAQSection />
        </>
    );
};

export default About;
