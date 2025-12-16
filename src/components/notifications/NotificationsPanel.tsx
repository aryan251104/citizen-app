"use client";

import { X, Flame, MessageCircle, Trophy, Info, ChevronLeft } from "lucide-react";
import styles from "./NotificationsPanel.module.css";
import { MOCK_NOTIFICATIONS, Notification } from "./notifications-data";
import { useState } from "react";

interface NotificationsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
    const [activeNotification, setActiveNotification] = useState<Notification | null>(null);

    if (!isOpen) return null;

    const grouped = MOCK_NOTIFICATIONS.reduce((acc, curr) => {
        if (!acc[curr.group]) acc[curr.group] = [];
        acc[curr.group].push(curr);
        return acc;
    }, {} as Record<string, Notification[]>);

    if (activeNotification) {
        return (
            <div className={styles.panelOverlay} onClick={onClose}>
                <div className={styles.panel} onClick={e => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button className={styles.closeButton} onClick={() => setActiveNotification(null)}>
                            <ChevronLeft size={24} />
                        </button>
                        <h2 className={styles.title}>Alert Details</h2>
                        <div style={{ width: 24 }} />
                    </div>
                    <div className={styles.list} style={{ padding: '1.5rem' }}>
                        <div className={styles.iconContainer} style={{
                            width: 60, height: 60, borderRadius: '50%', marginBottom: '1rem',
                            background: activeNotification.type === 'danger' ? 'rgba(239, 68, 68, 0.2)' :
                                activeNotification.type === 'success' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                            color: activeNotification.type === 'danger' ? '#ef4444' :
                                activeNotification.type === 'success' ? '#eab308' : '#3b82f6',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            {activeNotification.type === 'danger' ? <Flame size={32} /> :
                                activeNotification.type === 'success' ? <Trophy size={32} /> :
                                    activeNotification.type === 'info' ? <MessageCircle size={32} /> : <Info size={32} />}
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{activeNotification.title}</h3>
                        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            {activeNotification.time} • {activeNotification.group}
                        </p>

                        <div style={{ background: 'hsl(var(--muted))', padding: '1rem', borderRadius: '12px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            <p style={{ marginBottom: '1rem' }}>{activeNotification.message}</p>
                            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))' }}>
                                Full details regarding this alert would appear here. This includes safety instructions, location data, or relevant update history.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.panelOverlay} onClick={onClose}>
            <div className={styles.panel} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Notifications</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.list}>
                    {Object.entries(grouped).map(([group, items]) => (
                        <div key={group} className={styles.groupContainer}>
                            <h3 className={styles.groupTitle}>{group}</h3>
                            {items.map(item => (
                                <div key={item.id} className={styles.item} onClick={() => setActiveNotification(item)}>
                                    {item.read === false && <div className={styles.unreadDot} />}

                                    <div className={styles.iconContainer} style={{
                                        background: item.type === 'danger' ? 'rgba(239, 68, 68, 0.2)' :
                                            item.type === 'success' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                        color: item.type === 'danger' ? '#ef4444' :
                                            item.type === 'success' ? '#eab308' : '#3b82f6'
                                    }}>
                                        {item.type === 'danger' ? <Flame size={20} /> :
                                            item.type === 'success' ? <Trophy size={20} /> :
                                                item.type === 'info' ? <MessageCircle size={20} /> : <Info size={20} />}
                                    </div>

                                    <div className={styles.content}>
                                        <h4 className={styles.itemTitle}>{item.title}</h4>
                                        <p className={styles.itemMessage}>{item.message}</p>
                                        <span className={styles.itemTime}>{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
