
import React from 'react';
import { BookOpen, Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-800 via-slate-900 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500 p-2 rounded-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">BookStore Manager</h1>
              <p className="text-slate-300">Manage your book inventory with ease</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Github className="h-5 w-5" />
            <span className="text-sm">Ready for GitHub deployment</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
