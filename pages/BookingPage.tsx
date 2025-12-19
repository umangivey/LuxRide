import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BookingStep1 from './booking/BookingStep1';
import BookingStep2 from './booking/BookingStep2';
import BookingStep3 from './booking/BookingStep3';
import BookingStep4 from './booking/BookingStep4';
import BookingStep5 from './booking/BookingStep5';

const BookingPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="step-1" replace />} />
      <Route path="step-1" element={<BookingStep1 />} />
      <Route path="step-2" element={<BookingStep2 />} />
      <Route path="step-3" element={<BookingStep3 />} />
      <Route path="step-4" element={<BookingStep4 />} />
      <Route path="step-5" element={<BookingStep5 />} />
      <Route path="*" element={<Navigate to="step-1" replace />} />
    </Routes>
  );
};

export default BookingPage;