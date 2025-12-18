"use client";

import { useState } from 'react';
import { MOCK_ADMIN_DATA, AdminUser } from '@/data/admin-mock';
import styles from './Users.module.css';
import { MoreHorizontal, Ban, CheckCircle, MapPin, Search } from 'lucide-react';

export default function UsersPage() {
    const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_DATA.users);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSuspendToggle = (id: string) => {
        setUsers(prev => prev.map(u =>
            u.id === id
                ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
                : u
        ));
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>User Management</h1>
                <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'hsl(var(--muted-foreground))' }} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className={styles.search}
                        style={{ paddingLeft: '2.5rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Location</th>
                            <th>Plan</th>
                            <th>Rank</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontWeight: 600 }}>{user.name}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>{user.email}</span>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'hsl(var(--muted-foreground))' }}>
                                        <MapPin size={14} />
                                        {user.location}
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.tierBadge} style={{
                                        backgroundColor: user.tier === 'Premium' ? 'rgba(234, 179, 8, 0.1)' : 'transparent',
                                        color: user.tier === 'Premium' ? '#eab308' : 'inherit',
                                        borderColor: user.tier === 'Premium' ? 'rgba(234, 179, 8, 0.3)' : 'hsl(var(--border))'
                                    }}>
                                        {user.tier}
                                    </span>
                                </td>
                                <td>#{user.rank}</td>
                                <td>
                                    <span className={user.status === 'Active' ? styles.statusActive : styles.statusSuspended}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.actions}>
                                        <button
                                            className={styles.actionButton}
                                            title={user.status === 'Active' ? "Suspend User" : "Activate User"}
                                            onClick={() => handleSuspendToggle(user.id)}
                                        >
                                            {user.status === 'Active' ? <Ban size={16} /> : <CheckCircle size={16} />}
                                        </button>
                                        <button className={styles.actionButton} title="More Details">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ textAlign: 'center', color: 'hsl(var(--muted-foreground))', fontSize: '0.85rem' }}>
                Showing {filteredUsers.length} users
            </div>
        </div>
    );
}
