"use client";

import { X, Check, ShieldCheck, Heart, Users } from "lucide-react";
import styles from "./SubscriptionModal.module.css";
import { cn } from "@/lib/utils";

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
    if (!isOpen) return null;

    const plans = [
        {
            name: "Free",
            price: "₹0",
            period: "/mo",
            icon: <ShieldCheck size={32} />,
            features: [
                "Incident Reporting",
                "Community Map",
                "Basic Alerts",
                "Public Profile"
            ],
            highlight: false
        },
        {
            name: "Couple",
            price: "₹499",
            period: "/mo",
            icon: <Heart size={32} />,
            features: [
                "Everything in Free",
                "Real-time Logic Tracking",
                "Partner Safety Alerts",
                "Instant SOS Sync"
            ],
            highlight: true
        },
        {
            name: "Family",
            price: "₹999",
            period: "/mo",
            icon: <Users size={32} />,
            features: [
                "Up to 6 Family Members",
                "Neighborhood Watch",
                "Priority Emergency Response",
                "Geofence Alerts"
            ],
            highlight: false
        }
    ];

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={20} />
                </button>

                <div className={styles.header}>
                    <h2 className={styles.title}>Protect Your Loved Ones</h2>
                    <p className={styles.subtitle}>Unlock premium safety features for you and your family.</p>
                </div>

                <div className={styles.grid}>
                    {plans.map((plan) => (
                        <div key={plan.name} className={cn(styles.card, plan.highlight && styles.highlighted)}>
                            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                {plan.icon}
                            </div>
                            <h3 className={styles.planName}>{plan.name}</h3>
                            <div className={styles.price}>
                                {plan.price}
                                <span className={styles.period}>{plan.period}</span>
                            </div>

                            <div className={styles.features}>
                                {plan.features.map((feature, i) => (
                                    <div key={i} className={styles.featureItem}>
                                        <Check size={16} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={styles.ctaButton}>
                                {plan.price === "$0" ? "Current Plan" : "Coming Soon"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
