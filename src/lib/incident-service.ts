export type BotStatus = "idle" | "analyzing" | "verifying_location" | "verified" | "rejected";

export interface IncidentReport {
    id: string;
    type: string;
    description: string;
    lat: number;
    lng: number;
    timestamp: Date;
    status: BotStatus;
}

export async function verifyIncident(description: string): Promise<{ authorized: boolean; reason?: string }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const bannedKeywords = ["fake", "test", "prank", "spam"];
    const isSuspicious = bannedKeywords.some((word) => description.toLowerCase().includes(word));

    if (isSuspicious) {
        return { authorized: false, reason: "Flagged by AI as potential misinformation." };
    }

    // Simulate credibility check success
    return { authorized: true };
}
