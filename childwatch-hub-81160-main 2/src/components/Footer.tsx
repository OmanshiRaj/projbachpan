const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-90">
            © 2025 Child Protection Platform. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:opacity-80 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              Terms of Service
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
