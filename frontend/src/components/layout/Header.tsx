import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full py-4 px-6 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bodoni font-bold text-gray-900 hover:opacity-80 transition-opacity">
          Matcha.
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link to="/about" className="hover:text-black transition-colors">À propos</Link>
        </nav>
      </div>
    </header>
  );
}
