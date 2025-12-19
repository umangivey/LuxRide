import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  DollarSign, 
  Clock, 
  User, 
  FileText, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  GraduationCap
} from 'lucide-react';

interface DriverLayoutProps {
  children: React.ReactNode;
}

export const DriverLayout: React.FC<DriverLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', path: '/driver/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Available Trips', path: '/driver/trips', icon: <Map size={20} /> },
    { label: 'Earnings', path: '/driver/earnings', icon: <DollarSign size={20} /> },
    { label: 'Trip History', path: '/driver/history', icon: <Clock size={20} /> },
    { label: 'Profile', path: '/driver/profile', icon: <User size={20} /> },
    { label: 'Documents', path: '/driver/documents', icon: <FileText size={20} /> },
    { label: 'Training', path: '/driver/onboarding', icon: <GraduationCap size={20} /> },
    { label: 'Support', path: '/driver/support', icon: <HelpCircle size={20} /> },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <Link to="/" className="font-serif font-bold text-xl text-lux-dark">LuxRide Driver</Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-lux-dark">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-[100dvh] w-64 
        bg-white/40 backdrop-blur-2xl border-r border-white/50 shadow-xl
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lux-dark to-lux-primary flex items-center justify-center text-white font-serif font-bold shadow-md">
              D
            </div>
            <span className="font-serif text-2xl font-bold text-lux-dark tracking-tight">
              Driver Portal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-lux-gold text-white shadow-lg shadow-lux-gold/20' 
                      : 'text-lux-darkSec hover:bg-white/50 hover:text-lux-dark'}
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-lux-darkSec/10 mt-6 space-y-4">
             {/* Mini Profile */}
             <div className="flex items-center gap-3 px-2">
                 <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Driver" 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                 />
                 <div className="flex-1 min-w-0">
                     <p className="text-sm font-bold text-lux-dark truncate">Michael C.</p>
                     <p className="text-xs text-lux-darkSec truncate">4.9 ★ Chauffeur</p>
                 </div>
             </div>
             
             <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
             >
                <LogOut size={20} />
                Sign Out
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
         {/* Desktop Top Bar */}
         <div className="hidden md:flex items-center justify-between py-5 px-8">
             <div className="w-full max-w-md relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={18} />
                 <input 
                    type="text" 
                    placeholder="Search trips, earnings..." 
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white/40 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm transition-all"
                 />
             </div>
             <div className="flex items-center gap-4">
                 <button className="relative w-10 h-10 rounded-full bg-white/40 border border-white/60 flex items-center justify-center text-lux-dark hover:bg-white transition-colors">
                     <Bell size={20} />
                     <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                 </button>
             </div>
         </div>

         {/* Content Wrapper */}
         <div className="p-4 md:p-8 pt-0">
            {children}
         </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};