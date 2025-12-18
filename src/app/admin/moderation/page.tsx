"use client";

import { useState } from 'react';
import { MOCK_ADMIN_DATA, FlaggedItem } from '@/data/admin-mock';
import styles from './Moderation.module.css';
import { ShieldAlert, Video, MessageSquare, Check, Trash2, AlertTriangle } from 'lucide-react';

export default function ModerationPage() {
    const [items, setItems] = useState<FlaggedItem[]>(MOCK_ADMIN_DATA.moderation);

    const handleAction = (id: string, action: 'keep' | 'remove') => {
        setItems(prev => prev.filter(item => item.id !== id));
        // In real app, call API to update status
        console.log(`Item ${id} was ${action}ed`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Content Moderation</h1>
                <p style={{ color: 'hsl(var(--muted-foreground))' }}>Review flagged content and take action.</p>
            </div>

            {items.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>
                    <Check size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>All caught up! No flagged content to review.</p>
                </div>
            ) : (
                items.map(item => (
                    <div key={item.id} className={styles.itemCard}>
                        <div className={styles.itemIcon}>
                            {item.type === 'Video' ? <Video size={24} /> : <MessageSquare size={24} />}
                        </div>

                        <div className={styles.itemContent}>
                            <div className={styles.itemHeader}>
                                <div>
                                    <div className={styles.itemName}>Flagged {item.type}</div>
                                    <div className={styles.itemMeta}>
                                        <span>Rep: {item.reporter}</span>
                                        <span>•</span>
                                        <span>{item.timestamp}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                    <AlertTriangle size={16} className={item.confidence > 80 ? styles.confidenceHigh : styles.confidenceMed} />
                                    <span>AI Confidence: <span className={item.confidence > 80 ? styles.confidenceHigh : styles.confidenceMed}>{item.confidence}%</span></span>
                                </div>
                            </div>

                            <div className={styles.itemBody}>
                                {item.content}
                            </div>

                            <div className={styles.actions}>
                                <button className={`${styles.button} ${styles.keepBtn}`} onClick={() => handleAction(item.id, 'keep')}>
                                    <Check size={16} /> Keep Content
                                </button>
                                <button className={`${styles.button} ${styles.removeBtn}`} onClick={() => handleAction(item.id, 'remove')}>
                                    <Trash2 size={16} /> Remove & Strike
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
