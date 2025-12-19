import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, Upload, Clock } from 'lucide-react';
import { DriverLayout } from '../../components/layout/DriverLayout';
import { GlassCard } from '../../components/ui/GlassCard';

const DriverDocumentsPage: React.FC = () => {
    const documents = [
        { name: 'Driver\'s License', status: 'Valid', expiry: 'Jun 12, 2025', color: 'green' },
        { name: 'Vehicle Insurance', status: 'Valid', expiry: 'Jan 01, 2024', color: 'green' },
        { name: 'Vehicle Registration', status: 'Expiring Soon', expiry: 'Nov 15, 2023', color: 'amber' },
        { name: 'Background Check', status: 'Valid', expiry: 'Aug 20, 2024', color: 'green' },
    ];

    return (
        <DriverLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
                <h1 className="text-3xl font-serif font-bold text-lux-dark">Documents & Compliance</h1>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {documents.map((doc, i) => (
                        <GlassCard key={i} className={`p-6 border-l-4 ${doc.color === 'green' ? 'border-l-green-500' : 'border-l-amber-500'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${doc.color === 'green' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lux-dark">{doc.name}</h3>
                                        <p className={`text-xs font-bold uppercase ${doc.color === 'green' ? 'text-green-600' : 'text-amber-600'}`}>{doc.status}</p>
                                    </div>
                                </div>
                                {doc.color !== 'green' && (
                                    <button className="text-xs font-bold text-lux-gold hover:underline flex items-center gap-1">
                                        <Upload size={12} /> Update
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-lux-darkSec bg-lux-primary/5 p-2 rounded-lg">
                                <Clock size={14} /> Expires: <span className="font-bold">{doc.expiry}</span>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </DriverLayout>
    );
};

export default DriverDocumentsPage;