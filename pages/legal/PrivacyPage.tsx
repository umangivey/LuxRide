import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-lux-dark mb-4">
          Privacy Policy
        </h1>
        <p className="text-lux-darkSec font-medium">Last Updated: October 24, 2023</p>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <GlassCard className="p-8 md:p-12">
          <div className="prose prose-stone max-w-none text-lux-darkSec">
            <p className="lead text-lg mb-8">
              At LuxRide ("we", "our", or "us"), we are committed to protecting the privacy and security of our members. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device ("personal information").
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Identifiers:</strong> Real name, postal address, unique personal identifier, online identifier, email address, account name, social security number, driver's license number, passport number, or other similar identifiers.</li>
              <li><strong>Payment Information:</strong> Credit card numbers, debit card numbers, or other financial information required to process membership fees and bookings.</li>
              <li><strong>Commercial Information:</strong> Records of services purchased, obtained, or considered, or other purchasing or consuming histories or tendencies.</li>
              <li><strong>Geolocation Data:</strong> Physical location or movements used to facilitate pickup and drop-off coordination.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We may use or disclose the personal information we collect for one or more of the following business purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>To fulfill or meet the reason for which the information is provided (e.g., to book a luxury transfer).</li>
              <li>To provide you with information, products, or services that you request from us.</li>
              <li>To provide you with email alerts, event registrations, and other notices concerning our products or services.</li>
              <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
              <li>To improve our website and present its contents to you.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">3. Data Security & PCI-DSS Compliance</h2>
            <div className="flex items-start gap-4 bg-lux-primary/5 p-6 rounded-xl border border-lux-primary/10 mb-6">
                <Lock className="text-lux-gold shrink-0 mt-1" size={24} />
                <div>
                    <h3 className="font-bold text-lux-dark mb-2">Bank-Level Security</h3>
                    <p className="text-sm">We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All payment transactions are processed through PCI-DSS compliant providers. We do not store full credit card numbers on our servers.</p>
                </div>
            </div>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">4. Sharing Your Information</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
            </p>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">5. Your Rights</h2>
            <p className="mb-4">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request that we correct any errors in your personal data.</li>
              <li>Request that we delete your personal data.</li>
              <li>Object to the processing of your personal data.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">6. Contact Us</h2>
            <p className="mb-6">
              If you have any questions or comments about this notice, the ways in which LuxRide collects and uses your information, your choices and rights regarding such use, or wish to exercise your rights under California law, please do not hesitate to contact us at:
            </p>
            <p className="font-bold text-lux-dark">
                Email: <a href="mailto:privacy@luxride.com" className="text-lux-primary hover:text-lux-gold underline">privacy@luxride.com</a><br/>
                Phone: +1 (404) 555-0123
            </p>
            
            <div className="mt-12 pt-8 border-t border-lux-darkSec/20">
                <p className="text-sm italic">
                    See also: <Link to="/terms" className="text-lux-gold font-bold hover:underline">Terms of Service</Link>
                </p>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default PrivacyPage;