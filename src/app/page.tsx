"use client";

import { useState } from "react";
import { Globe, Bell, User } from "lucide-react";
import Map from "@/utils/MapLoader";
import SOSButton from "@/components/ui/SOSButton";
import IncidentReportModal from "@/components/incident/IncidentReportModal";
import IncidentBottomSheet from "@/components/incident/IncidentBottomSheet";
import WorldFeed from "@/components/feed/WorldFeed";
import UserProfile from "@/components/profile/UserProfile";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";
import styles from "./page.module.css";
import { IncidentReport } from "@/lib/incident-service";
import { MOCK_FRIENDS } from "@/data/mock-friends";

export default function Home() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showWorldFeed, setShowWorldFeed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleIncidentSubmit = (data: { type: string; description: string }) => {
    // Use real user location if available, otherwise fallback to default
    const lat = userLocation?.lat || 51.505;
    const lng = userLocation?.lng || -0.09;

    const newIncident: IncidentReport = {
      id: Math.random().toString(36).substr(2, 9),
      type: data.type,
      description: data.description,
      lat: lat,
      lng: lng,
      timestamp: new Date(),
      status: "verified",
    };

    setIncidents(prev => [...prev, newIncident]);
  };

  return (
    <main className={styles.main}>
      <Map
        incidents={incidents}
        friends={MOCK_FRIENDS}
        onIncidentClick={(incident) => setSelectedIncident(incident)}
        onLocationFound={(lat, lng) => setUserLocation({ lat, lng })}
      />

      <WorldFeed
        isOpen={showWorldFeed}
        onClose={() => setShowWorldFeed(false)}
      />

      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      <IncidentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleIncidentSubmit}
      />

      <IncidentBottomSheet
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />

      <div className={styles.overlay}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {/* Spacer for balance */}
          </div>
          <h1 className={styles.title}>Incident PWA</h1>
          <div className={styles.headerRight}>
            <button
              className={styles.iconButton}
              aria-label="Profile"
              onClick={() => setIsProfileOpen(true)}
            >
              <User color="white" />
            </button>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.navButton}
            onClick={() => setShowWorldFeed(true)}
          >
            <Globe className={styles.navIcon} />
            <span className={styles.navText}>World</span>
          </button>

          <div className={styles.sosContainer}>
            <SOSButton onClick={() => setIsReportModalOpen(true)} />
          </div>

          <button
            className={styles.navButton}
            onClick={() => setShowNotifications(true)}
          >
            <Bell className={styles.navIcon} />
            <span className={styles.navText}>Alerts</span>
          </button>
        </div>
      </div>
    </main>
  );
}
