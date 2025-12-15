"use client";

import { useRef, useState } from "react";
import { X, Shield, Star, Award, ChevronRight, Settings, LogOut, Camera, Edit2, Check, LogIn } from "lucide-react";
import styles from "./UserProfile.module.css";
import { cn } from "@/lib/utils";
import SettingsModal from "@/components/settings/SettingsModal";
import { useSession, signOut, signIn } from "next-auth/react";

interface UserProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

const MOCK_USER = {
    username: "Citizen_Alpha",
    rank: "Elite",
    xp: 340,
    nextRankXp: 500,
    karma: 85,
    reports: 12,
    joined: "Oct 2025"
};

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
    const { data: session } = useSession();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [username, setUsername] = useState(MOCK_USER.username);
    const [isEditing, setIsEditing] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const userImage = avatarUrl || session?.user?.image || null;
    const displayName = isEditing ? username : (session?.user?.name || username);
    const displaySubtext = session?.user?.email || `Member since ${MOCK_USER.joined}`;

    const progressPercent = (MOCK_USER.xp / MOCK_USER.nextRankXp) * 100;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const toggleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(!isEditing);
    };

    return (
        <>
            <div className={styles.profileOverlay} onClick={onClose}>
                <div className={styles.profileCard} onClick={e => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button className={styles.closeButton} onClick={onClose}>
                            <X size={20} />
                        </button>

                        <div className={styles.avatarContainer} onClick={triggerFileInput}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {userImage ? (
                                <img src={userImage} alt="Profile" className={styles.avatarImage} />
                            ) : (
                                <span>👻</span>
                            )}

                            <div className={styles.uploadOverlay}>
                                <Camera size={24} color="white" />
                            </div>

                            <div className={styles.rankBadge}>{MOCK_USER.rank}</div>
                        </div>
                    </div>

                    <div className={styles.body}>
                        <div className={styles.nameContainer}>
                            {isEditing ? (
                                <div className={styles.editInputContainer}>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={styles.nameInput}
                                        autoFocus
                                    />
                                    <button className={styles.saveButton} onClick={toggleEdit}>
                                        <Check size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.nameDisplay} onClick={toggleEdit}>
                                    <h2 className={styles.username}>{displayName}</h2>
                                    <Edit2 size={16} className={styles.editIcon} />
                                </div>
                            )}
                        </div>

                        <span className={styles.joinDate}>{displaySubtext}</span>

                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>{MOCK_USER.karma}</span>
                                <span className={styles.statLabel}>Karma</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>{MOCK_USER.reports}</span>
                                <span className={styles.statLabel}>Reports</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>{MOCK_USER.xp}</span>
                                <span className={styles.statLabel}>XP</span>
                            </div>
                        </div>

                        <div className={styles.progressBarContainer}>
                            <div className={styles.progressLabel}>
                                <span>Level Progress</span>
                                <span>{MOCK_USER.xp} / {MOCK_USER.nextRankXp} XP</span>
                            </div>
                            <div className={styles.progressTrack}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>

                        <div className={styles.menuList}>
                            <button
                                className={styles.menuItem}
                                onClick={() => setIsSettingsOpen(true)}
                            >
                                <Settings size={20} />
                                <span className={styles.menuText}>Settings</span>
                                <ChevronRight size={16} color="#666" />
                            </button>

                            {session ? (
                                <button className={styles.menuItem} style={{ color: '#ef4444' }} onClick={() => signOut()}>
                                    <LogOut size={20} />
                                    <span className={styles.menuText}>Sign Out</span>
                                </button>
                            ) : (
                                <button className={styles.menuItem} style={{ color: '#3b82f6' }} onClick={() => signIn()}>
                                    <LogIn size={20} />
                                    <span className={styles.menuText}>Sign In</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
}
