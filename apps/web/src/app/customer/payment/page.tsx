"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '../../../lib/api/client';
import { useAuth, useUser } from '@clerk/nextjs';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/customer',
            },
        });

        if (result.error) {
            setMessage(result.error.message ?? 'Payment failed');
        }

        setIsSubmitting(false);
    };

    return (
        <form className="flow-card" onSubmit={handleSubmit}>
            <PaymentElement />
            <button className="flow-cta" type="submit" disabled={isSubmitting || !stripe}>
                {isSubmitting ? 'Processing...' : 'Pay now'}
            </button>
            {message ? <p className="flow-subtitle">{message}</p> : null}
        </form>
    );
};

const PaymentPage = () => {
    const params = useSearchParams();
    const jobId = params.get('jobId') ?? undefined;
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const { getToken } = useAuth();
    const { user } = useUser();

    const amount = 499;

    useEffect(() => {
        const init = async () => {
            const token = await getToken();
            const response = await createPaymentIntent(
                {
                    amount,
                    currency: 'inr',
                    jobId,
                    customerId: user?.id,
                },
                token ?? undefined
            );
            setClientSecret(response.clientSecret);
        };

        init();
    }, [jobId, user?.id, getToken]);

    const options = useMemo(
        () => ({
            clientSecret: clientSecret ?? '',
            appearance: { theme: 'stripe' as const },
        }),
        [clientSecret]
    );

    return (
        <main className="page">
            <section className="flow-page">
                <header className="flow-header">
                    <p className="hero-eyebrow">Payment</p>
                    <h1 className="flow-title">Complete your payment.</h1>
                    <p className="flow-subtitle">
                        Secure checkout powered by Stripe. Job ID: {jobId ?? '—'}
                    </p>
                </header>

                {clientSecret ? (
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm clientSecret={clientSecret} />
                    </Elements>
                ) : (
                    <div className="flow-card">
                        <p className="flow-subtitle">Preparing payment session...</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default PaymentPage;
