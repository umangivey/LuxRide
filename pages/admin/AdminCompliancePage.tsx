import React, { useState } from 'react';
import { 
    Shield, 
    FileText, 
    Lock, 
    AlertTriangle, 
    CheckCircle2, 
    Clock, 
    History, 
    Download, 
    ChevronDown, 
    Globe, 
    Eye,
    Save,
    RotateCcw,
    FileCheck,
    Users,
    Activity,
    Scale
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const AdminCompliancePage: React.FC = () => {
    const [policyTab, setPolicyTab] = useState<'tos' | 'privacy'>('tos');
    const [policyVersion, setPolicyVersion] = useState('2.4 (Current)');
    const [policyContent, setPolicyContent] = useState('This Terms of Service ("Agreement") is a legal agreement between you and LuxRide...');

    // Mock Data for Audit Trail
    const auditLogs = [
        { id: 'LOG-9921', user: 'Admin User', action: 'Updated Driver Payout Rate', target: 'System Settings', timestamp: 'Oct 24, 14:30', ip: '192.168.1.1' },
        { id: 'LOG-9920', user: 'Support Agent A', action: 'Refund Processed', target: 'Booking #LR-8821', timestamp: 'Oct 24, 11:15', ip: '192.168.1.4' },
        { id: 'LOG-9919', user: 'Admin User', action: 'Driver Approved', target: 'Driver #DR-105', timestamp: 'Oct 23, 09:45', ip: '192.168.1.1' },
        { id: 'LOG-9918', user: 'System', action: 'Monthly Invoices Generated', target: 'Billing Cycle', timestamp: 'Oct 01, 00:00', ip: 'System' },
    ];

    // Mock Data requests
    const deletionRequests = [
        { id: 'REQ-001', user: 'user_deleted_99', email: 'john.d@example.com', requested: 'Oct 20, 2023', status: 'Pending Review' },
        { id: 'REQ-002', user: 'sarah_k', email: 'sarah.k@example.com', requested: 'Oct 22, 2023', status: 'Processing' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Compliance & Legal</h1>
                        <p className="text-lux-darkSec mt-1">Regulatory oversight, data privacy, and audit controls.</p>
                    </div>
                    <GradientButton className="px-4 py-2 text-sm">
                        <span className="flex items-center gap-2">
                            <Activity size={16} /> Generate Audit Report
                        </span>
                    </GradientButton>
                </div>

                {/* Compliance Status Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <GlassCard className="p-4 flex items-center gap-4 border-l-4 border-l-green-500">
                        <div className="p-2 rounded-full bg-green-100 text-green-600">
                            <Lock size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-lux-darkSec uppercase">PCI-DSS</p>
                            <p className="font-bold text-lux-dark text-sm">Compliant</p>
                        </div>
                    </GlassCard>
                    <GlassCard className="p-4 flex items-center gap-4 border-l-4 border-l-green-500">
                        <div className="p-2 rounded-full bg-green-100 text-green-600">
                            <Globe size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-lux-darkSec uppercase">GDPR</p>
                            <p className="font-bold text-lux-dark text-sm">Compliant</p>
                        </div>
                    </GlassCard>
                    <GlassCard className="p-4 flex items-center gap-4 border-l-4 border-l-amber-500">
                        <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-lux-darkSec uppercase">Background Checks</p>
                            <p className="font-bold text-lux-dark text-sm">2 Flags</p>
                        </div>
                    </GlassCard>
                    <GlassCard className="p-4 flex items-center gap-4 border-l-4 border-l-green-500">
                        <div className="p-2 rounded-full bg-green-100 text-green-600">
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-lux-darkSec uppercase">Insurance</p>
                            <p className="font-bold text-lux-dark text-sm">Active</p>
                        </div>
                    </GlassCard>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    
                    {/* Left Column */}
                    <div className="space-y-8">
                        
                        {/* Data Privacy */}
                        <GlassCard className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <Lock size={20} className="text-lux-gold" />
                                Data Privacy & GDPR
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-lux-dark mb-3 uppercase tracking-wide">Data Deletion Requests</h3>
                                    <div className="bg-white/40 rounded-xl border border-white/60 overflow-hidden">
                                        {deletionRequests.map((req, i) => (
                                            <div key={req.id} className={`flex justify-between items-center p-4 ${i !== deletionRequests.length -1 ? 'border-b border-lux-darkSec/5' : ''}`}>
                                                <div>
                                                    <p className="font-bold text-lux-dark text-sm">{req.email}</p>
                                                    <p className="text-xs text-lux-darkSec">Requested: {req.requested}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">{req.status}</span>
                                                    <button className="text-xs font-bold text-lux-primary hover:underline">Review</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-bold text-lux-dark mb-2 uppercase tracking-wide">Retention Policy</h3>
                                    <div className="flex justify-between items-center p-3 bg-lux-primary/5 rounded-lg border border-lux-primary/10">
                                        <span className="text-sm font-medium text-lux-dark">Inactive Account Data</span>
                                        <span className="text-sm font-bold text-lux-dark">Deleted after 2 Years</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-lux-primary/5 rounded-lg border border-lux-primary/10">
                                        <span className="text-sm font-medium text-lux-dark">Transaction Logs</span>
                                        <span className="text-sm font-bold text-lux-dark">Retained for 7 Years</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Regulatory & Licenses */}
                        <GlassCard className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <Scale size={20} className="text-lux-gold" />
                                Regulatory & Insurance
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/50 border border-white/60 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lux-dark text-sm">Commercial Liability Insurance</p>
                                        <p className="text-xs text-lux-darkSec">Policy #LXR-998822-US</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600 text-sm">Active</p>
                                        <p className="text-[10px] text-lux-darkSec">Exp: Dec 2024</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50 border border-white/60 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lux-dark text-sm">Atlanta Operating License</p>
                                        <p className="text-xs text-lux-darkSec">Lic #ATL-TRANS-2023</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600 text-sm">Active</p>
                                        <p className="text-[10px] text-lux-darkSec">Exp: Jan 2024</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50 border border-white/60 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lux-dark text-sm">Driver Background Check Vendor</p>
                                        <p className="text-xs text-lux-darkSec">Checkr Integration</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600 text-sm">Connected</p>
                                        <p className="text-[10px] text-lux-darkSec">API Status: OK</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        
                        {/* Terms & Policies Editor */}
                        <GlassCard className="p-6 md:p-8 h-full flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-lux-dark flex items-center gap-2">
                                    <FileText size={20} className="text-lux-gold" />
                                    Policies
                                </h2>
                                <div className="flex bg-white/50 p-1 rounded-lg border border-white/60">
                                    <button 
                                        onClick={() => setPolicyTab('tos')}
                                        className={`px-3 py-1 text-xs font-bold rounded ${policyTab === 'tos' ? 'bg-lux-gold text-white' : 'text-lux-darkSec'}`}
                                    >
                                        Terms
                                    </button>
                                    <button 
                                        onClick={() => setPolicyTab('privacy')}
                                        className={`px-3 py-1 text-xs font-bold rounded ${policyTab === 'privacy' ? 'bg-lux-gold text-white' : 'text-lux-darkSec'}`}
                                    >
                                        Privacy
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <div className="relative">
                                    <select 
                                        value={policyVersion}
                                        onChange={(e) => setPolicyVersion(e.target.value)}
                                        className="appearance-none bg-lux-primary/5 pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold text-lux-dark border border-lux-primary/10 outline-none cursor-pointer"
                                    >
                                        <option>2.4 (Current)</option>
                                        <option>2.3 (Archive)</option>
                                        <option>2.2 (Archive)</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-lux-dark" />
                                </div>
                                <div className="text-xs text-lux-darkSec">
                                    Last Updated: Oct 24 by Admin
                                </div>
                            </div>

                            <textarea 
                                value={policyContent}
                                onChange={(e) => setPolicyContent(e.target.value)}
                                className="flex-1 w-full p-4 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none text-sm font-mono text-lux-dark mb-4 resize-none min-h-[300px]"
                            ></textarea>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4 text-xs text-lux-darkSec">
                                    <span className="flex items-center gap-1"><Users size={12} /> 98% Acceptance</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg border border-lux-darkSec/20 text-lux-dark hover:bg-white font-bold text-xs flex items-center gap-2 transition-colors">
                                        <Eye size={14} /> Preview
                                    </button>
                                    <GradientButton className="px-4 py-2 text-xs">
                                        <span className="flex items-center gap-2">
                                            <Save size={14} /> Publish Update
                                        </span>
                                    </GradientButton>
                                </div>
                            </div>
                        </GlassCard>

                    </div>
                </div>

                {/* Audit Trail - Full Width */}
                <GlassCard className="p-0 overflow-hidden">
                    <div className="p-6 border-b border-lux-darkSec/5 bg-white/40 flex justify-between items-center">
                        <h3 className="font-bold text-lux-dark text-lg flex items-center gap-2">
                            <History size={20} className="text-lux-gold" />
                            Audit Trail
                        </h3>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full hover:bg-lux-primary/10 text-lux-darkSec hover:text-lux-primary transition-colors">
                                <Download size={18} />
                            </button>
                            <button className="p-2 rounded-full hover:bg-lux-primary/10 text-lux-darkSec hover:text-lux-primary transition-colors">
                                <RotateCcw size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-lux-primary/5 text-xs font-bold text-lux-darkSec uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 pl-6">Timestamp</th>
                                    <th className="p-4">User</th>
                                    <th className="p-4">Action</th>
                                    <th className="p-4">Target</th>
                                    <th className="p-4 text-right pr-6">IP Address</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {auditLogs.map((log) => (
                                    <tr key={log.id} className="border-b border-lux-darkSec/5 hover:bg-white/40 transition-colors">
                                        <td className="p-4 pl-6 font-mono text-lux-darkSec text-xs">{log.timestamp}</td>
                                        <td className="p-4 font-bold text-lux-dark">{log.user}</td>
                                        <td className="p-4 text-lux-dark">{log.action}</td>
                                        <td className="p-4 text-lux-darkSec font-mono text-xs">{log.target}</td>
                                        <td className="p-4 pr-6 text-right text-lux-darkSec text-xs font-mono">{log.ip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>

            </div>
        </AdminLayout>
    );
};

export default AdminCompliancePage;