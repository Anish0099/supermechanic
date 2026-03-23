import React from 'react';
import { requireRole } from '../../lib/auth';
import MechanicRealtime from '../../components/MechanicRealtime';

const MechanicPage = async () => {
    await requireRole('mechanic');

    return <MechanicRealtime />;
};

export default MechanicPage;