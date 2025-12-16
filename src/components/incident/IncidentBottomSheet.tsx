"use client";

import { X, MessageCircle, Share2, Navigation, ChevronLeft } from "lucide-react";
import styles from "./IncidentBottomSheet.module.css";
import { IncidentReport } from "@/lib/incident-service";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import IncidentChat from "./IncidentChat";

interface IncidentBottomSheetProps {
    incident: IncidentReport | null;
    onClose: () => void;
}

export default function IncidentBottomSheet({ incident, onClose }: IncidentBottomSheetProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [view, setView] = useState<'details' | 'chat'>('details');

    useEffect(() => {
        if (incident) {
            setIsVisible(true);
            setView('details'); // Reset to details on new incident
        } else {
            setIsVisible(false);
        }
    }, [incident]);

    if (!incident && !isVisible) return null;

    return (
        <div className={cn(styles.sheetContainer, isVisible && incident ? styles.visible : styles.hidden)}>
            <div className={styles.handleBar} onClick={onClose} />

            {incident && (
                <div className={styles.content}>
                    {/* Header */}
                    <div className={styles.header}>
                        {view === 'chat' ? (
                            <>
                                <button className={styles.backBtn} onClick={() => setView('details')}>
                                    <ChevronLeft size={24} />
                                </button>
                                <div className={styles.titleBlock}>
                                    <h3 className={styles.title}>Live Chat</h3>
                                    <span className={styles.meta}>42 people online</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.typeIcon}>{getIcon(incident.type)}</div>
                                <div className={styles.titleBlock}>
                                    <h3 className={styles.title}>{incident.type.toUpperCase()}</h3>
                                    <span className={styles.meta}>Reported Just Now • 0.2km away</span>
                                </div>
                            </>
                        )}

                        <button className={styles.closeBtn} onClick={onClose}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content Body */}
                    {view === 'details' ? (
                        <div className={styles.body}>
                            <p className={styles.description}>{incident.description}</p>

                            <div className={styles.videoPlaceholder}>
                                <span>Video Evidence</span>
                            </div>

                            <div className={styles.actions}>
                                <button className={styles.actionBtn} onClick={() => setView('chat')}>
                                    <MessageCircle size={18} /> Chat
                                </button>
                                <button className={styles.actionBtn}>
                                    <Share2 size={18} /> Share
                                </button>
                                <button className={cn(styles.actionBtn, styles.primaryAction)}>
                                    <Navigation size={18} /> Navigate
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ height: '400px' }}>
                            <IncidentChat incidentId={incident.id} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function getIcon(type: string) {
    const map: Record<string, string> = {
        fire: "🔥",
        accident: "🚗",
        crime: "⚠️",
        flood: "🌊",
        other: "❓"
    };
    return map[type] || "❓";
}
