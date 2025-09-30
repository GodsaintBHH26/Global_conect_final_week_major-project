
import React from 'react';

const ManageNotificationsCard = () => {
    return (
        <div className="gc-card" style={{ padding: '1rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gc-color-heading)', marginBottom: '0.5rem' }}>
                Manage your notifications
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--gc-color-primary)', cursor: 'pointer' }}>
                View settings
            </p>
        </div>
    );
};

export default ManageNotificationsCard;