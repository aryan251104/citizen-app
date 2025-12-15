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

const LocationMarker = ({ onLocationFound }: { onLocationFound?: (lat: number, lng: number) => void }) => {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const map = useMap();
    const hasCentered = useRef(false);

    useEffect(() => {
        map.locate().on("locationfound", function (e: L.LocationEvent) {
            setPosition(e.latlng);
            if (!hasCentered.current) {
                map.flyTo(e.latlng, map.getZoom());
                hasCentered.current = true;
            }
            if (onLocationFound) onLocationFound(e.latlng.lat, e.latlng.lng);
        });
    }, [map, onLocationFound]);

    return position === null ? null : (
        <>
            <Circle center={position} radius={200} pathOptions={{ fillColor: '#3b82f6', fillOpacity: 0.1, color: 'transparent' }} />
            <Marker position={position} icon={L.divIcon({ className: styles.userMarker, html: `<div class="${styles.pulse}"></div>` })} />
        </>
    );
};

export default function LeafletMap({ incidents = [], friends = [], onIncidentClick, onFriendClick, onLocationFound }: LeafletMapProps) {
    const createIncidentIcon = (type: string) => {
        return L.divIcon({
            className: styles.customMarker,
            html: `<span>${type === 'Fire' ? '🔥' : type === 'Accident' ? '🚗' : type === 'Medical' ? '🚑' : '⚠️'}</span>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
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
                    <Marker
                        key={incident.id}
                        position={[incident.lat, incident.lng]}
                        icon={createIncidentIcon(incident.type)}
                        eventHandlers={{
                            click: () => onIncidentClick?.(incident),
                        }}
                    />
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
