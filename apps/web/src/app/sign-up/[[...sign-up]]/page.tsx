import React from 'react';
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
    return (
        <main className="page">
            <div className="flow-card" style={{ maxWidth: '420px', margin: '0 auto' }}>
                <SignUp routing="path" path="/sign-up" forceRedirectUrl="/onboarding" />
            </div>
        </main>
    );
};

export default SignUpPage;
