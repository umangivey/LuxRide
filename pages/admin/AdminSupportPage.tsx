import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    MessageSquare, 
    User, 
    AlertCircle, 
    CheckCircle2, 
    Clock, 
    MoreVertical, 
    ChevronLeft, 
    ChevronRight,
    Send, 
    Shield, 
    FileText, 
    Ban, 
    DollarSign, 
    X,
    Inbox,
    AlertTriangle,
    Car,
    CreditCard,
    Laptop,
    HelpCircle,
    Calendar,
    CornerUpLeft
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

interface Message {
    id: string;
    sender: 'User' | 'Driver' | 'Support' | 'System';
    name: string;
    text: string;
    timestamp: string;
    isInternal?: boolean;
}

interface Ticket {
    id: string;
    subject: string;
    requester: string;
    requesterType: 'Member' | 'Driver';
    category: 'Booking' | 'Driver' | 'Payment' | 'Technical' | 'Dispute' | 'Other';
    priority: 'High' | 'Normal' | 'Low';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    created: string;
    lastUpdated: string;
    assignedTo?: string;
    relatedTripId?: string;
    messages: Message[];
    evidence?: {
        memberStatement?: string;
        driverStatement?: string;
        rating?: number;
    };
}

const AdminSupportPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [replyText, setReplyText] = useState('');
    const [internalNote, setInternalNote] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // Mock Data
    const tickets: Ticket[] = [
        {
            id: 'TKT-2991',
            subject: 'Dispute: Driver did not show up',
            requester: 'James Sterling',
            requesterType: 'Member',
            category: 'Dispute',
            priority: 'High',
            status: 'Open',
            created: 'Oct 24, 10:30 AM',
            lastUpdated: '10 mins ago',
            relatedTripId: 'LR-8821',
            evidence: {
                memberStatement: "I waited for 20 minutes at the curb. The app said arrived but no car was there.",
                driverStatement: "I was at the designated pickup point. Waiting time exceeded 15 mins.",
                rating: 1
            },
            messages: [
                { id: '1', sender: 'User', name: 'James Sterling', text: 'I want a refund. The driver was nowhere to be found.', timestamp: 'Oct 24, 10:30 AM' },
                { id: '2', sender: 'Driver', name: 'Michael C.', text: 'I have dashcam footage of me at the location.', timestamp: 'Oct 24, 10:45 AM' }
            ]
        },
        {
            id: 'TKT-2985',
            subject: 'Refund request for cancelled trip',
            requester: 'Sarah Connor',
            requesterType: 'Member',
            category: 'Payment',
            priority: 'Normal',
            status: 'In Progress',
            created: 'Oct 23, 02:15 PM',
            lastUpdated: '2 hours ago',
            assignedTo: 'Support Agent A',
            messages: [
                { id: '1', sender: 'User', name: 'Sarah Connor', text: 'I cancelled 3 hours before but was still charged.', timestamp: 'Oct 23, 02:15 PM' },
                { id: '2', sender: 'Support', name: 'Agent A', text: 'Checking the timestamps now.', timestamp: 'Oct 23, 02:30 PM' }
            ]
        },
        {
            id: 'TKT-2980',
            subject: 'App crashing on login',
            requester: 'David Miller',
            requesterType: 'Driver',
            category: 'Technical',
            priority: 'High',
            status: 'Open',
            created: 'Oct 23, 09:00 AM',
            lastUpdated: 'Oct 23, 09:00 AM',
            messages: [
                { id: '1', sender: 'Driver', name: 'David Miller', text: 'Every time I try to go online, the app closes.', timestamp: 'Oct 23, 09:00 AM' }
            ]
        },
        {
            id: 'TKT-2975',
            subject: 'Lost item in vehicle',
            requester: 'Elena Gilbert',
            requesterType: 'Member',
            category: 'Other',
            priority: 'Low',
            status: 'Resolved',
            created: 'Oct 22, 06:45 PM',
            lastUpdated: 'Yesterday',
            assignedTo: 'Support Agent B',
            messages: [
                { id: '1', sender: 'User', name: 'Elena Gilbert', text: 'I think I left my sunglasses in the back seat.', timestamp: 'Oct 22, 06:45 PM' },
                { id: '2', sender: 'Support', name: 'Agent B', text: 'We contacted the driver. He found them.', timestamp: 'Oct 23, 09:00 AM' }
            ]
        }
    ];

    // Helpers
    const getCategoryIcon = (cat: string) => {
        switch(cat) {
            case 'Dispute': return <AlertTriangle size={16} />;
            case 'Booking': return <Calendar size={16} />;
            case 'Driver': return <Car size={16} />;
            case 'Payment': return <CreditCard size={16} />;
            case 'Technical': return <Laptop size={16} />;
            default: return <HelpCircle size={16} />;
        }
    };

    const getPriorityColor = (p: string) => {
        switch(p) {
            case 'High': return 'text-red-600 bg-red-100 border-red-200';
            case 'Normal': return 'text-blue-600 bg-blue-100 border-blue-200';
            case 'Low': return 'text-gray-600 bg-gray-100 border-gray-200';
            default: return 'text-gray-600';
        }
    };

    const getStatusColor = (s: string) => {
        switch(s) {
            case 'Open': return 'text-blue-600 font-bold';
            case 'In Progress': return 'text-amber-600 font-bold';
            case 'Resolved': return 'text-green-600 font-bold';
            case 'Closed': return 'text-gray-500 font-bold';
            default: return 'text-gray-500';
        }
    };

    const handleSendMessage = () => {
        if(!selectedTicket || !replyText) return;
        // Mock send
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'Support',
            name: 'You',
            text: replyText,
            timestamp: 'Just now'
        };
        const updatedTicket = { ...selectedTicket, messages: [...selectedTicket.messages, newMessage] };
        setSelectedTicket(updatedTicket);
        setReplyText('');
    };

    const handleAddNote = () => {
        if(!selectedTicket || !internalNote) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'System',
            name: 'Internal Note',
            text: internalNote,
            timestamp: 'Just now',
            isInternal: true
        };
        const updatedTicket = { ...selectedTicket, messages: [...selectedTicket.messages, newMessage] };
        setSelectedTicket(updatedTicket);
        setInternalNote('');
    };

    // Filter Logic
    const filteredTickets = tickets.filter(t => {
        const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) || t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || t.requester.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
        const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <AdminLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Support & Disputes</h1>
                        <p className="text-lux-darkSec mt-1">Manage user inquiries, technical issues, and trip disputes.</p>
                    </div>
                    {selectedItems.length > 0 && (
                        <div className="flex items-center gap-2 animate-in slide-in-from-right-2">
                            <span className="text-sm font-bold text-lux-dark">{selectedItems.length} selected</span>
                            <GradientButton className="px-4 py-2 text-sm">Assign to Me</GradientButton>
                            <button className="px-4 py-2 rounded-full border border-lux-darkSec/20 bg-white hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-bold">
                                Close
                            </button>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <GlassCard className="p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search ticket ID, subject, requester..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm transition-all"
                        />
                    </div>
                    <div className="flex gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                        <div className="relative min-w-[140px]">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={16} />
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm appearance-none cursor-pointer"
                            >
                                <option value="All">All Status</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                        <div className="relative min-w-[140px]">
                            <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-lux-darkSec/50" size={16} />
                            <select 
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-lux-gold text-sm appearance-none cursor-pointer"
                            >
                                <option value="All">All Priority</option>
                                <option value="High">High</option>
                                <option value="Normal">Normal</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                </GlassCard>

                {/* Ticket List */}
                <div className="space-y-4">
                    {filteredTickets.map((ticket) => (
                        <GlassCard 
                            key={ticket.id} 
                            className={`
                                p-0 overflow-hidden cursor-pointer hover:border-lux-gold/30 transition-colors
                                ${selectedItems.includes(ticket.id) ? 'border-lux-gold bg-lux-gold/5' : ''}
                            `}
                        >
                            <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                {/* Checkbox & ID */}
                                <div className="flex items-center gap-4 min-w-[180px]">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedItems.includes(ticket.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) setSelectedItems([...selectedItems, ticket.id]);
                                            else setSelectedItems(selectedItems.filter(id => id !== ticket.id));
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-5 h-5 rounded border-gray-300 text-lux-gold focus:ring-lux-gold cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-mono text-xs font-bold text-lux-darkSec bg-white/50 px-2 py-1 rounded border border-lux-darkSec/10">
                                            {ticket.id}
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 md:hidden">
                                            <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                                            <span className="text-xs text-lux-darkSec">{ticket.lastUpdated}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div 
                                    className="flex-1 w-full"
                                    onClick={() => setSelectedTicket(ticket)}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-lux-darkSec">{getCategoryIcon(ticket.category)}</span>
                                        <span className="text-xs font-bold text-lux-darkSec uppercase tracking-wide">{ticket.category}</span>
                                        {ticket.relatedTripId && (
                                            <span className="text-xs text-lux-gold font-medium bg-lux-gold/10 px-2 rounded-full">Trip #{ticket.relatedTripId}</span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-lux-dark mb-1">{ticket.subject}</h3>
                                    <p className="text-sm text-lux-darkSec">
                                        Requested by <span className="font-bold text-lux-dark">{ticket.requester}</span> ({ticket.requesterType})
                                    </p>
                                </div>

                                {/* Status & Meta */}
                                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 md:gap-1">
                                    <span className={`text-sm ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
                                    <div className="hidden md:flex items-center gap-2">
                                        <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                                    </div>
                                    <span className="text-xs text-lux-darkSec hidden md:block">Updated {ticket.lastUpdated}</span>
                                    {ticket.assignedTo && (
                                        <div className="flex items-center gap-1 text-xs text-lux-primary font-bold bg-lux-primary/5 px-2 py-1 rounded-full">
                                            <User size={10} /> {ticket.assignedTo}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Detail Modal */}
                {selectedTicket && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <GlassCard className="w-full max-w-6xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
                            
                            {/* Modal Header */}
                            <div className="p-6 border-b border-lux-darkSec/10 bg-white/60 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-mono text-xs font-bold text-lux-darkSec bg-white px-2 py-1 rounded border border-lux-darkSec/10">
                                            {selectedTicket.id}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded border font-bold ${getPriorityColor(selectedTicket.priority)}`}>
                                            {selectedTicket.priority} Priority
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-lux-dark">{selectedTicket.subject}</h2>
                                </div>
                                <button 
                                    onClick={() => setSelectedTicket(null)}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-lux-darkSec" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto bg-lux-accent/30 flex flex-col lg:flex-row">
                                
                                {/* Left Column: Conversation */}
                                <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
                                    
                                    {/* Dispute Evidence Section */}
                                    {selectedTicket.category === 'Dispute' && selectedTicket.evidence && (
                                        <div className="mb-8 p-6 rounded-2xl bg-white/60 border border-white shadow-sm">
                                            <h3 className="font-bold text-lux-dark flex items-center gap-2 mb-4">
                                                <Shield size={20} className="text-lux-gold" />
                                                Dispute Evidence
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="p-4 rounded-xl bg-lux-primary/5 border border-lux-primary/10">
                                                    <p className="text-xs font-bold text-lux-darkSec uppercase mb-2">Member Statement</p>
                                                    <p className="text-sm italic text-lux-dark">"{selectedTicket.evidence.memberStatement}"</p>
                                                </div>
                                                <div className="p-4 rounded-xl bg-gray-100 border border-gray-200">
                                                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Driver Statement</p>
                                                    <p className="text-sm italic text-lux-dark">"{selectedTicket.evidence.driverStatement}"</p>
                                                </div>
                                            </div>
                                            {selectedTicket.relatedTripId && (
                                                <div className="mt-4 pt-4 border-t border-lux-darkSec/10 flex justify-between items-center">
                                                    <div className="flex items-center gap-2 text-sm text-lux-dark">
                                                        <Car size={16} /> Trip <span className="font-mono font-bold">{selectedTicket.relatedTripId}</span>
                                                    </div>
                                                    <button className="text-xs font-bold text-lux-primary hover:underline">View Trip Details</button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Messages Thread */}
                                    <div className="space-y-6">
                                        {selectedTicket.messages.map((msg) => (
                                            <div key={msg.id} className={`flex gap-4 ${msg.sender === 'Support' || msg.sender === 'System' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`
                                                    w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 border-white
                                                    ${msg.sender === 'Support' ? 'bg-lux-primary text-white' : 
                                                      msg.sender === 'System' ? 'bg-gray-500 text-white' :
                                                      msg.sender === 'Driver' ? 'bg-lux-dark text-white' : 'bg-lux-gold text-white'}
                                                `}>
                                                    {msg.sender === 'Support' ? <User size={18} /> : 
                                                     msg.sender === 'System' ? <FileText size={18} /> :
                                                     msg.sender === 'Driver' ? <Car size={18} /> : <User size={18} />}
                                                </div>
                                                <div className={`flex flex-col ${msg.sender === 'Support' || msg.sender === 'System' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                                                    <div className="flex items-center gap-2 mb-1 px-1">
                                                        <span className="text-xs font-bold text-lux-darkSec">{msg.name}</span>
                                                        <span className="text-[10px] text-lux-darkSec/60">{msg.timestamp}</span>
                                                    </div>
                                                    <div className={`
                                                        p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                                                        ${msg.isInternal ? 'bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-tr-none' : 
                                                          msg.sender === 'Support' ? 'bg-lux-primary text-white rounded-tr-none' : 'bg-white text-lux-dark rounded-tl-none'}
                                                    `}>
                                                        {msg.isInternal && <div className="flex items-center gap-1 mb-1 text-[10px] font-bold uppercase tracking-wider opacity-70"><Shield size={10} /> Internal Note</div>}
                                                        {msg.text}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                {/* Right Column: Actions & Context */}
                                <div className="w-full lg:w-96 bg-white/60 border-l border-white p-6 md:p-8 flex flex-col gap-6 overflow-y-auto">
                                    
                                    {/* Action Box */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide">Ticket Actions</h3>
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                            <button className="px-3 py-2 rounded-lg border border-lux-darkSec/20 hover:bg-white text-xs font-bold text-lux-dark transition-colors flex items-center justify-center gap-2">
                                                <User size={14} /> Assign
                                            </button>
                                            <button className="px-3 py-2 rounded-lg border border-lux-darkSec/20 hover:bg-white text-xs font-bold text-lux-dark transition-colors flex items-center justify-center gap-2">
                                                <AlertCircle size={14} /> Priority
                                            </button>
                                        </div>

                                        <select 
                                            className="w-full p-2.5 rounded-xl border border-lux-darkSec/20 bg-white text-sm font-medium focus:ring-1 focus:ring-lux-gold outline-none"
                                            defaultValue={selectedTicket.status}
                                        >
                                            <option value="Open">Status: Open</option>
                                            <option value="In Progress">Status: In Progress</option>
                                            <option value="Resolved">Status: Resolved</option>
                                            <option value="Closed">Status: Closed</option>
                                        </select>

                                        {selectedTicket.category === 'Dispute' && (
                                            <button className="w-full px-4 py-3 rounded-xl bg-lux-primary text-white font-bold text-sm hover:bg-lux-dark transition-colors shadow-lg shadow-lux-primary/20 flex items-center justify-center gap-2">
                                                <Shield size={16} /> Resolve Dispute
                                            </button>
                                        )}
                                        
                                        {selectedTicket.category === 'Payment' && (
                                            <button className="w-full px-4 py-3 rounded-xl border border-lux-primary/20 text-lux-primary font-bold text-sm hover:bg-lux-primary/5 transition-colors flex items-center justify-center gap-2">
                                                <DollarSign size={16} /> Process Refund
                                            </button>
                                        )}
                                    </div>

                                    <hr className="border-lux-darkSec/10" />

                                    {/* Reply Box */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-sm font-bold text-lux-dark uppercase tracking-wide">Reply</h3>
                                            <button 
                                                onClick={() => setInternalNote(internalNote ? '' : ' ')} 
                                                className={`text-xs font-bold transition-colors ${internalNote ? 'text-lux-gold' : 'text-lux-darkSec hover:text-lux-dark'}`}
                                            >
                                                {internalNote ? 'Switch to Public' : 'Switch to Internal Note'}
                                            </button>
                                        </div>
                                        
                                        {internalNote !== '' ? (
                                            <div className="relative">
                                                <textarea 
                                                    rows={4}
                                                    value={internalNote}
                                                    onChange={(e) => setInternalNote(e.target.value)}
                                                    placeholder="Add an internal note for the team..."
                                                    className="w-full p-3 rounded-xl bg-yellow-50 border border-yellow-200 focus:ring-1 focus:ring-yellow-400 outline-none text-sm resize-none"
                                                />
                                                <button onClick={handleAddNote} className="absolute bottom-3 right-3 p-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                                                    <Send size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <textarea 
                                                    rows={4}
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder="Type your reply to the user..."
                                                    className="w-full p-3 rounded-xl bg-white border border-lux-darkSec/10 focus:ring-1 focus:ring-lux-gold outline-none text-sm resize-none"
                                                />
                                                <button onClick={handleSendMessage} className="absolute bottom-3 right-3 p-1.5 bg-lux-gold text-white rounded-lg hover:bg-lux-primary transition-colors">
                                                    <Send size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Requester Info */}
                                    <div className="bg-white/40 p-4 rounded-xl border border-white/60">
                                        <h3 className="text-xs font-bold text-lux-darkSec uppercase mb-2">Requester Info</h3>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-lux-gold text-white flex items-center justify-center font-bold text-xs">
                                                {selectedTicket.requester.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-lux-dark text-sm">{selectedTicket.requester}</p>
                                                <p className="text-xs text-lux-darkSec">{selectedTicket.requesterType}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-3">
                                            <div className="text-center p-2 bg-white/50 rounded-lg">
                                                <p className="text-xs text-lux-darkSec">Trips</p>
                                                <p className="font-bold text-lux-dark">45</p>
                                            </div>
                                            <div className="text-center p-2 bg-white/50 rounded-lg">
                                                <p className="text-xs text-lux-darkSec">Rating</p>
                                                <p className="font-bold text-lux-dark">4.9</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </GlassCard>
                    </div>
                )}

            </div>
        </AdminLayout>
    );
};

export default AdminSupportPage;