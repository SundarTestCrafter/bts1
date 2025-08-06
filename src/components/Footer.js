import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div>© {new Date().getFullYear()} Bug Radar. All Rights Reserved.</div>
    </footer>
  );
}

export default Footer;