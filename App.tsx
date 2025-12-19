import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OrbBackground } from './components/OrbBackground';
import LandingPage from './pages/LandingPage';

// Main Pages
import PricingPage from './pages/PricingPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ChooseMembershipPage from './pages/ChooseMembershipPage';
import PaymentPage from './pages/PaymentPage';
import OnboardingCompletePage from './pages/OnboardingCompletePage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/booking/BookingConfirmationPage';
import LiveTrackingPage from './pages/booking/LiveTrackingPage';
import BookingCompletePage from './pages/booking/BookingCompletePage';

// Auth Pages (Specific Roles)
import DriverLoginPage from './pages/driver/DriverLoginPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';

// Member Dashboards
import MemberDashboard from './pages/member/MemberDashboard';
import MemberBookingsPage from './pages/member/MemberBookingsPage';
import MemberProfilePage from './pages/member/MemberProfilePage';
import MemberPaymentMethodsPage from './pages/member/MemberPaymentMethodsPage';
import MemberBillingPage from './pages/member/MemberBillingPage';
import MemberPreferencesPage from './pages/member/MemberPreferencesPage';
import MemberSupportPage from './pages/member/MemberSupportPage';
import MemberCorporatePage from './pages/member/MemberCorporatePage';
import MemberAccessibilityPage from './pages/member/MemberAccessibilityPage';

// Driver Pages
import DriverSignupPage from './pages/driver/DriverSignupPage';
import DriverDashboard from './pages/driver/DriverDashboard';
import DriverTripsPage from './pages/driver/DriverTripsPage';
import DriverEarningsPage from './pages/driver/DriverEarningsPage';
import DriverHistoryPage from './pages/driver/DriverHistoryPage';
import DriverProfilePage from './pages/driver/DriverProfilePage';
import DriverSupportPage from './pages/driver/DriverSupportPage';
import DriverDocumentsPage from './pages/driver/DriverDocumentsPage';
import DriverOnboardingPage from './pages/driver/DriverOnboardingPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMembersPage from './pages/admin/AdminMembersPage';
import AdminDriversPage from './pages/admin/AdminDriversPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminRevenuePage from './pages/admin/AdminRevenuePage';
import AdminSupportPage from './pages/admin/AdminSupportPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminCompliancePage from './pages/admin/AdminCompliancePage';

// Legal
import PrivacyPage from './pages/legal/PrivacyPage';
import TermsPage from './pages/legal/TermsPage';
import CookiesPage from './pages/legal/CookiesPage';
import DriverAgreementPage from './pages/legal/DriverAgreementPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-lux-accent text-lux-dark font-sans selection:bg-lux-primary/30">
        {/* Persistent Background */}
        <OrbBackground />
        
        {/* Main Layout */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* 
            Header Logic:
            Hide Header for:
            - /booking/:id/tracking (Full screen map)
            - /member/* (Dashboard layout has its own sidebar)
            - /driver/* (Driver layout has its own sidebar) EXCEPT /driver/signup and /driver/login
            - /admin/* (Dashboard layout) EXCEPT /admin/login
          */}
          <Routes>
             <Route path="/booking/:bookingId/tracking" element={<></>} />
             <Route path="/member/*" element={<></>} />
             
             {/* Show main header for driver public/auth pages, hide for dashboard */}
             <Route path="/driver/signup" element={<Header />} />
             <Route path="/driver/login" element={<Header />} />
             <Route path="/driver/*" element={<></>} />
             
             {/* Show main header for admin auth page, hide for dashboard */}
             <Route path="/admin/login" element={<Header />} />
             <Route path="/admin/*" element={<></>} />
             
             <Route path="*" element={<Header />} />
          </Routes>
          
          <main className="flex-grow">
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Auth */}
              <Route path="/login" element={<SignInPage />} />
              <Route path="/signin" element={<Navigate to="/login" replace />} />
              <Route path="/signup" element={<SignUpPage />} />
              
              {/* Verification */}
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/verify-email/:token" element={<EmailVerificationPage />} />
              
              {/* Flow Steps */}
              <Route path="/choose-membership" element={<ChooseMembershipPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/onboarding-complete" element={<OnboardingCompletePage />} />
              
              {/* Booking */}
              <Route path="/book/*" element={<BookingPage />} />
              <Route path="/booking/:bookingId/confirmation" element={<BookingConfirmationPage />} />
              <Route path="/booking/:bookingId/tracking" element={<LiveTrackingPage />} />
              <Route path="/booking/:bookingId/complete" element={<BookingCompletePage />} />
              
              {/* Authenticated Member Routes */}
              <Route path="/member/dashboard" element={<MemberDashboard />} />
              <Route path="/member/bookings" element={<MemberBookingsPage />} />
              <Route path="/member/profile" element={<MemberProfilePage />} />
              <Route path="/member/payment-methods" element={<MemberPaymentMethodsPage />} />
              <Route path="/member/billing" element={<MemberBillingPage />} />
              <Route path="/member/preferences" element={<MemberPreferencesPage />} />
              <Route path="/member/support" element={<MemberSupportPage />} />
              <Route path="/member/corporate" element={<MemberCorporatePage />} />
              <Route path="/member/accessibility" element={<MemberAccessibilityPage />} />
              {/* Fallback for member routes */}
              <Route path="/member/*" element={<Navigate to="/member/dashboard" replace />} />
              
              {/* Driver Routes */}
              <Route path="/driver/signup" element={<DriverSignupPage />} />
              <Route path="/driver/login" element={<DriverLoginPage />} />
              <Route path="/driver/dashboard" element={<DriverDashboard />} />
              <Route path="/driver/trips" element={<DriverTripsPage />} />
              <Route path="/driver/earnings" element={<DriverEarningsPage />} />
              <Route path="/driver/history" element={<DriverHistoryPage />} />
              <Route path="/driver/profile" element={<DriverProfilePage />} />
              <Route path="/driver/support" element={<DriverSupportPage />} />
              <Route path="/driver/documents" element={<DriverDocumentsPage />} />
              <Route path="/driver/onboarding" element={<DriverOnboardingPage />} />
              {/* Fallback for driver routes */}
              <Route path="/driver/*" element={<Navigate to="/driver/dashboard" replace />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/members" element={<AdminMembersPage />} />
              <Route path="/admin/drivers" element={<AdminDriversPage />} />
              <Route path="/admin/bookings" element={<AdminBookingsPage />} />
              <Route path="/admin/revenue" element={<AdminRevenuePage />} />
              <Route path="/admin/support" element={<AdminSupportPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
              <Route path="/admin/compliance" element={<AdminCompliancePage />} />
              <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />

              {/* Legal */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/driver-terms" element={<DriverAgreementPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          {/* Footer Logic */}
          <Routes>
             <Route path="/booking/:bookingId/tracking" element={<></>} />
             <Route path="/member/*" element={<></>} />
             {/* Show footer on driver signup/login, hide on dashboard */}
             <Route path="/driver/signup" element={<Footer />} />
             <Route path="/driver/login" element={<Footer />} />
             <Route path="/driver/*" element={<></>} />
             
             {/* Show footer on admin login, hide on dashboard */}
             <Route path="/admin/login" element={<Footer />} />
             <Route path="/admin/*" element={<></>} />
             
             <Route path="*" element={<Footer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;