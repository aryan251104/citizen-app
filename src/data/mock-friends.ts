export interface Friend {
    id: string;
    name: string;
    avatar: string;
    lat: number;
    lng: number;
    status: 'online' | 'offline' | 'moving';
    lastSeen: string;
    address: string;
    phone: string;
}

export const MOCK_FRIENDS: Friend[] = [
    {
        id: "1",
        name: "Mom",
        avatar: "👩",
        lat: 51.508,
        lng: -0.085,
        status: 'online',
        lastSeen: 'Now',
        address: "123 Maple Street, London, UK",
        phone: "+44 7700 900001"
    },
    {
        id: "2",
        name: "Dad",
        avatar: "👨",
        lat: 51.503,
        lng: -0.095,
        status: 'online',
        lastSeen: '5m ago',
        address: "45 Oak Avenue, London, UK",
        phone: "+44 7700 900002"
    },
    {
        id: "3",
        name: "Sarah",
        avatar: "👧",
        lat: 51.506,
        lng: -0.092,
        status: 'moving',
        lastSeen: '1m ago',
        address: "Central Park Service Rd, London",
        phone: "+44 7700 900003"
    }
];
