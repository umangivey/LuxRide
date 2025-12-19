import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, ShieldCheck, AlertCircle, CheckCircle2, Calendar, User } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Default values if accessing directly
  const planDetails = location.state || {
    plan: 'Executive',
    billingCycle: 'monthly',
    price: 499
  };

  const [paymentMethod, setPaymentMethod] = useState('new');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States'
  });

  // Mask card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    // Add spaces every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData({ ...formData, cardNumber: value });
  };

  // Handle expiry input (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    setFormData({ ...formData, expiry: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    // Basic Validation
    if (paymentMethod === 'new') {
        if (formData.cardNumber.replace(/\s/g, '').length < 16) {
            setError('Please enter a valid card number.');
            setIsProcessing(false);
            return;
        }
    }

    // Simulate API Payment Processing
    setTimeout(() => {
        // Success simulation
        setIsProcessing(false);
        navigate('/onboarding-complete', { 
            state: { 
              plan: planDetails.plan, 
              billingCycle: planDetails.billingCycle, 
              price: planDetails.price 
            } 
        });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-lux-dark mb-2 text-center md:text-left">
          Secure Checkout
        </h1>
        <p className="text-lux-darkSec mb-10 text-center md:text-left">
          Complete your membership to access exclusive benefits.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Payment Method Selection */}
            <GlassCard className="p-6 md:p-8">
              <h2 className="text-xl font-serif font-bold text-lux-dark mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-lux-gold" />
                Payment Method
              </h2>

              <div className="space-y-4">
                 {/* Mock Saved Card */}
                 <label className={`
                    flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
                    ${paymentMethod === 'saved-1' ? 'bg-lux-gold/10 border-lux-gold' : 'bg-white/40 border-white/60 hover:bg-white/60'}
                 `}>
                    <input 
                        type="radio" 
                        name="payment" 
                        value="saved-1" 
                        checked={paymentMethod === 'saved-1'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-lux-gold focus:ring-lux-gold border-gray-300"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lux-dark">Visa ending in 4242</span>
                            <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded">Expired</span> 
                        </div>
                        <p className="text-sm text-lux-darkSec">Expires 12/23</p>
                    </div>
                    <CreditCard className="text-lux-darkSec opacity-50" />
                 </label>

                 {/* Add New Card */}
                 <label className={`
                    flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
                    ${paymentMethod === 'new' ? 'bg-lux-gold/10 border-lux-gold' : 'bg-white/40 border-white/60 hover:bg-white/60'}
                 `}>
                    <input 
                        type="radio" 
                        name="payment" 
                        value="new" 
                        checked={paymentMethod === 'new'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-lux-gold focus:ring-lux-gold border-gray-300"
                    />
                    <span className="font-bold text-lux-dark flex-1">+ Add New Card</span>
                 </label>
              </div>

              {/* New Card Form */}
              {paymentMethod === 'new' && (
                  <form id="payment-form" onSubmit={handleSubmit} className="mt-8 space-y-6 animate-in slide-in-from-top-2">
                      <div className="space-y-2">
                          <label className="text-sm font-bold text-lux-dark ml-1">Cardholder Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                                <User size={18} />
                            </div>
                            <input 
                                type="text" 
                                required 
                                value={formData.cardName}
                                onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                                placeholder="James Sterling"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                            />
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-sm font-bold text-lux-dark ml-1">Card Number</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                                <CreditCard size={18} />
                            </div>
                            <input 
                                type="text" 
                                required 
                                value={formData.cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="0000 0000 0000 0000"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all font-mono"
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-lux-darkSec opacity-50">
                                <Lock size={14} />
                            </div>
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-lux-dark ml-1">Expiration</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                                    <Calendar size={18} />
                                </div>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.expiry}
                                    onChange={handleExpiryChange}
                                    placeholder="MM/YY"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all text-center"
                                />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-lux-dark ml-1 flex items-center justify-between">
                                  CVV
                                  <span className="text-xs font-normal text-lux-darkSec opacity-70">3 digits</span>
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lux-darkSec">
                                    <Lock size={18} />
                                </div>
                                <input 
                                    type="password" 
                                    required 
                                    value={formData.cvv}
                                    onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                                    placeholder="•••"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all text-center"
                                />
                              </div>
                           </div>
                      </div>
                      
                      <hr className="border-lux-darkSec/10 my-6" />

                      <h3 className="text-lg font-serif font-bold text-lux-dark mb-4">Billing Address</h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-lux-dark ml-1">Street Address</label>
                            <input 
                                type="text" 
                                required 
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                placeholder="123 Luxury Lane"
                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-lux-dark ml-1">City</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.city}
                                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                                    placeholder="Atlanta"
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-lux-dark ml-1">ZIP Code</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.zip}
                                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                                    placeholder="30303"
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:border-lux-gold focus:ring-1 focus:ring-lux-gold outline-none transition-all"
                                />
                            </div>
                        </div>
                      </div>
                  </form>
              )}
            </GlassCard>

             <div className="flex items-start gap-4 p-4 rounded-xl bg-lux-primary/5 border border-lux-primary/10">
                <ShieldCheck className="text-lux-gold shrink-0" size={24} />
                <div>
                    <h4 className="font-bold text-lux-dark text-sm">Bank-Level Security</h4>
                    <p className="text-xs text-lux-darkSec mt-1">
                        Your payment information is encrypted and processed securely. We do not store full credit card details on our servers.
                    </p>
                </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
             <GlassCard className="p-6 md:p-8 sticky top-32">
                <h2 className="text-xl font-serif font-bold text-lux-dark mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-lux-dark text-lg">{planDetails.plan} Membership</p>
                            <p className="text-sm text-lux-darkSec capitalize">{planDetails.billingCycle} Plan</p>
                        </div>
                        <p className="font-bold text-lux-dark text-lg">${planDetails.price}</p>
                    </div>
                    
                    <hr className="border-lux-darkSec/10" />
                    
                    <div className="flex justify-between items-center text-sm text-lux-darkSec">
                        <span>Subtotal</span>
                        <span>${planDetails.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-lux-darkSec">
                        <span>Tax (Estimated)</span>
                        <span>$0.00</span>
                    </div>
                    
                    <hr className="border-lux-darkSec/10" />

                    <div className="flex justify-between items-center">
                        <span className="font-bold text-lux-dark text-lg">Total</span>
                        <div className="text-right">
                             <span className="font-bold text-lux-dark text-2xl">${planDetails.price}</span>
                             <p className="text-xs text-lux-darkSec">USD / {planDetails.billingCycle === 'monthly' ? 'mo' : 'yr'}</p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-100 p-3 rounded-lg flex items-start gap-2 text-red-600 text-sm">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <GradientButton 
                    fullWidth 
                    onClick={handleSubmit} 
                    disabled={isProcessing}
                    className="shadow-lux-gold/20"
                >
                    {isProcessing ? (
                        <span className="flex items-center gap-2">
                             Processing...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Pay ${planDetails.price}
                            <Lock size={16} />
                        </span>
                    )}
                </GradientButton>

                <p className="text-xs text-center text-lux-darkSec mt-4">
                    By confirming your subscription, you allow LuxRide to charge your card for this payment and future payments in accordance with our terms.
                </p>
             </GlassCard>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentPage;