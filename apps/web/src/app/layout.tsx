import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '../components/Header';
import Providers from './providers';
import '../styles/globals.css';

export const metadata = {
    title: 'Vehicle Services',
    description: 'On-demand vehicle service platform',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <Providers>
                        <Header />
                        {children}
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout;