import React from 'react';
import { requireRole } from '../../../lib/auth';
import AdminJobsClient from '../../../components/AdminJobsClient';

const AdminJobsPage = async () => {
    await requireRole('admin');
    return <AdminJobsClient />;
};

export default AdminJobsPage;
