import { useState } from 'react';
import { motion } from 'framer-motion';

const faqData = [
    {
        question: 'Is the translator free to use?',
        answer: 'Yes! All features including voice input, translation, and history are free to use.',
    },
    {
        question: 'Which languages are supported?',
        answer: 'We support a wide range of languages including English, Spanish, French, Arabic, Chinese, and more.',
    },
    {
        question: 'Does it work offline?',
        answer: 'Currently, you need an internet connection to fetch translations and use voice features.',
    },
    {
        question: 'Is my data stored?',
        answer: 'Your translation history is stored locally in your browser and never sent to any server.',
    },
];

const About = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#1a120b] text-[#3e2f23] dark:text-white transition-colors duration-300 px-6 py-20">
            <div className="md:px-24 lg:px-40 px-6 mx-auto space-y-12">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-4">About Us</h2>
                    <p className="text-lg">
                        Our translator project was built with love for language learners, travelers, and global citizens.
                        We believe that communication should never be a barrier.
                    </p>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg">
                        We aim to make translation fast, accessible, and inclusive.
                        Our goal is to empower people to speak and understand each other
                        across borders and languages, with a focus on simplicity and accessibility.
                    </p>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                    <ul className="list-disc list-inside space-y-3 text-lg">
                        <li>🎙️ Speak into the mic to auto-detect your voice and language.</li>
                        <li>💬 Type a message and instantly translate it into your target language.</li>
                        <li>🔊 Listen to translations spoken aloud in a natural voice.</li>
                        <li>📜 View past translations and listen again from the history page.</li>
                    </ul>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-6">FAQs</h2>
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-[#d6c3b3] dark:border-[#3e2f23] rounded-lg"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center focus:outline-none"
                                >
                                    {faq.question}
                                    <span className="ml-2">
                                        {activeIndex === index ? '−' : '+'}
                                    </span>
                                </button>
                                {activeIndex === index && (
                                    <div className="px-4 pb-4 text-base text-[#555] dark:text-[#ccc]">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default About;
