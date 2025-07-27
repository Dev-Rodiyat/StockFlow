const Footer = () => {
  return (
    <footer className="dark:bg-[#1a120b] bg-gray-100 dark:text-gray-300 shadow dark:border-[#22170e]  border-t py-6 px-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} HiTranslate. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
