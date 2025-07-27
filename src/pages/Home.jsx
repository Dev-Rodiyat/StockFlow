import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {

    return (
        <div className="min-h-screen bg-white dark:bg-[#1a120b] text-[#3e2f23] dark:text-white transition-colors duration-300">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
                <motion.h1
                    className="text-4xl sm:text-5xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Say it. See it. Hear it.
                </motion.h1>

                <motion.p
                    className="text-lg sm:text-xl mb-10 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Translate instantly using your voice, keyboard, or history. Built for learners, travelers, and global teams.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link
                        to="/translate"
                        className="bg-[#5c4033] text-white dark:bg-white dark:text-[#1a120b] font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition"
                    >
                        Start Translating
                    </Link>
                </motion.div>
            </section>

            {/* Live Preview Illustration */}
            <section className="bg-[#f5f0eb] dark:bg-[#2d1e16] py-16 px-6">
                <motion.div
                    className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-left">
                        <h2 className="text-3xl font-semibold mb-4">Smart Interface</h2>
                        <p className="text-base mb-3">
                            Use speech-to-text, switch languages, listen to results, and save history – all in one elegant view.
                        </p>
                        <p className="text-base">Try it out and see your words come alive in any language.</p>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-3 text-center">
                    {[
                        {
                            emoji: '🎤',
                            title: 'Speech Input',
                            desc: 'Speak instead of typing. We convert your voice to text for fast translations.',
                        },
                        {
                            emoji: '🔊',
                            title: 'Text-to-Speech',
                            desc: 'Listen to the translated result with natural voices and smart voice matching.',
                        },
                        {
                            emoji: '📜',
                            title: 'History Access',
                            desc: 'All your translations are stored locally, searchable, and listenable again.',
                        },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-semibold mb-2">{feature.emoji} {feature.title}</h3>
                            <p>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-[#f5f0eb] dark:bg-[#2d1e16] py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-3xl font-semibold mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        What Users Say
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                name: 'Amina, Morocco 🇲🇦',
                                quote: 'This translator helped me during my entire trip in Europe. I loved the voice feature!',
                            },
                            {
                                name: 'Luis, Brazil 🇧🇷',
                                quote: 'It’s fast, accurate and the history tab is a game-changer.',
                            },
                        ].map((testimony, i) => (
                            <motion.div
                                key={i}
                                className="bg-white dark:bg-[#3e2f23] p-6 rounded-lg shadow"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="mb-3 italic">“{testimony.quote}”</p>
                                <p className="font-semibold">{testimony.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
