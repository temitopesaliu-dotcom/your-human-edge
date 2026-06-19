import type { Metadata } from 'next';
import PaymentSuccessfulClient from './payment-successful-client';

export const metadata: Metadata = {
  title: 'Payment Confirmed | AI Stadium',
  robots: 'noindex, nofollow',
};

export default function PaymentSuccessfulPage() {
  return <PaymentSuccessfulClient />;
}
