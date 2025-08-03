import React, { useState } from "react";

const faqs = [
  {
    question: "What is inventory management?",
    answer:
      "Inventory management is the process of ordering, storing, and using a company's inventory: raw materials, components, and finished products.",
  },
  {
    question: "How does this app help with inventory management?",
    answer:
      "It provides tools to track inventory levels, set reorder points, and analyze stock movement, helping businesses maintain optimal inventory levels.",
  },
  {
    question: "Is the app free to use?",
    answer:
      "The app offers a free trial, with premium features available for a subscription fee.",
  },
  {
    question: "What platforms does the app support?",
    answer:
      "The app is web-based and can be accessed from any modern browser on desktop or mobile devices.",
  },
  {
    question: "How can I get started with the app?",
    answer:
      "Sign up for a free trial, create your account, and start adding your inventory items.",
  },
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-${question}`}
      >
        <span className="text-lg font-medium">{question}</span>
        <span className="text-blue-600 text-2xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div id={`faq-${question}`} className="mt-2 text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8" id="faq-heading">
          FAQs
        </h2>
        <div role="region" aria-labelledby="faq-heading">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
