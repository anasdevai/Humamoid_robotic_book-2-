import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import ReactMarkdown from 'react-markdown';

interface Message {
    id: string;
    type: 'user' | 'bot';
    content: string;
    sources?: string[];
}

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            type: 'bot',
            content: 'Hello! I am your AI assistant for the Humanoid Robotics textbook. Ask me anything about the content!'
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Use deployed backend URL
            const API_URL = process.env.NODE_ENV === 'production'
                ? 'https://backend-pi-teal-70.vercel.app'
                : 'http://localhost:8000';

            const response = await fetch(`${API_URL}/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: userMessage.content }),
            });

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: data.answer || "I'm sorry, I couldn't find an answer to that.",
                sources: data.sources
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error querying backend:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: "I'm having trouble connecting to the brain. Please ensure the backend is running."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <span>🤖</span> AI Assistant
                    </div>
                    <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
                        ✕
                    </button>
                </div>

                <div className={styles.messages} ref={scrollContainerRef}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`${styles.message} ${msg.type === 'user' ? styles.userMessage : styles.botMessage}`}>
                            {msg.type === 'user' ? (
                                msg.content
                            ) : (
                                <>
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className={styles.sources}>
                                            Sources:
                                            {msg.sources.map((source, idx) => {
                                                // Simplify source URL for display if it's a URL
                                                const displayText = source.split('/').pop()?.replace('.html', '') || 'Link';
                                                return (
                                                    <a
                                                        key={idx}
                                                        href={source}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.sourceLink}
                                                    >
                                                        [{idx + 1}]
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className={`${styles.message} ${styles.botMessage} ${styles.typing}`}>
                            <div className={styles.dot}></div>
                            <div className={styles.dot}></div>
                            <div className={styles.dot}></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className={styles.inputArea} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className={styles.input}
                        disabled={isLoading}
                    />
                    <button type="submit" className={styles.sendButton} disabled={!input.trim() || isLoading}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </form>
            </div>

            <button className={styles.chatToggle} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '💬'}
            </button>
        </div>
    );
};

export default ChatBot;
