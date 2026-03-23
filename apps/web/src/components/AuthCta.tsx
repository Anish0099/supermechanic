"use client";

import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

const AuthCta = () => {
    return (
        <div className="auth-cta">
            <div>
                <p className="auth-cta-title">Sign in to save your requests and track jobs.</p>
            </div>
            <div className="auth-cta-actions">
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="ghost-button" type="button">Sign in</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <button className="flow-cta" type="button">Create account</button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
};

export default AuthCta;
