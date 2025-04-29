import React from 'react';
import UsersTable from '../components/UsersTable';
import FeedbackAdmin from '../components/FeedbackAdmin';
import useLoginState from '../hooks/useLoginState';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {
    const { user } = useLoginState();

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" />; // если не админ - редирект
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Администрирование</h1>
            <UsersTable />
            <FeedbackAdmin />
        </div>
    );
};

export default AdminPage;
