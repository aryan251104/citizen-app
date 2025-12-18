export const MOCK_ADMIN_DATA = {
    overview: {
        totalUsers: 12543,
        activeToday: 3421,
        monthlyGrowth: 12.5, // percentage
        revenue: 45200, // USD
        subscriptions: {
            free: 11000,
            plus: 1200,
            premium: 343
        }
    },
    users: Array.from({ length: 50 }, (_, i) => ({
        id: `usr_${i + 1}`,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        location: ['New York', 'London', 'Berlin', 'Tokyo', 'Mumbai'][Math.floor(Math.random() * 5)],
        tier: ['Free', 'Plus', 'Premium'][Math.floor(Math.random() * 3)],
        rank: Math.floor(Math.random() * 100),
        status: Math.random() > 0.9 ? 'Suspended' : 'Active',
        joinedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
    })),
    analytics: {
        growth: [
            { name: 'Jan', users: 4000 },
            { name: 'Feb', users: 5000 },
            { name: 'Mar', users: 7000 },
            { name: 'Apr', users: 6500 },
            { name: 'May', users: 9000 },
            { name: 'Jun', users: 12543 },
        ],
        revenue: [
            { name: 'Jan', value: 20000 },
            { name: 'Feb', value: 25000 },
            { name: 'Mar', value: 35000 },
            { name: 'Apr', value: 32000 },
            { name: 'May', value: 40000 },
            { name: 'Jun', value: 45200 },
        ],
        conversion: [
            { name: 'Free', value: 11000 },
            { name: 'Paid', value: 1543 },
        ]
    },
    moderation: Array.from({ length: 20 }, (_, i) => ({
        id: `flag_${i + 1}`,
        type: Math.random() > 0.5 ? 'Video' : 'Comment',
        content: `Flagged content item #${i + 1} - Potential violation of community guidelines.`,
        confidence: Math.floor(Math.random() * 40) + 60, // 60-99%
        reporter: `reporter_${i + 1}`,
        status: 'Pending',
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleString()
    }))
};

// Types for better usage in components
export type AdminData = typeof MOCK_ADMIN_DATA;
export type AdminUser = typeof MOCK_ADMIN_DATA.users[0];
export type FlaggedItem = typeof MOCK_ADMIN_DATA.moderation[0];
