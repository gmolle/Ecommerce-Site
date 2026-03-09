const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="site-container flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm">
          © {new Date().getFullYear()} Your Store. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a href="#!" className="text-sm hover:text-white transition-colors cursor-pointer">
            Privacy Policy
          </a>
          <a href="#!" className="text-sm hover:text-white transition-colors cursor-pointer">
            Terms of Service
          </a>
          <a href="#!" className="text-sm hover:text-white transition-colors cursor-pointer">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
