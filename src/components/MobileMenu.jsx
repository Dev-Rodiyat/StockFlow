import { FaSun, FaMoon, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = ({ onClose, darkMode, toggleTheme, navLinks }) => {
    const location = useLocation();

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-end">
            <div className="w-64 h-full bg-[#fffaf4] text-[#3e2f23] dark:bg-[#1a120b] dark:text-[#f5ede1] p-6 flex flex-col gap-6 shadow-lg">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Menu</span>
                    <button
                        onClick={onClose}
                        className="hover:text-[#a47551] dark:hover:text-[#e0c3a0] transition"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={onClose}
                        className={`transition hover:text-[#a47551] dark:hover:text-[#e0c3a0] ${
                            location.pathname === link.path
                                ? 'text-[#a47551] dark:text-[#e0c3a0] font-semibold'
                                : ''
                        }`}
                    >
                        {link.name}
                    </Link>
                ))}

                <button
                    onClick={toggleTheme}
                    className="mt-4 flex items-center gap-2 hover:text-[#a47551] dark:hover:text-[#e0c3a0] transition"
                >
                    {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>
        </div>
    );
};

export default MobileMenu;
