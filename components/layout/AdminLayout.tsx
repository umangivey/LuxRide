import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  Map, 
  DollarSign, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  ShieldAlert,
  CalendarCheck,
  BarChart2,
  Scale
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart2 size={20} /> },
    { label: 'Members', path: '/admin/members', icon: <Users size={20} /> },
    { label: 'Drivers', path: '/admin/drivers', icon: <Car size={20} /> },
    { label: 'Bookings', path: '/admin/bookings', icon: <CalendarCheck size={20} /> },
    { label: 'Revenue', path: '/admin/revenue', icon: <DollarSign size={20} /> },
    { label: 'Support', path: '/admin/support', icon: <MessageSquare size={20} /> },
    { label: 'Compliance', path: '/admin/compliance', icon: <Scale size={20} /> },
    { label: 'System', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-lux-accent">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="flex items-center gap-2">
            <ShieldAlert className="text-lux-gold" size={24} />
            <Link to="/" className="font-serif font-bold text-xl text-lux-dark">LuxRide Admin</Link>
        </div>
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
            <div className="w-8 h-8 rounded-lg bg-lux-dark flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
            <span className="font-serif text-xl font-bold text-lux-dark tracking-tight">
              Admin Portal
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
                      ? 'bg-lux-dark text-white shadow-lg' 
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
             {/* Admin User */}
             <div className="flex items-center gap-3 px-2">
                 <div className="w-10 h-10 rounded-full bg-lux-gold/20 flex items-center justify-center text-lux-dark font-bold border border-lux-gold/30">
                     AD
                 </div>
                 <div className="flex-1 min-w-0">
                     <p className="text-sm font-bold text-lux-dark truncate">Admin User</p>
                     <p className="text-xs text-lux-darkSec truncate">Super Admin</p>
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
      <main className="flex-1 min-w-0 overflow-y-auto">
         {/* Desktop Top Bar */}
         <div className="hidden md:flex items-center justify-between py-5 px-8">
             <div className="w-full max-w-md relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={18} />
                 <input 
                    type="text" 
                    placeholder="Search users, trips, logs..." 
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