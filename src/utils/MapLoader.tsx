"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { IncidentReport } from "@/lib/incident-service";

import { Friend } from "@/data/mock-friends";

interface MapProps {
    incidents?: IncidentReport[];
    friends?: Friend[];
    onIncidentClick?: (incident: IncidentReport) => void;
    onFriendClick?: (friend: Friend) => void;
    onLocationFound?: (lat: number, lng: number) => void;
}

export default function Map(props: MapProps) {
    const MapComponent = useMemo(
        () =>
            dynamic(() => import("@/components/map/LeafletMap"), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        []
    );

    return <MapComponent {...props} />;
}
