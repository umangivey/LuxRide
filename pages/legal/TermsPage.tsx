import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-lux-dark mb-4">
          Terms of Service
        </h1>
        <div className="flex items-center justify-center gap-4 text-lux-darkSec font-medium text-sm">
            <span>Version 2.4</span>
            <span className="w-1.5 h-1.5 rounded-full bg-lux-gold"></span>
            <span>Last Updated: October 24, 2023</span>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <GlassCard className="p-8 md:p-12">
          <div className="prose prose-stone max-w-none text-lux-darkSec">
            <p className="lead text-lg mb-8">
              Welcome to LuxRide. By accessing or using our website, mobile application, and luxury transfer services, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.
            </p>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">1. Service Description</h2>
            <p className="mb-4">
              LuxRide provides a premium, membership-based transportation service connecting members with professional chauffeurs. We are not a transportation carrier; we act as an agent to arrange transportation services with licensed and insured third-party providers or employ our own fleet where applicable.
            </p>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">2. Membership Terms</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Eligibility:</strong> You must be at least 21 years of age to hold a membership.</li>
              <li><strong>Billing:</strong> Membership fees are billed automatically on a monthly or annual basis as selected during registration.</li>
              <li><strong>Transfers:</strong> Unused transfers for Essential and Executive tiers expire at the end of the billing cycle and do not roll over.</li>
              <li><strong>Fair Use:</strong> "Unlimited" transfers for Royal members are subject to a fair use policy prohibiting commercial subletting or dispatching for non-member third parties without prior approval.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">3. Cancellation & Refund Policy</h2>
            <h3 className="text-lg font-bold text-lux-dark mt-4 mb-2">Ride Cancellation</h3>
            <p className="mb-4">
                Cancellations made more than 2 hours prior to the scheduled pickup time incur no charge. Cancellations within 2 hours of pickup may result in a fee equal to the minimum base fare or a deduction of one transfer credit.
            </p>
            <h3 className="text-lg font-bold text-lux-dark mt-4 mb-2">Membership Cancellation</h3>
            <p className="mb-6">
                You may cancel your membership at any time. Cancellation becomes effective at the end of the current billing period. No refunds are provided for partial months or unused annual terms.
            </p>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">4. Liability</h2>
            <p className="mb-4">
              LuxRide is not liable for delays caused by force majeure events, including but not limited to weather, heavy traffic, road closures, or mechanical failure, though we will make every reasonable effort to mitigate such delays. Our liability for any claim arising from our services is limited to the cost of the specific transfer.
            </p>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">5. User Conduct & Account Rules</h2>
            <p className="mb-4">
              Members and their guests are expected to treat chauffeurs and vehicles with respect. We reserve the right to terminate services or membership immediately for behavior deemed abusive, illegal, or damaging to property.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Smoking (including e-cigarettes) is strictly prohibited in all vehicles.</li>
                <li>Consumption of alcohol is permitted only where lawful and in vehicles equipped with a partition, subject to chauffeur discretion.</li>
                <li>Any damage to the vehicle caused by the member or their guests will be charged to the member's account.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-lux-dark mt-8 mb-4">6. Dispute Resolution</h2>
            <p className="mb-6">
              Any dispute arising from these Terms or your use of LuxRide services shall be resolved through binding arbitration in Atlanta, Georgia, in accordance with the rules of the American Arbitration Association.
            </p>

            <div className="mt-12 pt-8 border-t border-lux-darkSec/20">
                <p className="text-sm italic">
                    See also: <Link to="/privacy" className="text-lux-gold font-bold hover:underline">Privacy Policy</Link>
                </p>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default TermsPage;