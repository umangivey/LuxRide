import React, { useState } from 'react';
import { 
    Search, 
    Plus, 
    MessageSquare, 
    Phone, 
    Mail, 
    ChevronRight, 
    X, 
    Send, 
    FileText,
    HelpCircle,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronLeft,
    LifeBuoy,
    CreditCard,
    Car,
    User
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

// Types
interface Ticket {
    id: string;
    subject: string;
    category: string;
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    date: string;
    messages: {
        sender: 'user' | 'support';
        text: string;
        timestamp: string;
    }[];
}

const MemberSupportPage: React.FC = () => {
    // State
    const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Mock Data
    const [tickets, setTickets] = useState<Ticket[]>([
        {
            id: 'TKT-10234',
            subject: 'Driver arrived late for pickup',
            category: 'Trip Issue',
            status: 'In Progress',
            date: 'Oct 25, 2023',
            messages: [
                { sender: 'user', text: 'My driver was 15 minutes late for trip #LR-8821.', timestamp: 'Oct 25, 10:00 AM' },
                { sender: 'support', text: 'We apologize for the inconvenience. We are investigating with the dispatch team.', timestamp: 'Oct 25, 10:15 AM' }
            ]
        },
        {
            id: 'TKT-09921',
            subject: 'Billing question regarding invoice #INV-2023-001',
            category: 'Billing',
            status: 'Resolved',
            date: 'Oct 15, 2023',
            messages: [
                { sender: 'user', text: 'I see a charge I do not recognize.', timestamp: 'Oct 15, 09:00 AM' },
                { sender: 'support', text: 'That is the prorated amount for your upgrade.', timestamp: 'Oct 15, 09:30 AM' },
                 { sender: 'user', text: 'Ah, I see. Thank you.', timestamp: 'Oct 15, 09:35 AM' }
            ]
        }
    ]);

    // Create Ticket Form State
    const [newTicket, setNewTicket] = useState({ subject: '', category: 'General', description: '' });
    const [replyText, setReplyText] = useState('');

    // Handlers
    const handleCreateTicket = (e: React.FormEvent) => {
        e.preventDefault();
        const ticket: Ticket = {
            id: `TKT-${Math.floor(Math.random() * 10000)}`,
            subject: newTicket.subject,
            category: newTicket.category,
            status: 'Open',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            messages: [{
                sender: 'user',
                text: newTicket.description,
                timestamp: 'Just now'
            }]
        };
        setTickets([ticket, ...tickets]);
        setView('list');
        setNewTicket({ subject: '', category: 'General', description: '' });
    };

    const handleReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim() || !selectedTicket) return;
        
        const updatedTicket = {
            ...selectedTicket,
            messages: [...selectedTicket.messages, {
                sender: 'user' as const,
                text: replyText,
                timestamp: 'Just now'
            }]
        };
        
        setTickets(tickets.map(t => t.id === updatedTicket.id ? updatedTicket : t));
        setSelectedTicket(updatedTicket);
        setReplyText('');
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Open': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'In Progress': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
            case 'Closed': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Support & Help</h1>
                        <p className="text-lux-darkSec mt-1">We're here to help you with any questions or issues.</p>
                    </div>
                    
                    {view === 'list' && (
                         <GradientButton onClick={() => setView('create')} className="px-6 py-2">
                            <span className="flex items-center gap-2">
                                <Plus size={18} />
                                Create Support Ticket
                            </span>
                        </GradientButton>
                    )}
                </div>

                {view === 'list' && (
                    <>
                        {/* Search & Quick Help */}
                        <div className="grid lg:grid-cols-3 gap-6">
                            <GlassCard className="lg:col-span-2 p-6 flex flex-col justify-center">
                                <div className="relative mb-6">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="Search frequently asked questions..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-lux-dark transition-all"
                                    />
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {['Billing', 'Booking', 'Account', 'Safety'].map((cat) => (
                                        <button key={cat} className="px-4 py-2 rounded-full bg-lux-primary/5 border border-lux-primary/10 text-lux-dark font-medium text-sm hover:bg-lux-primary/10 transition-colors whitespace-nowrap">
                                            {cat} Help
                                        </button>
                                    ))}
                                </div>
                            </GlassCard>

                            <GlassCard className="p-6 bg-gradient-to-br from-lux-gold/10 to-transparent flex flex-col justify-center items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center text-lux-gold mb-3 shadow-sm">
                                    <LifeBuoy size={24} />
                                </div>
                                <h3 className="font-bold text-lux-dark">Need Immediate Help?</h3>
                                <p className="text-xs text-lux-darkSec mb-3">Our concierge team is available 24/7.</p>
                                <a href="tel:+14045550123" className="text-sm font-bold text-lux-primary hover:underline">
                                    +1 (404) 555-0123
                                </a>
                            </GlassCard>
                        </div>

                        {/* Quick Categories */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button className="p-4 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition-all text-left group">
                                <CreditCard size={24} className="text-lux-darkSec mb-3 group-hover:text-lux-gold transition-colors" />
                                <h4 className="font-bold text-lux-dark text-sm">Billing Issues</h4>
                            </button>
                            <button className="p-4 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition-all text-left group">
                                <Car size={24} className="text-lux-darkSec mb-3 group-hover:text-lux-gold transition-colors" />
                                <h4 className="font-bold text-lux-dark text-sm">Trip Feedback</h4>
                            </button>
                            <button className="p-4 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition-all text-left group">
                                <FileText size={24} className="text-lux-darkSec mb-3 group-hover:text-lux-gold transition-colors" />
                                <h4 className="font-bold text-lux-dark text-sm">Policy Questions</h4>
                            </button>
                            <button className="p-4 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition-all text-left group">
                                <HelpCircle size={24} className="text-lux-darkSec mb-3 group-hover:text-lux-gold transition-colors" />
                                <h4 className="font-bold text-lux-dark text-sm">General Support</h4>
                            </button>
                        </div>

                        {/* Tickets List */}
                        <div>
                            <h2 className="text-xl font-bold text-lux-dark mb-4">Your Support Tickets</h2>
                            <div className="space-y-4">
                                {tickets.map((ticket) => (
                                    <GlassCard key={ticket.id} className="p-0 overflow-hidden hover:border-lux-gold/30 transition-colors group">
                                        <div 
                                            onClick={() => { setSelectedTicket(ticket); setView('detail'); }}
                                            className="p-6 cursor-pointer flex flex-col md:flex-row items-center gap-6"
                                        >
                                            <div className="flex-1 w-full">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-mono text-xs font-bold text-lux-darkSec bg-lux-primary/5 px-2 py-1 rounded">
                                                        {ticket.id}
                                                    </span>
                                                    <span className="text-xs text-lux-darkSec md:hidden">{ticket.date}</span>
                                                </div>
                                                <h3 className="font-bold text-lux-dark text-lg group-hover:text-lux-primary transition-colors">{ticket.subject}</h3>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                                                        {ticket.status}
                                                    </span>
                                                    <span className="text-xs text-lux-darkSec">• {ticket.category}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                                <span className="text-sm font-medium text-lux-darkSec hidden md:block">{ticket.date}</span>
                                                <button className="px-4 py-2 rounded-full border border-lux-darkSec/20 text-xs font-bold text-lux-dark hover:bg-white hover:text-lux-gold transition-colors flex items-center gap-1">
                                                    View Details <ChevronRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>

                        {/* Contact Options */}
                        <div className="grid md:grid-cols-3 gap-6 pt-6">
                            <GlassCard className="p-6 text-center hover:bg-white/60 transition-colors">
                                <div className="w-12 h-12 mx-auto rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-primary mb-4">
                                    <Phone size={24} />
                                </div>
                                <h3 className="font-bold text-lux-dark">Phone Support</h3>
                                <p className="text-sm text-lux-darkSec mb-4">Immediate assistance 24/7</p>
                                <a href="tel:+14045550123" className="block w-full py-2 rounded-lg bg-lux-primary text-white text-sm font-bold hover:bg-lux-dark transition-colors">
                                    Call Now
                                </a>
                            </GlassCard>
                            <GlassCard className="p-6 text-center hover:bg-white/60 transition-colors">
                                <div className="w-12 h-12 mx-auto rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-primary mb-4">
                                    <Mail size={24} />
                                </div>
                                <h3 className="font-bold text-lux-dark">Email Support</h3>
                                <p className="text-sm text-lux-darkSec mb-4">Response within 2 hours</p>
                                <a href="mailto:support@luxride.com" className="block w-full py-2 rounded-lg bg-lux-primary/10 text-lux-primary border border-lux-primary/20 text-sm font-bold hover:bg-lux-primary hover:text-white transition-colors">
                                    Email Us
                                </a>
                            </GlassCard>
                            <GlassCard className="p-6 text-center hover:bg-white/60 transition-colors">
                                <div className="w-12 h-12 mx-auto rounded-full bg-lux-primary/5 flex items-center justify-center text-lux-primary mb-4">
                                    <MessageSquare size={24} />
                                </div>
                                <h3 className="font-bold text-lux-dark">Live Chat</h3>
                                <p className="text-sm text-lux-darkSec mb-4">Chat with an agent</p>
                                <button className="block w-full py-2 rounded-lg bg-lux-primary/10 text-lux-primary border border-lux-primary/20 text-sm font-bold hover:bg-lux-primary hover:text-white transition-colors">
                                    Start Chat
                                </button>
                            </GlassCard>
                        </div>
                    </>
                )}

                {/* Create Ticket View */}
                {view === 'create' && (
                    <div className="max-w-2xl mx-auto animate-in slide-in-from-right-4">
                        <button 
                            onClick={() => setView('list')}
                            className="flex items-center gap-2 text-lux-darkSec hover:text-lux-dark font-bold mb-6"
                        >
                            <ChevronLeft size={18} /> Back to Support
                        </button>
                        
                        <GlassCard className="p-8">
                            <h2 className="text-2xl font-serif font-bold text-lux-dark mb-6">Create Support Ticket</h2>
                            <form onSubmit={handleCreateTicket} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">Subject</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newTicket.subject}
                                        onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                                        placeholder="Brief summary of the issue"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">Category</label>
                                    <select 
                                        value={newTicket.category}
                                        onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                                    >
                                        <option>General Inquiry</option>
                                        <option>Trip Issue</option>
                                        <option>Billing Question</option>
                                        <option>Technical Support</option>
                                        <option>Feedback</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">Description</label>
                                    <textarea 
                                        required
                                        rows={5}
                                        value={newTicket.description}
                                        onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all resize-none"
                                        placeholder="Please provide as much detail as possible..."
                                    />
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <GradientButton className="flex-1">Submit Ticket</GradientButton>
                                    <button 
                                        type="button"
                                        onClick={() => setView('list')}
                                        className="px-6 py-3 rounded-full border border-lux-darkSec/20 text-lux-dark font-bold hover:bg-white/50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </GlassCard>
                    </div>
                )}

                {/* Ticket Detail View */}
                {view === 'detail' && selectedTicket && (
                    <div className="max-w-3xl mx-auto animate-in slide-in-from-right-4">
                        <button 
                            onClick={() => setView('list')}
                            className="flex items-center gap-2 text-lux-darkSec hover:text-lux-dark font-bold mb-6"
                        >
                            <ChevronLeft size={18} /> Back to Support
                        </button>

                        <GlassCard className="p-0 overflow-hidden mb-6">
                            <div className="p-6 md:p-8 border-b border-lux-darkSec/5 bg-white/40">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-xs font-bold text-lux-darkSec bg-white px-2 py-1 rounded border border-lux-darkSec/10">
                                                {selectedTicket.id}
                                            </span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(selectedTicket.status)}`}>
                                                {selectedTicket.status}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-serif font-bold text-lux-dark">{selectedTicket.subject}</h2>
                                    </div>
                                    <span className="text-sm font-medium text-lux-darkSec">{selectedTicket.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-lux-darkSec">
                                    <span className="font-bold">Category:</span> {selectedTicket.category}
                                </div>
                            </div>

                            <div className="p-6 md:p-8 bg-white/20 min-h-[300px] max-h-[500px] overflow-y-auto space-y-6">
                                {selectedTicket.messages.map((msg, idx) => (
                                    <div key={idx} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm
                                            ${msg.sender === 'user' ? 'bg-lux-gold text-white' : 'bg-lux-primary text-white'}
                                        `}>
                                            {msg.sender === 'user' ? <User size={18} /> : <HeadphonesIcon size={18} />}
                                        </div>
                                        <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                            <div className={`
                                                p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                                                ${msg.sender === 'user' 
                                                    ? 'bg-lux-gold/10 text-lux-dark rounded-tr-none' 
                                                    : 'bg-white text-lux-dark rounded-tl-none'}
                                            `}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[10px] text-lux-darkSec mt-1 px-2">{msg.timestamp}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedTicket.status !== 'Closed' && (
                                <div className="p-6 bg-white/60 border-t border-white">
                                    <form onSubmit={handleReply} className="relative">
                                        <textarea 
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            rows={3}
                                            placeholder="Type your reply here..."
                                            className="w-full pl-4 pr-14 py-3 rounded-xl bg-white border border-lux-darkSec/10 focus:ring-1 focus:ring-lux-gold focus:border-lux-gold outline-none resize-none shadow-inner"
                                        />
                                        <button 
                                            type="submit"
                                            disabled={!replyText.trim()}
                                            className="absolute right-3 bottom-3 p-2 rounded-lg bg-lux-gold text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-lux-primary transition-colors shadow-sm"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </form>
                                </div>
                            )}
                        </GlassCard>
                    </div>
                )}

            </div>
        </DashboardLayout>
    );
};

// Helper Icon Component
const HeadphonesIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
);

export default MemberSupportPage;