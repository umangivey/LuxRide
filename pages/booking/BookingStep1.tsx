import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaneLanding, PlaneTakeoff, MapPin, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

type JourneyType = 'arrival' | 'departure' | 'point-to-point';

const BookingStep1: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<JourneyType | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      navigate('/book/step-2', { state: { journeyType: selectedType } });
    }
  };

  const options = [
    {
      id: 'arrival',
      title: 'Arriving at ATL',
      description: 'We monitor your flight and greet you at the terminal for a seamless transfer to your destination.',
      icon: <PlaneLanding size={32} />,
    },
    {
      id: 'departure',
      title: 'Departing from ATL',
      description: 'Reliable pickup from your home, hotel, or office with ample time for check-in and security.',
      icon: <PlaneTakeoff size={32} />,
    },
    {
      id: 'point-to-point',
      title: 'Point-to-Point',
      description: 'Custom transfer between any two locations within our service area. Perfect for events or meetings.',
      icon: <MapPin size={32} />,
    },
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
           <h1 className="text-3xl md:text-4xl font-serif font-bold text-lux-dark">
            Select Journey Type
          </h1>
          <span className="text-sm font-bold text-lux-gold uppercase tracking-widest">Step 1 of 5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-lux-gold h-1.5 rounded-full transition-all duration-500" style={{ width: '20%' }}></div>
        </div>
      </div>

      <p className="text-xl text-lux-darkSec mb-12 max-w-2xl">
        Begin your reservation by choosing the type of service you require.
      </p>

      {/* Options Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {options.map((option) => (
          <div 
            key={option.id}
            onClick={() => setSelectedType(option.id as JourneyType)}
            className="cursor-pointer group"
          >
            <GlassCard 
              className={`
                h-full p-8 text-center transition-all duration-300
                ${selectedType === option.id 
                  ? 'border-lux-gold bg-lux-gold/5 ring-1 ring-lux-gold/50 scale-[1.02]' 
                  : 'hover:border-lux-gold/30 hover:bg-white/60'}
              `}
            >
              <div className={`
                w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 transition-colors duration-300
                ${selectedType === option.id 
                  ? 'bg-lux-gold text-white shadow-lg shadow-lux-gold/30' 
                  : 'bg-lux-primary/5 text-lux-primary group-hover:bg-lux-primary/10'}
              `}>
                {option.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 ${selectedType === option.id ? 'text-lux-dark' : 'text-lux-dark'}`}>
                {option.title}
              </h3>
              <p className="text-lux-darkSec text-sm leading-relaxed">
                {option.description}
              </p>
              
              <div className={`
                mt-6 w-6 h-6 rounded-full border-2 mx-auto flex items-center justify-center transition-all duration-300
                ${selectedType === option.id ? 'border-lux-gold bg-lux-gold' : 'border-lux-darkSec/30'}
              `}>
                {selectedType === option.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
            </GlassCard>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex justify-end">
        <GradientButton 
          onClick={handleContinue} 
          className={`
            px-12 transition-all duration-300
            ${!selectedType ? 'opacity-50 cursor-not-allowed grayscale' : 'opacity-100'}
          `}
        >
          <span className="flex items-center gap-2">
            Next Step
            <ArrowRight size={18} />
          </span>
        </GradientButton>
      </div>
    </div>
  );
};

export default BookingStep1;