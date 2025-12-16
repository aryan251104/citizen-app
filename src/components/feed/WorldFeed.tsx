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
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const handleUserClick = (username: string) => {
        setSelectedUser(username);
    };

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
                <FeedItem
                    key={item.id}
                    data={item}
                    onUserClick={() => handleUserClick(item.user)}
                />
            ))}

            {selectedUser && (
                <div className={styles.userDetailsOverlay} onClick={() => setSelectedUser(null)}>
                    <div className={styles.userCard} onClick={e => e.stopPropagation()}>
                        <div className={styles.userHeader}>
                            <div className={styles.userAvatarLarge} />
                            <h3>{selectedUser}</h3>
                            <button className={styles.followButton}>Follow</button>
                        </div>
                        <div className={styles.userStats}>
                            <div>
                                <strong>124</strong>
                                <span>Reports</span>
                            </div>
                            <div>
                                <strong>4.8k</strong>
                                <span>Followers</span>
                            </div>
                            <div>
                                <strong>98%</strong>
                                <span>Trust</span>
                            </div>
                        </div>
                        <button className={styles.closeUserBtn} onClick={() => setSelectedUser(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

function FeedItem({ data, onUserClick }: { data: FeedItemData; onUserClick: () => void }) {
    const [liked, setLiked] = useState(false);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: data.title,
                text: `Check out this incident report by ${data.user}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert("Share Link Copied to Clipboard!");
        }
    };

    const handleComment = () => {
        alert("Comments section coming soon! \n(This would open a comment bottom sheet)");
    };

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

                <div className={styles.userInfo} onClick={onUserClick} style={{ cursor: 'pointer' }}>
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

                <button className={styles.actionBtn} onClick={handleComment}>
                    <div className={styles.actionIconContainer}>
                        <MessageCircle size={24} color="white" />
                    </div>
                    <span className={styles.actionLabel}>{data.comments}</span>
                </button>

                <button className={styles.actionBtn} onClick={handleShare}>
                    <div className={styles.actionIconContainer}>
                        <Share2 size={24} color="white" />
                    </div>
                    <span className={styles.actionLabel}>Share</span>
                </button>
            </div>
        </div>
    );
}
