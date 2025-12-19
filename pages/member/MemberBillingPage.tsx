import React, { useState } from 'react';
import { 
    CreditCard, 
    Download, 
    Calendar, 
    CheckCircle2, 
    AlertCircle, 
    ArrowUpCircle, 
    ArrowDownCircle, 
    PauseCircle, 
    XCircle,
    FileText,
    HelpCircle,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const MemberBillingPage: React.FC = () => {
    const [autoRenew, setAutoRenew] = useState(true);

    // Mock Subscription Data
    const subscription = {
        tier: 'Executive',
        price: 499,
        interval: 'monthly',
        status: 'Active',
        renewalDate: 'Nov 24, 2023',
        daysRemaining: 14,
        paymentMethod: 'Visa ending in 4242'
    };

    // Mock Invoices
    const invoices = [
        { id: 'INV-2023-001', date: 'Oct 24, 2023', amount: 499.00, status: 'Paid', items: 'Executive Membership (Monthly)' },
        { id: 'INV-2023-002', date: 'Sep 24, 2023', amount: 499.00, status: 'Paid', items: 'Executive Membership (Monthly)' },
        { id: 'INV-2023-003', date: 'Aug 24, 2023', amount: 199.00, status: 'Paid', items: 'Essential Membership (Monthly)' },
        { id: 'INV-2023-TRIP-01', date: 'Oct 12, 2023', amount: 125.00, status: 'Paid', items: 'Trip #LR-7688' },
    ];

    const handleAction = (action: string) => {
        if (window.confirm(`Are you sure you want to ${action}?`)) {
            // Mock action logic
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Billing & Subscription</h1>
                        <p className="text-lux-darkSec mt-1">Manage your plan, view invoices, and update billing details.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Main Content: Subscription Details */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Current Plan Card */}
                        <GlassCard className="p-0 overflow-hidden border-lux-gold/30 shadow-lux-gold/10">
                            <div className="bg-gradient-to-r from-lux-primary/10 to-transparent p-6 md:p-8 flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-bold text-lux-darkSec uppercase tracking-wider mb-2">Current Plan</p>
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-lux-dark mb-2">{subscription.tier}</h2>
                                    <div className="flex items-baseline gap-1 text-lux-darkSec">
                                        <span className="text-xl font-bold text-lux-dark">${subscription.price}</span>
                                        <span className="text-sm">/ {subscription.interval}</span>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                    <CheckCircle2 size={12} />
                                    {subscription.status}
                                </div>
                            </div>

                            <div className="p-6 md:p-8 space-y-8">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-lux-darkSec uppercase">Next Renewal</p>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={18} className="text-lux-gold" />
                                            <span className="font-bold text-lux-dark">{subscription.renewalDate}</span>
                                        </div>
                                        <p className="text-xs text-lux-darkSec pl-6.5">in {subscription.daysRemaining} days</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-lux-darkSec uppercase">Payment Method</p>
                                        <div className="flex items-center gap-2">
                                            <CreditCard size={18} className="text-lux-gold" />
                                            <span className="font-bold text-lux-dark">{subscription.paymentMethod}</span>
                                        </div>
                                        <Link to="/member/payment-methods" className="text-xs text-lux-primary hover:text-lux-gold font-bold pl-6.5">
                                            Change Method
                                        </Link>
                                    </div>
                                </div>

                                {/* Auto-Renew Toggle */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-lux-primary/5 border border-lux-primary/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-white/50 text-lux-primary">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lux-dark text-sm">Auto-Renewal</p>
                                            <p className="text-xs text-lux-darkSec">Plan renews automatically on {subscription.renewalDate}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setAutoRenew(!autoRenew)}
                                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${autoRenew ? 'bg-lux-gold' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${autoRenew ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>

                                {/* Actions */}
                                <div>
                                    <p className="text-xs font-bold text-lux-darkSec uppercase mb-3">Plan Management</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-lux-darkSec/10 bg-white/50 hover:bg-white hover:border-lux-gold/30 hover:text-lux-gold transition-all group">
                                            <ArrowUpCircle size={24} className="text-lux-darkSec group-hover:text-lux-gold" />
                                            <span className="text-xs font-bold text-lux-dark">Upgrade</span>
                                        </button>
                                        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-lux-darkSec/10 bg-white/50 hover:bg-white hover:border-lux-darkSec/30 transition-all group">
                                            <ArrowDownCircle size={24} className="text-lux-darkSec" />
                                            <span className="text-xs font-bold text-lux-dark">Downgrade</span>
                                        </button>
                                        <button 
                                            onClick={() => handleAction('pause your membership')}
                                            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-lux-darkSec/10 bg-white/50 hover:bg-white hover:border-lux-darkSec/30 transition-all group"
                                        >
                                            <PauseCircle size={24} className="text-lux-darkSec" />
                                            <span className="text-xs font-bold text-lux-dark">Pause</span>
                                        </button>
                                        <button 
                                            onClick={() => handleAction('cancel your subscription')}
                                            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-50 hover:border-red-200 transition-all group"
                                        >
                                            <XCircle size={24} className="text-red-400 group-hover:text-red-600" />
                                            <span className="text-xs font-bold text-red-600">Cancel</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Invoice History */}
                        <div>
                            <h3 className="text-xl font-serif font-bold text-lux-dark mb-4">Invoice History</h3>
                            <GlassCard className="p-0 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-lux-primary/5 border-b border-lux-darkSec/5 text-xs font-bold text-lux-darkSec uppercase tracking-wider">
                                                <th className="p-4">Date</th>
                                                <th className="p-4">Description</th>
                                                <th className="p-4">Amount</th>
                                                <th className="p-4">Status</th>
                                                <th className="p-4 text-right">Invoice</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {invoices.map((inv) => (
                                                <tr key={inv.id} className="border-b border-lux-darkSec/5 hover:bg-white/40 transition-colors">
                                                    <td className="p-4 font-medium text-lux-dark">{inv.date}</td>
                                                    <td className="p-4">
                                                        <div className="font-medium text-lux-dark">{inv.items}</div>
                                                        <div className="text-xs text-lux-darkSec font-mono mt-0.5">{inv.id}</div>
                                                    </td>
                                                    <td className="p-4 font-bold text-lux-dark">${inv.amount.toFixed(2)}</td>
                                                    <td className="p-4">
                                                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                                                            {inv.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <button className="p-2 rounded-full hover:bg-lux-primary/10 text-lux-darkSec hover:text-lux-primary transition-colors inline-flex items-center gap-1">
                                                            <Download size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 border-t border-lux-darkSec/5 text-center">
                                    <button className="text-sm font-bold text-lux-gold hover:text-lux-primary transition-colors flex items-center justify-center gap-1">
                                        View All Invoices <ChevronRight size={14} />
                                    </button>
                                </div>
                            </GlassCard>
                        </div>
                    </div>

                    {/* Right Column: Support & Info */}
                    <div className="space-y-6">
                        {/* Help Card */}
                        <GlassCard className="p-6 bg-gradient-to-br from-lux-gold/10 to-transparent border-lux-gold/20">
                            <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center text-lux-gold mb-4 shadow-sm">
                                <HelpCircle size={24} />
                            </div>
                            <h3 className="font-bold text-lux-dark text-lg mb-2">Billing Support</h3>
                            <p className="text-sm text-lux-darkSec mb-6">
                                Have questions about a charge or need to update your tax information? Our concierge team is here to help.
                            </p>
                            <Link 
                                to="/contact" 
                                className="block w-full py-3 rounded-xl bg-white/60 border border-white hover:bg-white text-center font-bold text-lux-dark transition-colors"
                            >
                                Contact Support
                            </Link>
                        </GlassCard>

                        {/* Payment Method Quick Link */}
                        <GlassCard className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lux-dark">Payment Methods</h3>
                                <Link to="/member/payment-methods" className="text-xs font-bold text-lux-gold hover:underline">Manage</Link>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-white/60 mb-2">
                                <div className="w-10 h-8 rounded bg-gray-800 flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-lux-dark">•••• 4242</p>
                                    <p className="text-xs text-lux-darkSec">Expires 12/24</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                        </GlassCard>

                        {/* Usage Summary */}
                        <GlassCard className="p-6">
                             <h3 className="font-bold text-lux-dark mb-4">Usage This Month</h3>
                             <div className="space-y-4">
                                 <div>
                                     <div className="flex justify-between text-sm mb-1">
                                         <span className="font-bold text-lux-dark">Transfers</span>
                                         <span className="text-lux-darkSec">12 / 30</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                         <div className="h-full bg-lux-gold w-[40%]"></div>
                                     </div>
                                 </div>
                                 <div>
                                     <div className="flex justify-between text-sm mb-1">
                                         <span className="font-bold text-lux-dark">Wait Time</span>
                                         <span className="text-lux-darkSec">45 / 120 min</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                         <div className="h-full bg-lux-primary w-[35%]"></div>
                                     </div>
                                 </div>
                             </div>
                        </GlassCard>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default MemberBillingPage;