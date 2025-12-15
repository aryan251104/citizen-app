"use client";

import { X, Moon, BellRing, Map, Shield } from "lucide-react";
import styles from "./SettingsModal.module.css";
import { useState, useEffect } from "react";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [radius, setRadius] = useState(5);
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            new Notification("CivicWatch", {
                body: "Push/Local Notifications are now enabled!",
                icon: "/icon-192x192.png" // Assuming we have one, or generic
            });
        }
    };

    const sendTestNotification = () => {
        if (Notification.permission === "granted") {
            new Notification("Test Alert", {
                body: "This is a real device notification from CivicWatch.",
                silent: false
            });
        } else {
            requestNotificationPermission();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.settingsOverlay} onClick={onClose}>
            <div className={styles.settingsCard} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Settings</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.body}>
                    {/* Notifications Section */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Notifications</h3>

                        <div className={styles.sliderContainer}>
                            <div className={styles.controlGroup}>
                                <span className={styles.label}>Alert Radius</span>
                                <span className={styles.sliderValue}>{radius} km</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={radius}
                                onChange={(e) => setRadius(Number(e.target.value))}
                                className={styles.slider}
                            />
                        </div>

                        <div className={styles.controlGroup}>
                            <span className={styles.label}>Push Notifications</span>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={notifications}
                                    onChange={(e) => {
                                        setNotifications(e.target.checked);
                                        if (e.target.checked) requestNotificationPermission();
                                    }}
                                />
                                <span className={styles.sliderSwitch}></span>
                            </label>
                        </div>

                        <button
                            onClick={sendTestNotification}
                            style={{
                                marginTop: '0.5rem',
                                padding: '0.5rem',
                                background: 'hsl(var(--primary))',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Test Device Notification
                        </button>
                    </div>

                    {/* Appearance Section */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Appearance</h3>
                        <div className={styles.controlGroup}>
                            <span className={styles.label}>Dark Mode</span>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={(e) => setDarkMode(e.target.checked)}
                                />
                                <span className={styles.sliderSwitch}></span>
                            </label>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Account</h3>
                        <div className={styles.controlGroup}>
                            <span className={styles.label} style={{ color: '#ef4444' }}>Delete Account</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
