import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Package, Bell, BarChart2, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Package className="w-12 h-12 text-blue-500 mb-4" />,
    title: "Real-time Inventory Tracking",
    description: "Always know exactly what's in stock with real-time updates.",
  },
  {
    icon: <Bell className="w-12 h-12 text-blue-500 mb-4" />,
    title: "Low Stock Alerts",
    description: "Get notified when stock levels are low to avoid running out.",
  },
  {
    icon: <BarChart2 className="w-12 h-12 text-blue-500 mb-4" />,
    title: "Dashboard Analytics",
    description: "Visualize your inventory data with charts and metrics.",
  },
  {
    icon: <Smartphone className="w-12 h-12 text-blue-500 mb-4" />,
    title: "Mobile-Friendly Interface",
    description: "Manage your inventory on the go with our responsive design.",
  },
];

const testimonials = [
  {
    name: "Jane Doe",
    role: "Small Business Owner",
    quote: "StockFlow transformed how I manage my inventory. It's intuitive and saves me hours every week!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "John Smith",
    role: "Retail Manager",
    quote: "The real-time tracking and alerts keep us ahead of stock issues. Highly recommend!",
    image: "https://images.unsplash.com/photo-1500648767791-7c134a725761?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
];

const Home = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) {
        console.warn(`Section ref at index ${index} is null`);
        return null;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1, rootMargin: "50px" }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer && observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-gradient-shift z-0"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            Simplify Your Inventory Management
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 animate-slide-up delay-100">
            Track your stock, save time, and grow your business with our intuitive inventory tracker.
          </p>
          <div className="flex justify-center gap-4 animate-slide-up delay-200 z-20">
            <Link
              to="/dashboard"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              role="button"
              aria-label="Get started with StockFlow"
            >
              Get Started Free
            </Link>
            <Link
              to="/about"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              role="button"
              aria-label="Learn more about StockFlow"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-white/70 backdrop-blur-sm min-h-[400px]"
        ref={(el) => (sectionRefs.current[0] = el)}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Why Choose StockFlow?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-md border border-gray-100/50 p-6 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-gradient-to-b from-gray-100 to-blue-100 min-h-[400px]"
        ref={(el) => (sectionRefs.current[1] = el)}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Trusted by Small Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-md border border-gray-100/50 p-6 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/inventory"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              role="button"
              aria-label="Try StockFlow now"
            >
              Try It Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;