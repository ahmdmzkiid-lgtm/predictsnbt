import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  MagnifyingGlassIcon, HomeIcon, ScaleIcon, ShieldCheckIcon,
  BookmarkIcon, SunIcon, MoonIcon, Bars3Icon, XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { path: '/search', label: 'Cari Prodi', icon: MagnifyingGlassIcon },
  { path: '/compare', label: 'Bandingkan', icon: ScaleIcon },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pixel-grid">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-navy-800/95 backdrop-blur-md border-r border-navy-600/50 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <h1 className="font-pixel text-sm text-cyan-glow neon-text tracking-wider">ahmdmzki12</h1>
        </div>

        <nav className="px-4 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20 shadow-neon'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-navy-700/50'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
          {user?.role === 'ADMIN' && (
            <NavLink
              to="/admin"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20 shadow-neon'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-navy-700/50'
                }`
              }
            >
              <ShieldCheckIcon className="w-5 h-5" />
              Admin Panel
            </NavLink>
          )}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-navy-600/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-glow to-cyan-accent flex items-center justify-center text-navy-900 font-bold text-sm">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={toggleTheme} className="flex-1 p-2 rounded-lg bg-navy-700/50 hover:bg-navy-600/50 transition-colors" title="Toggle theme">
              {dark ? <SunIcon className="w-4 h-4 mx-auto text-yellow-400" /> : <MoonIcon className="w-4 h-4 mx-auto text-blue-400" />}
            </button>
            <button onClick={handleLogout} className="flex-1 p-2 rounded-lg bg-navy-700/50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors" title="Logout">
              <ArrowRightOnRectangleIcon className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top bar for mobile */}
        <header className="lg:hidden sticky top-0 z-30 bg-navy-800/90 backdrop-blur-md border-b border-navy-600/50 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-navy-700/50 rounded-lg">
            <Bars3Icon className="w-6 h-6" />
          </button>
          <h1 className="font-pixel text-xs text-cyan-glow neon-text">ahmdmzki12</h1>
          <button onClick={toggleTheme} className="p-2 hover:bg-navy-700/50 rounded-lg">
            {dark ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-blue-400" />}
          </button>
        </header>

        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
