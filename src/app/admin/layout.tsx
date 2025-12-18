import Link from 'next/link';
import { LayoutDashboard, Users, BarChart3, ShieldAlert, LogOut } from 'lucide-react';
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
import styles from './AdminLayout.module.css';

// export const metadata = {
//     title: 'Citizen Admin',
//     description: 'Admin Control Panel for Citizen App',
// }

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // SECURITY CHECK: In a real app, verify session here.
    // const session = await getServerSession(authOptions);
    // if (!session || (session.user as any).role !== 'admin') {
    //     // redirect('/auth/signin'); // Uncomment to enforce
    // }

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <ShieldAlert size={28} />
                    <span>Citizen Admin</span>
                </div>

                <nav className={styles.nav}>
                    <Link href="/admin" className={styles.navItem}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin/users" className={styles.navItem}>
                        <Users size={20} />
                        Users
                    </Link>
                    <Link href="/admin/analytics" className={styles.navItem}>
                        <BarChart3 size={20} />
                        Analytics
                    </Link>
                    <Link href="/admin/moderation" className={styles.navItem}>
                        <ShieldAlert size={20} />
                        Moderation
                    </Link>
                </nav>

                <div className={styles.userSection}>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Admin User</p>
                        <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>admin@citizen.com</p>
                    </div>
                    <Link href="/api/auth/signout" title="Logout">
                        <LogOut size={20} style={{ cursor: 'pointer', color: 'hsl(var(--destructive))' }} />
                    </Link>
                </div>
            </aside>

            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
