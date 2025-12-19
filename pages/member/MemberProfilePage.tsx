import React, { useState } from 'react';
import { 
    User, 
    Mail, 
    Phone, 
    Calendar, 
    MapPin, 
    Car, 
    Bell, 
    Edit2, 
    Save, 
    X, 
    Trash2, 
    CheckCircle2, 
    AlertTriangle,
    Accessibility,
    Smartphone
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

const MemberProfilePage: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock User Data
    const [formData, setFormData] = useState({
        firstName: 'James',
        lastName: 'Sterling',
        email: 'james.sterling@example.com',
        phone: '+1 (404) 555-0123',
        dob: '1985-04-12',
        homeAddress: '123 Luxury Lane, Atlanta, GA 30303',
        workAddress: '456 Business Blvd, Suite 200, Atlanta, GA 30309',
        preferredVehicle: 'Luxury SUV',
        accessibility: false,
        notifications: {
            email: true,
            sms: true,
            push: false
        }
    });

    const recentActivity = [
        { action: 'Profile Updated', date: 'Oct 24, 2023 10:30 AM', device: 'Web' },
        { action: 'Trip Completed', date: 'Oct 20, 2023 07:15 PM', device: 'Mobile App' },
        { action: 'Password Changed', date: 'Sep 15, 2023 02:45 PM', device: 'Web' },
        { action: 'Membership Renewed', date: 'Sep 01, 2023 09:00 AM', device: 'Auto-Pay' },
    ];

    const handleSave = () => {
        // Simulate API call
        setTimeout(() => {
            setShowSuccess(true);
            setIsEditing(false);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // In a real app, reset formData to original state here
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-lux-dark">My Profile</h1>
                        <p className="text-lux-darkSec mt-1">Manage your personal information and preferences.</p>
                    </div>
                    
                    {!isEditing && (
                        <GradientButton onClick={() => setIsEditing(true)} className="px-6 py-2">
                            <span className="flex items-center gap-2">
                                <Edit2 size={16} />
                                Edit Profile
                            </span>
                        </GradientButton>
                    )}
                </div>

                {/* Success Notification */}
                {showSuccess && (
                    <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                        <CheckCircle2 size={20} />
                        <span className="font-bold">Profile updated successfully.</span>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Personal Information */}
                        <GlassCard className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <User size={20} className="text-lux-gold" />
                                Personal Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">First Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isEditing ? 'bg-white border-lux-gold/50 focus:ring-1 focus:ring-lux-gold' : 'bg-transparent border-transparent px-0 py-0 font-bold text-lg text-lux-dark'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1">Last Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isEditing ? 'bg-white border-lux-gold/50 focus:ring-1 focus:ring-lux-gold' : 'bg-transparent border-transparent px-0 py-0 font-bold text-lg text-lux-dark'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1 flex items-center gap-2">
                                        <Mail size={14} className="text-lux-darkSec"/> Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isEditing ? 'bg-white border-lux-gold/50 focus:ring-1 focus:ring-lux-gold' : 'bg-transparent border-transparent px-0 py-0 text-lux-darkSec'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1 flex items-center gap-2">
                                        <Phone size={14} className="text-lux-darkSec"/> Phone Number
                                    </label>
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isEditing ? 'bg-white border-lux-gold/50 focus:ring-1 focus:ring-lux-gold' : 'bg-transparent border-transparent px-0 py-0 text-lux-darkSec'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-lux-dark ml-1 flex items-center gap-2">
                                        <Calendar size={14} className="text-lux-darkSec"/> Date of Birth
                                    </label>
                                    <input 
                                        type={isEditing ? "date" : "text"} 
                                        value={formData.dob}
                                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isEditing ? 'bg-white border-lux-gold/50 focus:ring-1 focus:ring-lux-gold' : 'bg-transparent border-transparent px-0 py-0 text-lux-darkSec'}`}
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        {/* Addresses */}
                        <GlassCard className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <MapPin size={20} className="text-lux-gold" />
                                Saved Addresses
                            </h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase tracking-wider ml-1">Home</label>
                                    <input 
                                        type="text" 
                                        value={formData.homeAddress}
                                        onChange={(e) => setFormData({...formData, homeAddress: e.target.value})}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isEditing ? 'bg-white border-lux-gold/50 focus:ring-1 focus:ring-lux-gold' : 'bg-white/40 border-white/60 text-lux-dark'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-lux-darkSec uppercase tracking-wider ml-1">Work</label>
                                    <input 
                                        type="text" 
                                        value={formData.workAddress}
                                        onChange={(e) => setFormData({...formData, workAddress: e.target.value})}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isEditing ? 'bg-white border-lux-gold/50 focus:ring-1 focus:ring-lux-gold' : 'bg-white/40 border-white/60 text-lux-dark'}`}
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        {/* Preferences */}
                        <GlassCard className="p-6 md:p-8">
                             <h2 className="text-xl font-bold text-lux-dark mb-6 flex items-center gap-2">
                                <Car size={20} className="text-lux-gold" />
                                Travel Preferences
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-lux-dark">Preferred Vehicle Class</label>
                                    {isEditing ? (
                                        <select 
                                            value={formData.preferredVehicle}
                                            onChange={(e) => setFormData({...formData, preferredVehicle: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-lux-gold/50 focus:ring-1 focus:ring-lux-gold outline-none"
                                        >
                                            <option>Executive Sedan</option>
                                            <option>Luxury SUV</option>
                                            <option>First Class</option>
                                        </select>
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 bg-white/40 rounded-xl border border-white/60">
                                            <Car size={18} className="text-lux-primary" />
                                            <span className="font-medium text-lux-dark">{formData.preferredVehicle}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="space-y-4">
                                     <label className="text-sm font-bold text-lux-dark flex items-center gap-2">
                                         <Accessibility size={16} /> Accessibility Needs
                                     </label>
                                     <div className="flex items-center gap-3">
                                         <button 
                                            disabled={!isEditing}
                                            onClick={() => setFormData({...formData, accessibility: !formData.accessibility})}
                                            className={`relative w-12 h-6 rounded-full transition-colors ${formData.accessibility ? 'bg-lux-gold' : 'bg-gray-300'}`}
                                         >
                                             <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.accessibility ? 'left-7' : 'left-1'}`}></div>
                                         </button>
                                         <span className="text-sm text-lux-darkSec">{formData.accessibility ? 'Required' : 'None'}</span>
                                     </div>
                                </div>

                                <div className="md:col-span-2 space-y-4">
                                    <label className="text-sm font-bold text-lux-dark flex items-center gap-2">
                                        <Bell size={16} /> Communication Preferences
                                    </label>
                                    <div className="flex flex-wrap gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={formData.notifications.email} 
                                                disabled={!isEditing}
                                                onChange={() => setFormData({...formData, notifications: {...formData.notifications, email: !formData.notifications.email}})}
                                                className="w-4 h-4 text-lux-gold border-gray-300 rounded focus:ring-lux-gold"
                                            />
                                            <span className="text-sm text-lux-darkSec">Email Updates</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={formData.notifications.sms} 
                                                disabled={!isEditing}
                                                onChange={() => setFormData({...formData, notifications: {...formData.notifications, sms: !formData.notifications.sms}})}
                                                className="w-4 h-4 text-lux-gold border-gray-300 rounded focus:ring-lux-gold"
                                            />
                                            <span className="text-sm text-lux-darkSec">SMS Alerts</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={formData.notifications.push} 
                                                disabled={!isEditing}
                                                onChange={() => setFormData({...formData, notifications: {...formData.notifications, push: !formData.notifications.push}})}
                                                className="w-4 h-4 text-lux-gold border-gray-300 rounded focus:ring-lux-gold"
                                            />
                                            <span className="text-sm text-lux-darkSec">Push Notifications</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Edit Actions */}
                        {isEditing && (
                            <div className="flex justify-end gap-4 pt-4 animate-in slide-in-from-bottom-2">
                                <button 
                                    onClick={handleCancel}
                                    className="px-6 py-3 rounded-full border border-lux-darkSec/20 bg-white/40 text-lux-dark font-bold hover:bg-white transition-colors flex items-center gap-2"
                                >
                                    <X size={18} />
                                    Cancel
                                </button>
                                <GradientButton onClick={handleSave}>
                                    <span className="flex items-center gap-2">
                                        <Save size={18} />
                                        Save Changes
                                    </span>
                                </GradientButton>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Activity & Danger Zone */}
                    <div className="space-y-6">
                        
                        {/* Profile Summary */}
                        <GlassCard className="p-6 text-center">
                            <div className="relative inline-block mb-4">
                                <img 
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                                    alt="Profile" 
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                                />
                                <button className="absolute bottom-0 right-0 w-8 h-8 bg-lux-gold rounded-full flex items-center justify-center text-white hover:bg-lux-primary transition-colors shadow-md border-2 border-white">
                                    <Edit2 size={14} />
                                </button>
                            </div>
                            <h3 className="text-xl font-bold text-lux-dark">{formData.firstName} {formData.lastName}</h3>
                            <p className="text-sm text-lux-darkSec mb-4">Executive Member</p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                <CheckCircle2 size={12} />
                                Identity Verified
                            </div>
                        </GlassCard>

                        {/* Recent Activity */}
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-lux-dark mb-4 text-sm uppercase tracking-wider">Recent Activity</h3>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-lux-darkSec/5 last:border-0 last:pb-0">
                                        <div className="w-8 h-8 rounded-full bg-lux-primary/5 flex items-center justify-center shrink-0">
                                            {activity.action.includes('Mobile') ? <Smartphone size={14} className="text-lux-primary"/> : <Bell size={14} className="text-lux-primary"/>}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-lux-dark">{activity.action}</p>
                                            <p className="text-xs text-lux-darkSec">{activity.date}</p>
                                            <p className="text-[10px] text-lux-darkSec/60 mt-0.5">{activity.device}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Danger Zone */}
                        <GlassCard className="p-6 border-red-200 bg-red-50/50">
                            <h3 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                                <AlertTriangle size={18} />
                                Danger Zone
                            </h3>
                            <p className="text-xs text-lux-darkSec mb-4">
                                Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                            <button className="w-full py-2 rounded-lg border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                                <Trash2 size={16} />
                                Delete Account
                            </button>
                        </GlassCard>

                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default MemberProfilePage;