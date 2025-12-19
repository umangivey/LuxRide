import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'Membership' | 'Bookings' | 'Service' | 'Safety';
}

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    // Membership
    {
      id: 1,
      category: 'Membership',
      question: 'How does the billing cycle work?',
      answer: 'Memberships are billed monthly on the date you signed up. If you choose an annual plan, you are billed once per year at a discounted rate. You can view your next billing date in your Member Dashboard.',
    },
    {
      id: 2,
      category: 'Membership',
      question: 'Can I cancel or pause my membership?',
      answer: 'Yes, you can cancel your membership at any time with no penalty. Cancellations take effect at the end of your current billing period. We currently do not offer a pause option, but you can downgrade to the Essential tier if your travel needs decrease.',
    },
    {
      id: 3,
      category: 'Membership',
      question: 'Can I upgrade my tier mid-month?',
      answer: 'Absolutely. If you upgrade to a higher tier, the change is immediate. You will be charged a prorated amount for the remainder of the month, and your transfer allowance will increase instantly.',
    },
    {
      id: 4,
      category: 'Membership',
      question: 'Do unused transfers roll over?',
      answer: 'Our Essential and Executive plans operate on a "use it or lose it" monthly basis to ensure fleet availability for all members. Royal tier members enjoy unlimited transfers.',
    },
    
    // Bookings
    {
      id: 5,
      category: 'Bookings',
      question: 'How far in advance do I need to book?',
      answer: 'We recommend booking at least 2 hours in advance for guaranteed availability. However, for Royal members, we strive to accommodate requests with as little as 30 minutes notice, subject to fleet proximity.',
    },
    {
      id: 6,
      category: 'Bookings',
      question: 'What happens if my flight is delayed?',
      answer: 'We track all commercial and private flights in real-time. If your flight is delayed, your chauffeur\'s arrival time is automatically adjusted. You will never be charged for wait time caused by flight delays.',
    },
    {
      id: 7,
      category: 'Bookings',
      question: 'What is the cancellation policy for a specific ride?',
      answer: 'Rides cancelled more than 2 hours before the scheduled pickup time incur no fee. Cancellations within 2 hours may be subject to a cancellation fee or deduction of a transfer credit, depending on your membership tier.',
    },
    {
      id: 8,
      category: 'Bookings',
      question: 'Can I book a ride for a guest?',
      answer: 'Yes. You can use your membership credits to book transfers for family members, colleagues, or clients. Simply specify the passenger details during the booking process.',
    },

    // Service
    {
      id: 9,
      category: 'Service',
      question: 'What is your service area?',
      answer: 'Our primary service area covers the entire Metro Atlanta region, including all major airports (ATL, PDK, FTY). Long-distance transfers to neighboring cities (e.g., Savannah, Chattanooga) can be arranged for an additional mileage fee.',
    },
    {
      id: 10,
      category: 'Service',
      question: 'Can I request a specific driver?',
      answer: 'Executive and Royal members can save "Favorite Drivers" and request them for future trips. While we cannot guarantee availability of a specific individual 100% of the time, we prioritize matching you with your preferred chauffeurs.',
    },
    {
      id: 11,
      category: 'Service',
      question: 'Do you provide child seats?',
      answer: 'Yes, we can provide rear-facing, forward-facing, or booster seats upon request. Please select this option during booking to ensure the correct seat is installed prior to arrival.',
    },
    {
      id: 12,
      category: 'Service',
      question: 'Are pets allowed?',
      answer: 'Service animals are always welcome. Non-service pets are allowed in carriers. Please notify us in advance so we can prepare the vehicle with appropriate protective covers if necessary.',
    },

    // Safety
    {
      id: 13,
      category: 'Safety',
      question: 'How are your chauffeurs vetted?',
      answer: 'Our vetting process is industry-leading. It includes FBI and state background checks, 7-year driving record history, random drug screening, and in-person interviews. Only the top 5% of applicants make it onto the LuxRide platform.',
    },
    {
      id: 14,
      category: 'Safety',
      question: 'Is my personal information secure?',
      answer: 'We use bank-level encryption for all data and payment processing. Your privacy is paramount; chauffeurs only see the necessary pickup/dropoff details and never have access to your full personal profile.',
    },
    {
      id: 15,
      category: 'Safety',
      question: 'What health protocols are in place?',
      answer: 'Vehicles are sanitized before every trip. Chauffeurs can wear masks upon request, and hand sanitizer is available in the rear armrest of every vehicle.',
    }
  ];

  const categories = Array.from(new Set(faqs.map(f => f.category)));
  
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-lux-dark mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-lux-darkSec max-w-2xl mx-auto mb-10">
          Everything you need to know about LuxRide memberships, bookings, and services.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-lux-gold group-focus-within:text-lux-primary transition-colors" />
            </div>
            <input
                type="text"
                placeholder="Search questions (e.g. 'cancellation', 'airport')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm text-lux-dark placeholder-lux-darkSec/50 focus:outline-none focus:ring-2 focus:ring-lux-gold/50 focus:bg-white/80 transition-all"
            />
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {filteredFAQs.length > 0 ? (
           <div className="space-y-6">
             {categories.map(category => {
                const categoryItems = filteredFAQs.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;

                return (
                    <div key={category} className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-lux-dark mb-4 flex items-center gap-2">
                           <span className="w-8 h-1 bg-lux-gold rounded-full inline-block"></span>
                           {category}
                        </h2>
                        <div className="space-y-4">
                            {categoryItems.map(faq => (
                                <GlassCard 
                                    key={faq.id} 
                                    className={`
                                        cursor-pointer transition-all duration-300
                                        ${openId === faq.id ? 'border-lux-gold/40 bg-white/70' : 'hover:bg-white/50'}
                                    `}
                                >
                                    <div 
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="p-6 flex justify-between items-center gap-4"
                                    >
                                        <h3 className={`font-medium text-lg ${openId === faq.id ? 'text-lux-primary font-bold' : 'text-lux-dark'}`}>
                                            {faq.question}
                                        </h3>
                                        <div className={`
                                            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                                            ${openId === faq.id ? 'bg-lux-gold text-white' : 'bg-lux-primary/10 text-lux-primary'}
                                        `}>
                                            {openId === faq.id ? <Minus size={16} /> : <Plus size={16} />}
                                        </div>
                                    </div>
                                    <div className={`
                                        overflow-hidden transition-all duration-500 ease-in-out
                                        ${openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                    `}>
                                        <div className="px-6 pb-6 text-lux-darkSec leading-relaxed border-t border-lux-gold/10 pt-4">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                );
             })}
           </div>
        ) : (
            <div className="text-center py-20">
                <div className="w-16 h-16 bg-lux-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 text-lux-darkSec">
                    <HelpCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-lux-dark mb-2">No results found</h3>
                <p className="text-lux-darkSec">Try adjusting your search terms or browse the categories.</p>
                <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-lux-gold font-bold hover:underline"
                >
                    Clear Search
                </button>
            </div>
        )}

        <div className="mt-16 text-center">
            <p className="text-lux-darkSec mb-4">Still have questions?</p>
            <a href="/#/contact" className="inline-block px-8 py-3 rounded-full border border-lux-darkSec/20 text-lux-dark font-bold hover:bg-lux-primary hover:text-white hover:border-transparent transition-all">
                Contact Support
            </a>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;