const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-blue-600 font-semibold">StackFlow</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
