import React from 'react';
import { currentUser } from '@clerk/nextjs/server';

const CustomerProfilePage = async () => {
    const user = await currentUser();
    const userId = user?.id;

    return (
        <main className="page">
            <section className="profile-page">
                <header className="flow-header">
                    <p className="hero-eyebrow">Account</p>
                    <h1 className="flow-title">Your profile</h1>
                    <p className="flow-subtitle">
                        Manage your saved details and view your account status.
                    </p>
                </header>

                <div className="flow-card">
                    <h3>Profile details</h3>
                    <div className="flow-meta">
                        <span>User ID: {userId ?? 'Not available'}</span>
                        <span>Name: {user?.fullName ?? 'Guest'}</span>
                        <span>Email: {user?.primaryEmailAddress?.emailAddress ?? 'Not available'}</span>
                    </div>
                </div>

                <div className="flow-card">
                    <h3>Account status</h3>
                    <div className="flow-meta">
                        <span>Role: Customer</span>
                        <span>Status: Active</span>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CustomerProfilePage;
