'use client';

import { useChat } from 'ai/react';
import { useWellnessStore } from '@/lib/store/useWellnessStore';
import { useEffect, useRef } from 'react';
import styles from './Chat.module.css';
import CrisisAlert from './CrisisAlert';

export default function CompanionChat() {
  const { mood, triggers, setCrisisFlag, crisisFlag } = useWellnessStore();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      data: { mood, triggers },
    },
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'assistant' && lastMessage.content.includes('CRISIS_DETECTED: TRUE')) {
      setCrisisFlag(true);
    }
  }, [messages, setCrisisFlag]);

  if (crisisFlag) {
    return <CrisisAlert />;
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>Wellness Companion</h3>
        <p>I'm here for you. Let's talk.</p>
      </div>
      
      <div className={styles.messagesContainer} aria-live="polite">
        {messages.length === 0 && (
          <p className={styles.emptyState}>Say hi! I can help you structure your study plan or just listen if you need to vent.</p>
        )}
        {messages.map((m) => {
          const content = m.content.replace('CRISIS_DETECTED: TRUE', '');
          if (!content.trim()) return null;
          
          return (
            <div key={m.id} className={`${styles.messageWrapper} ${m.role === 'user' ? styles.userMessage : styles.aiMessage}`}>
              <div className={styles.messageBubble}>
                {content}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className={`${styles.messageWrapper} ${styles.aiMessage}`}>
            <div className={`${styles.messageBubble} ${styles.loading}`}>...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className={styles.input}
          disabled={isLoading}
        />
        <button type="submit" className={styles.sendButton} disabled={isLoading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
