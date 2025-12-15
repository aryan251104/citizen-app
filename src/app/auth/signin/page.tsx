"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./signin.module.css";
import { X, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={() => router.push('/')}>
                <X size={24} />
            </button>

            <div className={styles.card}>
                <div className={styles.logo}>
                    <Shield size={48} className={styles.icon} />
                </div>
                <h1 className={styles.title}>CivicWatch</h1>
                <p className={styles.subtitle}>Join the community safety network.</p>

                <button
                    className={styles.googleBtn}
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                >
                    <img src="https://www.google.com/favicon.ico" alt="" className={styles.googleIcon} />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
