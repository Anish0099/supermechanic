import React from 'react';
import { requireRole } from '../../../lib/auth';
import AdminPaymentsClient from '../../../components/AdminPaymentsClient';

const AdminPaymentsPage = async () => {
    await requireRole('admin');
    return <AdminPaymentsClient />;
};

export default AdminPaymentsPage;
