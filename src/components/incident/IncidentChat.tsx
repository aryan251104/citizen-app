"use client";

import { useEffect, useRef, useState } from "react";
import { Send, User } from "lucide-react";
import styles from "./IncidentChat.module.css";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    sender: "user" | "other" | "system";
    author?: string;
    timestamp: Date;
}

interface IncidentChatProps {
    incidentId: string;
}

export default function IncidentChat({ incidentId }: IncidentChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Mock Data
    useEffect(() => {
        setMessages([
            {
                id: "1",
                text: "⚠️ Incident verified by community members.",
                sender: "system",
                timestamp: new Date(Date.now() - 1000 * 60 * 15)
            },
            {
                id: "2",
                text: "Is anyone near the north entrance? I see smoke.",
                sender: "other",
                author: "Sarah J.",
                timestamp: new Date(Date.now() - 1000 * 60 * 5)
            },
            {
                id: "3",
                text: "Fire truck just arrived!",
                sender: "other",
                author: "Mike T.",
                timestamp: new Date(Date.now() - 1000 * 60 * 2)
            }
        ]);
    }, [incidentId]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText("");

        // Simulate random reply
        setTimeout(() => {
            const replies = [
                "Stay safe!",
                "Thanks for the update.",
                "I'm heading there now.",
                "Can you see if the road is blocked?"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: randomReply,
                sender: "other",
                author: "Neighbor",
                timestamp: new Date()
            }]);
        }, 2000 + Math.random() * 2000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.messageList}>
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={cn(
                            styles.message,
                            msg.sender === 'user' ? styles.ownMessage :
                                msg.sender === 'system' ? styles.systemMessage : styles.otherMessage
                        )}
                    >
                        {msg.sender === 'other' && <span className={styles.authorName}>{msg.author}</span>}
                        {msg.text}
                        {msg.sender !== 'system' && (
                            <span className={styles.timestamp}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputArea}>
                <input
                    className={styles.input}
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className={styles.sendButton}
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}
