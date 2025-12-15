"use client";

import { X, Flame, MessageCircle, Trophy, Info } from "lucide-react";
import styles from "./NotificationsPanel.module.css";
import { MOCK_NOTIFICATIONS, Notification } from "./notifications-data";
import { useState } from "react";

interface NotificationsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
    if (!isOpen) return null;

    const grouped = MOCK_NOTIFICATIONS.reduce((acc, curr) => {
        if (!acc[curr.group]) acc[curr.group] = [];
        acc[curr.group].push(curr);
        return acc;
    }, {} as Record<string, Notification[]>);

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
                        <div key={group}>
                            <h3 className={styles.groupTitle}>{group}</h3>
                            {items.map(item => (
                                <div key={item.id} className={styles.item}>
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
