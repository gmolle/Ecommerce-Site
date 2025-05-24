const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-10  sticky b-0 w-full">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Your Store. All rights reserved.</p>
        <div className="space-x-6 mt-4 md:mt-0">
          <a href="#!" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#!" className="hover:underline">
            Terms of Service
          </a>
          <a href="#!" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
