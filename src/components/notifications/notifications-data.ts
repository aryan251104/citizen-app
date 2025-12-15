export interface Notification {
    id: string;
    type: 'danger' | 'info' | 'success' | 'system';
    title: string;
    message: string;
    time: string;
    read: boolean;
    group: 'Today' | 'Yesterday';
}

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        type: 'danger',
        title: 'Fire Reported Nearby',
        message: 'A large fire has been reported 500m from your location.',
        time: '2 mins ago',
        read: false,
        group: 'Today'
    },
    {
        id: '2',
        type: 'info',
        title: 'New Comment on your Report',
        message: 'User @SafetyFirst commented: "Is the road still blocked?"',
        time: '1 hour ago',
        read: false,
        group: 'Today'
    },
    {
        id: '3',
        type: 'success',
        title: 'Karma Level Up!',
        message: 'You reached "Elite" rank. Keep up the good work!',
        time: '3 hours ago',
        read: true,
        group: 'Today'
    },
    {
        id: '4',
        type: 'system',
        title: 'Weekly Report',
        message: 'Your area has been 95% safe this week.',
        time: '1 day ago',
        read: true,
        group: 'Yesterday'
    }
];
