export interface FeedItemData {
    id: string;
    type: 'video' | 'image';
    url: string; // Placeholder color or URL
    title: string;
    location: string;
    user: string;
    likes: number;
    comments: number;
    timestamp: string;
    incidentType: 'fire' | 'crime' | 'accident' | 'flood' | 'other';
}

export const MOCK_FEED: FeedItemData[] = [
    {
        id: '1',
        type: 'video',
        url: 'linear-gradient(45deg, #1e3a8a, #3b82f6)', // Mock video placeholder
        title: 'Huge Fire in Downtown',
        location: 'London, UK',
        user: 'Citizen_001',
        likes: 1240,
        comments: 85,
        timestamp: '2h ago',
        incidentType: 'fire'
    },
    {
        id: '2',
        type: 'video',
        url: 'linear-gradient(45deg, #7f1d1d, #ef4444)',
        title: 'Flash Flood Alert',
        location: 'Manchester, UK',
        user: 'SafetyFirst',
        likes: 856,
        comments: 42,
        timestamp: '4h ago',
        incidentType: 'flood'
    },
    {
        id: '3',
        type: 'video',
        url: 'linear-gradient(45deg, #14532d, #22c55e)',
        title: 'Car Accident on M25',
        location: 'London, UK',
        user: 'RoadWatch',
        likes: 2100,
        comments: 156,
        timestamp: '30m ago',
        incidentType: 'accident'
    }
];
