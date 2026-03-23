"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';

const fetchPayments = async (token?: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        return [];
    }

    const response = await fetch(`${apiUrl}/payments-mongo`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (!response.ok) {
        throw new Error('Failed to load payments');
    }

    return response.json();
};

const AdminPaymentsClient = () => {
    const { getToken } = useAuth();

    const { data: payments = [] } = useQuery({
        queryKey: ['admin-payments'],
        queryFn: async () => {
            const token = await getToken();
            return fetchPayments(token ?? undefined);
        },
    });

    return (
        <main className="page">
            <section className="admin-page">
                <header className="flow-header">
                    <p className="hero-eyebrow">Admin</p>
                    <h1 className="flow-title">Payments ledger</h1>
                    <p className="flow-subtitle">Track payouts, pending captures, and Stripe intent history.</p>
                </header>

                <div className="history-card">
                    {payments.length ? (
                        payments.map((payment: any) => (
                            <div className="history-row" key={payment.id}>
                                <div>
                                    <p className="history-title">Job {payment.jobId}</p>
                                    <p className="flow-subtitle">Intent: {payment.intentId ?? '—'}</p>
                                </div>
                                <div className="history-meta">
                                    <span className="history-status">{payment.status}</span>
                                    <span className="history-price">Rs {payment.amount}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="history-row">
                            <p className="flow-subtitle">No payment records yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default AdminPaymentsClient;
