import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Package, BarChart2, Bell, Smartphone } from "lucide-react";
import FAQSection from "../components/FAQSection";

const features = [
  {
    icon: <Package className="w-12 h-12 text-blue-500 mb-4" />,
    label: "Inventory Management",
    desc: "Add, edit, delete, and view inventory items with ease.",
  },
  {
    icon: <BarChart2 className="w-12 h-12 text-blue-500 mb-4" />,
    label: "Dashboard Analytics",
    desc: "Get insights into your inventory with charts and metrics.",
  },
  {
    icon: <Bell className="w-12 h-12 text-blue-500 mb-4" />,
    label: "Low Stock Alerts",
    desc: "Receive notifications when stock levels are low.",
  },
  {
    icon: <Smartphone className="w-12 h-12 text-blue-500 mb-4" />,
    label: "Responsive Design",
    desc: "Access your inventory from any device.",
  },
];

const About = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    console.log("Setting up IntersectionObserver for", sectionRefs.current.length, "sections");
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) {
        console.warn(`Section ref at index ${index} is null`);
        return null;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          console.log(`Observing section ${index}: isIntersecting = ${entry.isIntersecting}`);
          if (entry.isIntersecting) {
            const content = ref.querySelector(".content");
            if (content) {
              content.classList.add("animate-slide-up");
              content.classList.remove("opacity-0");
            }
            observer.unobserve(ref);
          }
        },
        { threshold: 0.1, rootMargin: "50px" }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      console.log("Cleaning up observers");
      observers.forEach((observer) => observer && observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 pt-16">
      {/* About Intro */}
      <section className="relative py-20 overflow-hidden" ref={(el) => (sectionRefs.current[0] = el)}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm z-0 pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 animate-slide-up">
            About StockFlow
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-600 animate-slide-up delay-100">
            StockFlow is a web-based platform designed to simplify inventory management for small businesses. With real-time tracking, low stock alerts, and powerful analytics, we make inventory management effortless.
          </p>
          <Link
            to="/inventory"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 z-20"
            role="button"
            aria-label="Get started with StockFlow"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Why We Built This */}
      <section
        className="py-20 bg-gradient-to-b from-gray-100 to-blue-100 min-h-[300px]"
        ref={(el) => (sectionRefs.current[1] = el)}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Why We Built StockFlow</h2>
          <div className="content bg-white/70 backdrop-blur-md border border-gray-100/50 p-8 rounded-3xl shadow-md opacity-0">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Managing inventory can be a challenge for small businesses, often leading to overstocking, stockouts, or wasted resources. StockFlow provides real-time tracking, automated low stock alerts, and insightful analytics to help businesses optimize their inventory and reduce costs.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="py-20 min-h-[400px]"
        ref={(el) => (sectionRefs.current[2] = el)}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Our Features</h2>
          <div className="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-md border border-gray-100/50 p-6 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.label}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="py-20 bg-gradient-to-b from-gray-100 to-blue-100 min-h-[300px]"
        ref={(el) => (sectionRefs.current[3] = el)}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Our Mission</h2>
          <div className="content bg-white/70 backdrop-blur-md border border-gray-100/50 p-8 rounded-3xl shadow-md opacity-0">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              To empower small businesses with intuitive tools that streamline inventory management, freeing up time and resources to focus on growth and success.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-20 min-h-[300px]"
        ref={(el) => (sectionRefs.current[4] = el)}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Frequently Asked Questions</h2>
          <div className="content bg-white/70 backdrop-blur-md border border-gray-100/50 p-8 rounded-3xl shadow-md opacity-0">
            <FAQSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;