import React, { useState } from 'react';
import { 
    CreditCard, 
    Plus, 
    Trash2, 
    Edit2, 
    ShieldCheck, 
    Check, 
    Lock,
    X,
    Calendar,
    User
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

interface PaymentMethod {
    id: string;
    type: 'Visa' | 'Mastercard' | 'Amex';
    last4: string;
    expiry: string;
    isDefault: boolean;
    name: string;
}

const MemberPaymentMethodsPage: React.FC = () => {
    const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [methods, setMethods] = useState<PaymentMethod[]>([
        { id: '1', type: 'Visa', last4: '4242', expiry: '12/24', isDefault: true, name: 'James Sterling' },
        { id: '2', type: 'Mastercard', last4: '8888', expiry: '09/25', isDefault: false, name: 'James Sterling' },
    ]);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        expiry: '',
        cvv: '',
        zip: ''
    });

    const handleSetDefault = (id: string) => {
        setMethods(methods.map(m => ({
            ...m,
            isDefault: m.id === id
        })));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to remove this payment method?')) {
            setMethods(methods.filter(m => m.id !== id));
        }
    };

    const startAdd = () => {
        setFormData({ name: '', number: '', expiry: '', cvv: '', zip: '' });
        setView('add');
    };

    const startEdit = (method: PaymentMethod) => {
        setFormData({ 
            name: method.name, 
            number: `**** **** **** ${method.last4}`, 
            expiry: method.expiry, 
            cvv: '***', 
            zip: '30303' 
        });
        setEditingId(method.id);
        setView('edit');
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API save
        setTimeout(() => {
            if (view === 'add') {
                const newMethod: PaymentMethod = {
                    id: Math.random().toString(),
                    type: 'Visa', // Mock
                    last4: formData.number.slice(-4) || '1111',
                    expiry: formData.expiry,
                    isDefault: methods.length === 0,
                    name: formData.name
                };
                setMethods([...methods, newMethod]);
            } else if (view === 'edit' && editingId) {
                setMethods(methods.map(m => m.id === editingId ? { ...m, name: formData.name, expiry: formData.expiry } : m));
            }
            setView('list');
            setEditingId(null);
        }, 500);
    };

    const formatCardNumber = (val: string) => {
        return val.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
    };

    const formatExpiry = (val: string) => {
         return val.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2');
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">Payment Methods</h1>
                        <p className="text-lux-darkSec mt-1">Manage your saved cards and billing details.</p>
                    </div>
                    {view === 'list' && (
                        <GradientButton onClick={startAdd} className="px-6 py-2">
                            <span className="flex items-center gap-2">
                                <Plus size={18} />
                                Add New Card
                            </span>
                        </GradientButton>
                    )}
                </div>

                {view === 'list' ? (
                    <div className="space-y-6">
                        {/* Security Banner */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-lux-primary/5 border border-lux-primary/10">
                            <ShieldCheck className="text-lux-gold shrink-0" size={20} />
                            <div>
                                <p className="text-sm font-bold text-lux-dark">Secure Payment Processing</p>
                                <p className="text-xs text-lux-darkSec mt-1">
                                    Your payment information is encrypted using AES-256 standards. We do not store your full card number on our servers.
                                </p>
                            </div>
                        </div>

                        {/* Cards List */}
                        <div className="grid gap-4">
                            {methods.map((method) => (
                                <GlassCard key={method.id} className={`p-6 flex flex-col md:flex-row items-center gap-6 ${method.isDefault ? 'border-lux-gold/40 shadow-lux-gold/10' : ''}`}>
                                    {/* Card Icon & Details */}
                                    <div className="flex items-center gap-4 flex-1 w-full">
                                        <div className="w-14 h-10 rounded bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white/90 shadow-sm relative overflow-hidden">
                                            {/* Abstract Card Chip */}
                                            <div className="absolute top-2 left-2 w-2 h-2 rounded-sm bg-yellow-400/80"></div>
                                            <span className="text-xs font-bold tracking-wider">{method.type}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <p className="font-bold text-lux-dark text-lg">•••• •••• •••• {method.last4}</p>
                                                {method.isDefault && (
                                                    <span className="px-2 py-0.5 rounded-full bg-lux-gold/10 text-lux-gold text-[10px] font-bold uppercase tracking-wide border border-lux-gold/20">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-lux-darkSec">Expires {method.expiry}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                                        {!method.isDefault && (
                                            <button 
                                                onClick={() => handleSetDefault(method.id)}
                                                className="px-3 py-1.5 text-xs font-bold text-lux-darkSec hover:text-lux-gold transition-colors"
                                            >
                                                Set Default
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => startEdit(method)}
                                            className="p-2 rounded-full hover:bg-lux-primary/10 text-lux-darkSec hover:text-lux-primary transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(method.id)}
                                            className="p-2 rounded-full hover:bg-red-50 text-lux-darkSec hover:text-red-600 transition-colors"
                                            title="Remove"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Add / Edit Form */
                    <GlassCard className="p-8 max-w-2xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lux-dark flex items-center gap-2">
                                <CreditCard className="text-lux-gold" size={24} />
                                {view === 'add' ? 'Add Payment Method' : 'Edit Card Details'}
                            </h2>
                            <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full text-lux-darkSec">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-lux-dark ml-1">Cardholder Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-lux-darkSec" size={18} />
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                                        placeholder="James Sterling"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-lux-dark ml-1">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-lux-darkSec" size={18} />
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.number}
                                        onChange={(e) => setFormData({...formData, number: formatCardNumber(e.target.value)})}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all font-mono"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">Expiration</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-lux-darkSec" size={18} />
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.expiry}
                                            onChange={(e) => setFormData({...formData, expiry: formatExpiry(e.target.value)})}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                                            placeholder="MM/YY"
                                            maxLength={5}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">CVV</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-lux-darkSec" size={18} />
                                        <input 
                                            type="password" 
                                            required
                                            value={formData.cvv}
                                            onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                                            placeholder="•••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-lux-dark ml-1">Billing Zip Code</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.zip}
                                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                                    placeholder="30303"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <GradientButton fullWidth className="group">
                                    <span className="flex items-center gap-2">
                                        <Check size={18} />
                                        Save Card
                                    </span>
                                </GradientButton>
                                <button 
                                    type="button"
                                    onClick={() => setView('list')}
                                    className="px-6 py-3 rounded-full border border-lux-darkSec/20 hover:bg-white/50 text-lux-dark font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </GlassCard>
                )}

            </div>
        </DashboardLayout>
    );
};

export default MemberPaymentMethodsPage;