import { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import MobileMenu from './MobileMenu';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored ? stored === 'dark' : true;
    });
    const location = useLocation();

    const toggleTheme = () => setDarkMode(prev => !prev);

    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleMenu = () => setIsMobileMenuOpen(prev => !prev);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Translate", path: "/translator" },
        { name: "History", path: "/history" },
    ];

    return (
        <header className="w-full bg-[#fffaf4] text-[#3e2f23] dark:bg-[#1a120b] dark:text-[#f5ede1] px-6 py-4 flex items-center justify-between shadow-md dark:shadow-black z-50 fixed top-0 md:px-24">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-extrabold text-[#5C4033] dark:text-[#F5EFE6] tracking-wide select-none"
            >
                <span className="text-[#A47551] dark:text-[#D2B48C]">Hi</span>
                <span className="text-[#5C4033] dark:text-[#F5EFE6]">Translate</span>
            </motion.div>

            <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`transition hover:text-[#a47551] dark:hover:text-[#e0c3a0] ${location.pathname === link.path
                            ? 'text-[#a47551] dark:text-[#e0c3a0] font-semibold'
                            : ''
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}

                <button
                    onClick={toggleTheme}
                    className="hover:text-[#a47551] dark:hover:text-[#e0c3a0] transition"
                    title="Toggle theme"
                >
                    {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                </button>
            </nav>

            <button className="md:hidden" onClick={toggleMenu}>
                <FaBars size={20} />
            </button>

            {isMobileMenuOpen && (
                <MobileMenu
                    onClose={toggleMenu}
                    darkMode={darkMode}
                    toggleTheme={toggleTheme}
                    navLinks={navLinks}
                />
            )}
        </header>
    );
};

export default Header;
