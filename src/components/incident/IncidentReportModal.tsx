"use client";

import { useState, useEffect, useRef } from "react";
import { X, Camera, Send, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import styles from "./IncidentReportModal.module.css";
import { cn } from "@/lib/utils";
import { verifyIncident, BotStatus } from "@/lib/incident-service";

interface IncidentReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { type: string; description: string }) => void;
}

const IncidentTypes = [
    { id: "fire", icon: "🔥", label: "Fire" },
    { id: "accident", icon: "🚗", label: "Accident" },
    { id: "crime", icon: "⚠️", label: "Crime" },
    { id: "flood", icon: "🌊", label: "Flood" },
    { id: "other", icon: "❓", label: "Other" },
];

export default function IncidentReportModal({ isOpen, onClose, onSubmit }: IncidentReportModalProps) {
    const [step, setStep] = useState<"camera" | "details" | "verifying" | "success">("camera");
    const [selectedType, setSelectedType] = useState("other");
    const [description, setDescription] = useState("");
    const [botStatus, setBotStatus] = useState<BotStatus>("idle");
    const [verificationError, setVerificationError] = useState<string | null>(null);

    // Camera Refs and State
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [cameraError, setCameraError] = useState(false);
    const [captureMode, setCaptureMode] = useState<'photo' | 'video'>('video');
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setStep("camera");
            setBotStatus("idle");
            setVerificationError(null);
            setDescription("");
            setCameraError(false);
            setCaptureMode("video"); // Default to video for incidents
            setIsRecording(false);
        } else {
            stopCamera();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && step === "camera") {
            startCamera();
        } else {
            stopCamera();
        }
        return () => stopCamera();
    }, [isOpen, step]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setCameraError(false);
        } catch (err) {
            console.error("Camera access denied:", err);
            setCameraError(true);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    if (!isOpen) return null;

    const handleCapture = () => {
        if (captureMode === 'photo') {
            // Flash effect could go here
            stopCamera();
            setStep("details");
        } else {
            if (isRecording) {
                // Stop recording
                setIsRecording(false);
                stopCamera();
                setStep("details");
            } else {
                // Start recording
                setIsRecording(true);
                // In a real app, start MediaRecorder here
            }
        }
    };

    const handleSubmit = async () => {
        setStep("verifying");
        setBotStatus("analyzing");

        const result = await verifyIncident(description);

        if (result.authorized) {
            setBotStatus("verified");
            setTimeout(() => {
                setStep("success");
                setTimeout(() => {
                    onSubmit({ type: selectedType, description });
                    onClose();
                }, 1500);
            }, 1000);
        } else {
            setBotStatus("rejected");
            setVerificationError(result.reason || "Verification failed");
            // Allow retry after delay?
            setTimeout(() => {
                setStep("details"); // Go back to edit
                setBotStatus("idle");
            }, 2000);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                    <X size={24} />
                </button>

                {step === "camera" && (
                    <div className={styles.cameraView}>
                        <div className={styles.cameraPreview}>
                            {cameraError ? (
                                <p className={styles.cameraPlaceholder}>[ Camera Access Denied ]</p>
                            ) : (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className={styles.videoElement}
                                />
                            )}
                            <div className={styles.reticle} />
                            {isRecording && <div className={styles.recordingIndicator} />}
                        </div>

                        <div className={styles.cameraControls}>
                            <div className={styles.modeSelector}>
                                <button
                                    className={cn(styles.modeBtn, captureMode === 'photo' && styles.activeMode)}
                                    onClick={() => setCaptureMode('photo')}
                                >
                                    Photo
                                </button>
                                <button
                                    className={cn(styles.modeBtn, captureMode === 'video' && styles.activeMode)}
                                    onClick={() => setCaptureMode('video')}
                                >
                                    Video
                                </button>
                            </div>

                            <button
                                className={cn(styles.recordButton, isRecording && styles.recordingBtn)}
                                onClick={handleCapture}
                            >
                                <div className={cn(styles.recordInner, captureMode === 'photo' ? styles.photoInner : styles.videoInner, isRecording && styles.recordingInner)} />
                            </button>

                            <p className={styles.hint}>
                                {captureMode === 'photo' ? 'Tap to Capture' : (isRecording ? 'Tap to Stop' : 'Tap to Record')}
                            </p>
                        </div>
                    </div>
                )}

                {step === "details" && (
                    <div className={styles.formView}>
                        <h2 className={styles.heading}>Report Incident</h2>

                        <div className={styles.typeGrid}>
                            {IncidentTypes.map((t) => (
                                <button
                                    key={t.id}
                                    className={cn(styles.typeBtn, selectedType === t.id && styles.activeType)}
                                    onClick={() => setSelectedType(t.id)}
                                >
                                    <span className={styles.typeIcon}>{t.icon}</span>
                                    <span className={styles.typeLabel}>{t.label}</span>
                                </button>
                            ))}
                        </div>

                        <textarea
                            className={styles.input}
                            placeholder="Describe what is happening..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />

                        {verificationError && (
                            <div className={styles.errorBanner}>
                                <AlertTriangle size={16} />
                                <span>{verificationError}</span>
                            </div>
                        )}

                        <button
                            className={styles.submitButton}
                            onClick={handleSubmit}
                            disabled={!description.trim()}
                        >
                            <Send size={18} />
                            <span>Submit Report</span>
                        </button>
                    </div>
                )}

                {step === "verifying" && (
                    <div className={styles.statusView}>
                        <Loader2 className={styles.spinner} size={48} />
                        <h3 className={styles.statusTitle}>Verifying Incident</h3>
                        <div className={styles.steps}>
                            <div className={cn(styles.step, styles.stepDone)}>
                                <CheckCircle size={16} /> Location Verified
                            </div>
                            <div className={cn(styles.step, botStatus === 'analyzing' && styles.stepActive)}>
                                {botStatus === 'analyzing' ? <Loader2 size={16} className={styles.miniSpin} /> : <CheckCircle size={16} />}
                                AI Content Analysis
                            </div>
                        </div>
                    </div>
                )}

                {step === "success" && (
                    <div className={styles.statusView}>
                        <div className={styles.successIcon}>
                            <CheckCircle size={64} color="#4ade80" />
                        </div>
                        <h3 className={styles.statusTitle}>Incident Verified</h3>
                        <p>Alert sent to nearby users.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
