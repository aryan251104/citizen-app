"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./Map.module.css";
import { IncidentReport } from "@/lib/incident-service";
import { Friend } from "@/data/mock-friends";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LeafletMapProps {
    incidents?: IncidentReport[];
    friends?: Friend[];
    onIncidentClick?: (incident: IncidentReport) => void;
    onFriendClick?: (friend: Friend) => void;
    onLocationFound?: (lat: number, lng: number) => void;
}

const LocationMarker = ({ onLocationFound: onLocationFoundProp }: { onLocationFound?: (lat: number, lng: number) => void }) => {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const map = useMap();
    const hasCentered = useRef(false);

    useEffect(() => {
        map.locate({ watch: true, enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 });

        const onLocationFound = (e: L.LocationEvent) => {
            setPosition(e.latlng);
            if (!hasCentered.current) {
                map.flyTo(e.latlng, map.getZoom());
                hasCentered.current = true;
            }
            if (onLocationFoundProp) onLocationFoundProp(e.latlng.lat, e.latlng.lng);
        };

        const onLocationError = (e: L.ErrorEvent) => {
            console.error("Location access denied or failed:", e.message);
            // Fallback or user notification could go here
        };

        map.on("locationfound", onLocationFound);
        map.on("locationerror", onLocationError);

        return () => {
            map.stopLocate();
            map.off("locationfound", onLocationFound);
            map.off("locationerror", onLocationError);
        };
    }, [map, onLocationFoundProp]);

    const userIcon = L.divIcon({
        className: styles.userMarker,
        html: `<div class="${styles.pulse}"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10] // Center the 20x20 icon
    });

    return position === null ? null : (
        <>
            <Circle
                center={position}
                radius={200}
                pathOptions={{ fillColor: '#3b82f6', fillOpacity: 0.1, color: 'transparent' }}
            />
            <Marker position={position} icon={userIcon} zIndexOffset={1000} />
        </>
    );
};

export default function LeafletMap({ incidents = [], friends = [], onIncidentClick, onFriendClick, onLocationFound }: LeafletMapProps) {
    const createIncidentIcon = (type: string) => {
        return L.divIcon({
            className: styles.customMarker,
            html: `<span>${type === 'Fire' ? '🔥' : type === 'Accident' ? '🚗' : type === 'Medical' ? '🚑' : '⚠️'}</span>`,
            iconSize: [50, 50],
            iconAnchor: [25, 25],
        });
    };

    const createFriendIcon = (avatar: string) => {
        return L.divIcon({
            className: styles.friendMarkerContainer,
            html: `<div class="${styles.friendMarker}">${avatar}</div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
        });
    };

    return (
        <div className={styles.mapContainer}>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker onLocationFound={onLocationFound} />

                {incidents.map((incident) => (
                    <div key={incident.id}>
                        <Circle
                            center={[incident.lat, incident.lng]}
                            radius={1000} // 1km radius
                            pathOptions={{ fillColor: '#ef4444', fillOpacity: 0.1, color: '#ef4444', weight: 1 }}
                        />
                        <Marker
                            position={[incident.lat, incident.lng]}
                            icon={createIncidentIcon(incident.type)}
                            eventHandlers={{
                                click: () => onIncidentClick?.(incident),
                            }}
                        />
                    </div>
                ))}

                {friends.map((friend) => (
                    <Marker
                        key={friend.id}
                        position={[friend.lat, friend.lng]}
                        icon={createFriendIcon(friend.avatar)}
                        eventHandlers={{
                            click: () => onFriendClick?.(friend)
                        }}
                    />
                ))}
            </MapContainer>
        </div>
    );
}
