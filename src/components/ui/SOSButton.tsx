'use client';

import { AlertCircle } from "lucide-react";
import styles from "./SOSButton.module.css";
import { cn } from "@/lib/utils";

interface SOSButtonProps {
    onClick: () => void;
}

export default function SOSButton({ onClick }: SOSButtonProps) {
    return (
        <button className={styles.sosButton} onClick={onClick} aria-label="SOS Report Incident">
            <div className={styles.pulse}></div>
            <div className={styles.content}>
                <p className={styles.text}>SOS</p>
            </div>
        </button>
    );
}
