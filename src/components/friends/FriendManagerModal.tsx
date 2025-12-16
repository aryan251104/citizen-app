"use client";

import { useState, useEffect } from "react";
import { X, Search, UserPlus, Check, UserCheck, Users } from "lucide-react";
import styles from "./FriendManagerModal.module.css";
import { MOCK_FRIENDS, Friend } from "@/data/mock-friends";
import { cn } from "@/lib/utils";

interface FriendManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Tab = "network" | "add" | "requests";

interface MockUser {
    id: string;
    name: string;
    avatar: string;
    mutuals: number;
    status: "none" | "pending" | "friend";
}

export default function FriendManagerModal({ isOpen, onClose }: FriendManagerModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>("network");
    const [searchTerm, setSearchTerm] = useState("");

    // State management for the demo
    const [myFriends, setMyFriends] = useState<Friend[]>(MOCK_FRIENDS);
    const [requests, setRequests] = useState<MockUser[]>([
        { id: "r1", name: "Alice Wonderland", avatar: "👒", mutuals: 3, status: "pending" },
        { id: "r2", name: "Bob Builder", avatar: "👷", mutuals: 1, status: "pending" }
    ]);
    const [searchResults, setSearchResults] = useState<MockUser[]>([
        { id: "s1", name: "John Doe", avatar: "🧢", mutuals: 5, status: "none" },
        { id: "s2", name: "Jane Smith", avatar: "👓", mutuals: 2, status: "none" },
        { id: "s3", name: "Mike Ross", avatar: "👔", mutuals: 0, status: "none" }
    ]);

    // Reset when opening
    useEffect(() => {
        if (isOpen) setActiveTab("network");
    }, [isOpen]);

    const handleSendRequest = (id: string) => {
        setSearchResults(prev => prev.map(u =>
            u.id === id ? { ...u, status: "pending" } : u
        ));
    };

    const handleConfirmRequest = (request: MockUser) => {
        // Remove from requests
        setRequests(prev => prev.filter(r => r.id !== request.id));

        // Add to friends (convert MockUser to Friend)
        const newFriend: Friend = {
            id: request.id,
            name: request.name,
            avatar: request.avatar,
            lat: 51.52 + Math.random() * 0.05,
            lng: -0.1 + Math.random() * 0.05,
            status: "online",
            lastSeen: "Just now",
            address: "Unknown Location", // Since we don't have real data
            phone: ""
        };
        setMyFriends(prev => [...prev, newFriend]);
    };

    const handleDeleteRequest = (id: string) => {
        setRequests(prev => prev.filter(r => r.id !== id));
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Friend Manager</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={cn(styles.tab, activeTab === "network" && styles.active)}
                        onClick={() => setActiveTab("network")}
                    >
                        My Network ({myFriends.length})
                    </button>
                    <button
                        className={cn(styles.tab, activeTab === "add" && styles.active)}
                        onClick={() => setActiveTab("add")}
                    >
                        Add New
                    </button>
                    <button
                        className={cn(styles.tab, activeTab === "requests" && styles.active)}
                        onClick={() => setActiveTab("requests")}
                    >
                        Requests ({requests.length})
                    </button>
                </div>

                <div className={styles.content}>
                    {activeTab === "network" && (
                        <>
                            {myFriends.map(friend => (
                                <div key={friend.id} className={styles.userItem}>
                                    <div className={styles.avatar}>{friend.avatar}</div>
                                    <div className={styles.userInfo}>
                                        <span className={styles.userName}>{friend.name}</span>
                                        <span className={styles.userMeta}>{friend.status} • {friend.lastSeen}</span>
                                    </div>
                                    <button className={styles.btnOutline}>View</button>
                                </div>
                            ))}
                        </>
                    )}

                    {activeTab === "add" && (
                        <>
                            <div className={styles.searchContainer}>
                                <Search size={18} className={styles.searchIcon} />
                                <input
                                    className={styles.searchInput}
                                    placeholder="Search by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {searchResults.map(user => (
                                <div key={user.id} className={styles.userItem}>
                                    <div className={styles.avatar}>{user.avatar}</div>
                                    <div className={styles.userInfo}>
                                        <span className={styles.userName}>{user.name}</span>
                                        <span className={styles.userMeta}>{user.mutuals} mutual friends</span>
                                    </div>
                                    {user.status === "none" ? (
                                        <button
                                            className={styles.btnPrimary}
                                            onClick={() => handleSendRequest(user.id)}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <UserPlus size={16} /> Add
                                            </div>
                                        </button>
                                    ) : (
                                        <button className={styles.btnSecondary} disabled>
                                            Requested
                                        </button>
                                    )}
                                </div>
                            ))}
                        </>
                    )}

                    {activeTab === "requests" && (
                        <>
                            {requests.length === 0 && <div className={styles.emptyState}>No pending requests.</div>}
                            {requests.map(req => (
                                <div key={req.id} className={styles.userItem}>
                                    <div className={styles.avatar}>{req.avatar}</div>
                                    <div className={styles.userInfo}>
                                        <span className={styles.userName}>{req.name}</span>
                                        <span className={styles.userMeta}>{req.mutuals} mutual friends</span>
                                    </div>
                                    <div className={styles.requestActions}>
                                        <button
                                            className={styles.btnPrimary}
                                            onClick={() => handleConfirmRequest(req)}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            className={styles.btnOutline}
                                            onClick={() => handleDeleteRequest(req.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
