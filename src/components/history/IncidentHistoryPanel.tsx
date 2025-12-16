"use client";

import { X, Clock, MapPin, Calendar, ChevronLeft } from "lucide-react";
import styles from "./IncidentHistoryPanel.module.css";
import { useEffect, useState } from "react";

interface IncidentHistoryPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

interface HistoryItem {
    id: string;
    type: string;
    description: string;
    date: Date;
    distance: string;
    fullReport?: string;
}

export default function IncidentHistoryPanel({ isOpen, onClose }: IncidentHistoryPanelProps) {
    const [history, setHistory] = useState<Record<string, HistoryItem[]>>({});

    const [activeIncident, setActiveIncident] = useState<HistoryItem | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Generate Mock History
            const mockData: HistoryItem[] = Array.from({ length: 15 }).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - Math.floor(Math.random() * 7)); // Random day in last week

                const types = ["fire", "accident", "crime", "medical", "flood"];
                const type = types[Math.floor(Math.random() * types.length)];

                return {
                    id: i.toString(),
                    type,
                    description: `Reported ${type} incident near user location. Validated by community.`,
                    date,
                    distance: `${(Math.random() * 5).toFixed(1)} km`,
                    fullReport: `Detailed Report #${i}\n\nType: ${type.toUpperCase()}\nStatus: Verified\nReporter: Anonymous\n\nTimeline:\n- 10:00 AM: Reported by user\n- 10:05 AM: Verified by 3 nearby users\n- 10:15 AM: Emergency services notified\n\nDescription:\nThis incident involves a ${type} located near the central district. Please avoid the area and follow safety protocols.`
                };
            }).sort((a, b) => b.date.getTime() - a.date.getTime());

            // Group by Date Label
            const grouped = mockData.reduce((acc, item) => {
                const today = new Date();
                const diffTime = Math.abs(today.getTime() - item.date.getTime());
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                let label = "";
                if (diffDays === 0) label = "Today";
                else if (diffDays === 1) label = "Yesterday";
                else label = item.date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

                if (!acc[label]) acc[label] = [];
                acc[label].push(item);
                return acc;
            }, {} as Record<string, HistoryItem[]>);

            setHistory(grouped);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    if (activeIncident) {
        return (
            <div className={styles.panelOverlay} onClick={onClose}>
                <div className={styles.panel} onClick={e => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button className={styles.closeButton} onClick={() => setActiveIncident(null)}>
                            <ChevronLeft size={24} />
                        </button>
                        <h2 className={styles.title}>Incident Report</h2>
                        <div style={{ width: 24 }} />
                    </div>
                    <div className={styles.list} style={{ padding: '1.5rem' }}>
                        <div className={styles.iconContainer} style={{ width: 60, height: 60, fontSize: '1.8rem', marginBottom: '1rem' }}>
                            {getIcon(activeIncident.type)}
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.2rem', textTransform: 'capitalize' }}>{activeIncident.type}</h3>
                        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem' }}>
                            {activeIncident.date.toLocaleString()} • {activeIncident.distance} away
                        </p>

                        <div style={{ background: 'hsl(var(--muted))', padding: '1rem', borderRadius: '12px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {activeIncident.fullReport || activeIncident.description}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={24} />
                        <h2 className={styles.title}>Incident History</h2>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.list}>
                    {Object.keys(history).length === 0 ? (
                        <div className={styles.emptyState}>No history found in this area.</div>
                    ) : (
                        Object.entries(history).map(([label, items]) => (
                            <div key={label} className={styles.dateGroup}>
                                <div className={styles.dateHeader}>{label}</div>
                                {items.map(item => (
                                    <div key={item.id} className={styles.historyItem} onClick={() => setActiveIncident(item)}>
                                        <div className={styles.iconContainer}>
                                            {getIcon(item.type)}
                                        </div>
                                        <div className={styles.itemContent}>
                                            <h4 className={styles.itemType}>{item.type}</h4>
                                            <p className={styles.itemDesc}>{item.description}</p>
                                            <div className={styles.itemMeta}>
                                                <MapPin size={12} />
                                                <span>{item.distance} away</span>
                                                <div className={styles.dot} />
                                                <span>{item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function getIcon(type: string) {
    const map: Record<string, string> = {
        fire: "🔥",
        accident: "🚗",
        crime: "⚠️",
        medical: "🚑",
        flood: "🌊"
    };
    return map[type] || "❓";
}
