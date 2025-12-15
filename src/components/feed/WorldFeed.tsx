"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Share2, MapPin, X } from "lucide-react";
import styles from "./WorldFeed.module.css";
import { MOCK_FEED, FeedItemData } from "./feed-data";

interface WorldFeedProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WorldFeed({ isOpen, onClose }: WorldFeedProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.feedContainer}>
            <button
                className={styles.closeButton}
                onClick={onClose}
            >
                <X size={24} />
            </button>

            {MOCK_FEED.map((item) => (
                <FeedItem key={item.id} data={item} />
            ))}
        </div>
    );
}

function FeedItem({ data }: { data: FeedItemData }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className={styles.feedItem}>
            {/* Background (Mock Video) */}
            <div
                className={styles.videoPlaceholder}
                style={{ background: data.url }}
            />

            {/* Overlay */}
            <div className={styles.overlay} />

            {/* Content */}
            <div className={styles.contentLayer}>
                <div
                    className={styles.incidentBadge}
                    style={{
                        backgroundColor:
                            data.incidentType === 'fire' ? '#ef4444' :
                                data.incidentType === 'flood' ? '#3b82f6' :
                                    data.incidentType === 'crime' ? '#f59e0b' : '#6b7280'
                    }}
                >
                    {data.incidentType}
                </div>

                <div className={styles.userInfo}>
                    <div className={styles.avatar} />
                    <span className={styles.username}>{data.user}</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>• {data.timestamp}</span>
                </div>

                <h3 className={styles.title}>{data.title}</h3>

                <div className={styles.location}>
                    <MapPin size={14} />
                    <span>{data.location}</span>
                </div>
            </div>

            {/* Right Actions */}
            <div className={styles.actionsBar}>
                <button className={styles.actionBtn} onClick={() => setLiked(!liked)}>
                    <div className={styles.actionIconContainer}>
                        <Heart size={24} fill={liked ? "#ef4444" : "none"} color={liked ? "#ef4444" : "white"} />
                    </div>
                    <span className={styles.actionLabel}>{liked ? data.likes + 1 : data.likes}</span>
                </button>

                <button className={styles.actionBtn}>
                    <div className={styles.actionIconContainer}>
                        <MessageCircle size={24} color="white" />
                    </div>
                    <span className={styles.actionLabel}>{data.comments}</span>
                </button>

                <button className={styles.actionBtn}>
                    <div className={styles.actionIconContainer}>
                        <Share2 size={24} color="white" />
                    </div>
                    <span className={styles.actionLabel}>Share</span>
                </button>
            </div>
        </div>
    );
}
