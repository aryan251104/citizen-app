import { MOCK_ADMIN_DATA } from '@/data/admin-mock';
import styles from './Dashboard.module.css';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function AdminDashboard() {
    const { overview } = MOCK_ADMIN_DATA;

    return (
        <div>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className={styles.cardTitle}>Total Users</span>
                        <Users size={16} className="text-muted-foreground" />
                    </div>
                    <span className={styles.cardValue}>{overview.totalUsers.toLocaleString()}</span>
                    <span className={`${styles.cardTrend} ${styles.positive}`}>
                        <TrendingUp size={14} /> +{overview.monthlyGrowth}% from last month
                    </span>
                </div>

                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className={styles.cardTitle}>Active Today</span>
                        <Activity size={16} className="text-muted-foreground" />
                    </div>
                    <span className={styles.cardValue}>{overview.activeToday.toLocaleString()}</span>
                    <span className={styles.cardTrend} style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Last 24 hours
                    </span>
                </div>

                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className={styles.cardTitle}>Total Revenue</span>
                        <DollarSign size={16} className="text-muted-foreground" />
                    </div>
                    <span className={styles.cardValue}>${overview.revenue.toLocaleString()}</span>
                    <span className={`${styles.cardTrend} ${styles.positive}`}>
                        <TrendingUp size={14} /> +8.2% from last month
                    </span>
                </div>

                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className={styles.cardTitle}>New Subscriptions</span>
                        <Users size={16} className="text-muted-foreground" />
                    </div>
                    <span className={styles.cardValue}>+{overview.subscriptions.premium}</span>
                    <span className={`${styles.cardTrend} ${styles.positive}`}>
                        Premium users
                    </span>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Subscription Breakdown</h3>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Plan Type</th>
                                <th>Count</th>
                                <th>Share</th>
                                <th>Est. Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Free Tier</td>
                                <td>{overview.subscriptions.free.toLocaleString()}</td>
                                <td>{((overview.subscriptions.free / overview.totalUsers) * 100).toFixed(1)}%</td>
                                <td>$0</td>
                            </tr>
                            <tr>
                                <td>Plus Tier</td>
                                <td>{overview.subscriptions.plus.toLocaleString()}</td>
                                <td>{((overview.subscriptions.plus / overview.totalUsers) * 100).toFixed(1)}%</td>
                                <td>${(overview.subscriptions.plus * 5).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Premium Tier</td>
                                <td>{overview.subscriptions.premium.toLocaleString()}</td>
                                <td>{((overview.subscriptions.premium / overview.totalUsers) * 100).toFixed(1)}%</td>
                                <td>${(overview.subscriptions.premium * 15).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
