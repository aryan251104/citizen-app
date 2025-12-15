"use client";

import { Friend } from "@/data/mock-friends";
import styles from "./FriendBottomSheet.module.css";
import { Phone, MessageCircle, Navigation, EyeOff, UserMinus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FriendBottomSheetProps {
    friend: Friend | null;
    onClose: () => void;
    onRemove: (id: string) => void;
    onStopSharing: (id: string) => void;
}

export default function FriendBottomSheet({ friend, onClose, onRemove, onStopSharing }: FriendBottomSheetProps) {
    if (!friend) return null;

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${friend.lat},${friend.lng}`;

    return (
        <>
            {friend && (
                <div className={styles.overlay} onClick={onClose} style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1999
                }} />
            )}
            <div className={cn(styles.sheetContainer, friend ? styles.open : "")}>
                <div className={styles.dragHandle} onClick={onClose} />

                <div className={styles.header}>
                    <div className={styles.avatarLarge}>{friend.avatar}</div>
                    <h2 className={styles.name}>{friend.name}</h2>
                    <p className={styles.status}>
                        {friend.status === 'online' ? '🟢 Online' : friend.status === 'moving' ? '🚗 Moving' : '⚫ Offline'}
                        {' • '} {friend.lastSeen}
                    </p>
                </div>

                <div className={styles.body}>
                    <div className={styles.actionGrid}>
                        <a href={`tel:${friend.phone}`} className={styles.actionButton}>
                            <Phone size={24} color="#3b82f6" />
                            <span className={styles.btnLabel}>Call</span>
                        </a>
                        <a href={`sms:${friend.phone}`} className={styles.actionButton}>
                            <MessageCircle size={24} color="#10b981" />
                            <span className={styles.btnLabel}>Message</span>
                        </a>
                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className={styles.actionButton}>
                            <Navigation size={24} color="#f59e0b" />
                            <span className={styles.btnLabel}>Directions</span>
                        </a>
                    </div>

                    <div className={styles.infoSection}>
                        <span className={styles.label}>Current Location</span>
                        <div className={styles.value}>
                            {friend.address}
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <span className={styles.label}>Contact Info</span>
                        <div className={styles.value}>
                            {friend.phone}
                        </div>
                    </div>

                    <div className={styles.dangerZone}>
                        <button className={cn(styles.dangerBtn, styles.stopSharing)} onClick={() => onStopSharing(friend.id)}>
                            <EyeOff size={18} />
                            Stop Sharing My Location
                        </button>

                        <button className={cn(styles.dangerBtn, styles.removeFriend)} onClick={() => onRemove(friend.id)}>
                            <UserMinus size={18} />
                            Remove Friend
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
