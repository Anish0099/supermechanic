import React from 'react';
import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
    return (
        <main className="page">
            <div className="flow-card" style={{ maxWidth: '420px', margin: '0 auto' }}>
                <SignIn routing="path" path="/sign-in" />
            </div>
        </main>
    );
};

export default SignInPage;
