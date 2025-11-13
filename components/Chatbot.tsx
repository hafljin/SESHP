
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatIcon, XIcon } from './icons/Icons';

interface ChatOption {
  text: string;
  nextId: number | null;
  action?: () => void;
  isLink?: boolean;
}

interface ChatMessage {
  id: number;
  text: React.ReactNode;
  sender: 'bot' | 'user';
  options?: ChatOption[];
}

const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const messageIdCounter = useRef(Date.now());
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const conversationTree: Record<number, Omit<ChatMessage, 'id' | 'sender'>> = {
    1: {
      text: "こんにちは！Donrichy株式会社へようこそ。ご用件をお聞かせください。",
      options: [
        { text: "エンジニアの方", nextId: 2 },
        { text: "企業のご担当者様", nextId: 10 },
      ],
    },
    2: {
      text: "お仕事をお探しですか？",
      options: [
        { text: "はい、急ぎで探しています", nextId: 3 },
        { text: "情報収集をしています", nextId: 4 },
      ],
    },
    3: {
      text: "現在の月単価（万円）を教えていただけますか？",
      options: [
        { text: "〜55万円", nextId: 5 },
        { text: "56万円〜", nextId: 6 },
      ],
    },
    4: {
      text: "承知いたしました。当社の案件情報ページで最新の募集をご確認いただけます。ご興味のある案件がございましたら、お気軽にご応募ください。",
      options: [
        { text: "案件情報を見る", nextId: null, action: () => navigate('/jobs') },
        { text: "最初の質問に戻る", nextId: 1},
      ],
    },
    5: {
      text: "ありがとうございます！ぜひ一度カジュアルにお話ししませんか？以下のリンクからLINE公式アカウントにご登録いただくと、スムーズにご案内できます。",
      options: [
        { text: "LINE公式アカウントに登録", nextId: null, action: () => window.open('https://line.me/ti/p/your-line-id', '_blank'), isLink: true },
        { text: "最初の質問に戻る", nextId: 1},
      ],
    },
    6: {
      text: "ありがとうございます。ご希望に合う案件があるか確認いたします。まずは、案件一覧をご覧ください。",
      options: [
        { text: "案件情報を見る", nextId: null, action: () => navigate('/jobs') },
        { text: "最初の質問に戻る", nextId: 1},
      ],
    },
    10: {
      text: "どのようなご用件でしょうか？",
      options: [
        { text: "人材を探している（急ぎ）", nextId: 11 },
        { text: "人材を探している（情報収集）", nextId: 12 },
        { text: "その他", nextId: 12 },
      ],
    },
    11: {
      text: "承知いたしました。迅速に対応させていただきますので、お手数ですが、以下のお問い合わせフォームより詳細をお知らせください。",
      options: [
        { text: "お問い合わせフォームへ", nextId: null, action: () => { navigate('/contact'); setIsOpen(false); } },
        { text: "最初の質問に戻る", nextId: 1},
      ],
    },
    12: {
      text: "ありがとうございます。当社のサービスや実績については、会社概要ページをご覧ください。具体的なご相談は、お問い合わせフォームからお気軽にご連絡ください。",
      options: [
        { text: "会社概要を見る", nextId: null, action: () => navigate('/about') },
        { text: "お問い合わせフォームへ", nextId: null, action: () => { navigate('/contact'); setIsOpen(false); } },
        { text: "最初の質問に戻る", nextId: 1},
      ],
    },
  };
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: messageIdCounter.current, sender: 'bot', ...conversationTree[1] }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Proactive trigger effect
  useEffect(() => {
    const wasTriggered = sessionStorage.getItem('proactiveChatTriggered');
    if (wasTriggered || isOpen) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const handleUserActivity = () => {
      clearTimeout(timer);
      sessionStorage.setItem('proactiveChatTriggered', 'true');
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
    };
    
    timer = setTimeout(() => {
      if (!isOpen) {
          setIsOpen(true);
          sessionStorage.setItem('proactiveChatTriggered', 'true');
      }
    }, 10000); // 10 seconds

    window.addEventListener('scroll', handleUserActivity, { once: true });
    window.addEventListener('click', handleUserActivity, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
    };
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus Trap and Escape key handling
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!isOpen || !container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            return;
        }

        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    // On cleanup, remove listener and return focus to the open button
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
        openButtonRef.current?.focus();
    };
  }, [isOpen]);

  const handleOptionClick = (option: ChatOption) => {
    messageIdCounter.current += 1;
    const userMessage: ChatMessage = {
      id: messageIdCounter.current,
      sender: 'user',
      text: option.text,
    };
    setMessages(prev => [...prev, userMessage]);

    if (option.action) {
      option.action();
    }

    if (option.nextId) {
      setTimeout(() => {
        messageIdCounter.current += 1;
        const botResponse: ChatMessage = {
          id: messageIdCounter.current,
          sender: 'bot',
          ...conversationTree[option.nextId!],
        };
        setMessages(prev => [...prev, botResponse]);
      }, 500);
    }
  };
  
  const resetChat = () => {
      messageIdCounter.current = Date.now();
      setMessages([{ id: messageIdCounter.current, sender: 'bot', ...conversationTree[1] }]);
  };

  const toggleChat = () => {
    if (!isOpen) {
        resetChat();
    }
    setIsOpen(!isOpen);
  }

  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className={`fixed bottom-4 right-4 z-[100] transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
        <button
          ref={openButtonRef}
          onClick={toggleChat}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-[#0A3D4A] focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="チャットを開く"
        >
          <ChatIcon />
        </button>
      </div>

      <div 
        ref={chatContainerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatbot-heading"
        aria-hidden={!isOpen}
        className={`fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm h-[70vh] max-h-[500px] bg-white rounded-xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      >
        <header className="bg-primary text-white p-4 flex justify-between items-center rounded-t-xl">
          <h3 id="chatbot-heading" className="font-bold text-lg">Donrichy株式会社</h3>
          <button onClick={toggleChat} aria-label="チャットを閉じる">
            <XIcon />
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">D</div>}
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'bot'
                    ? 'bg-neutral-100 text-neutral-900 rounded-bl-none'
                    : 'bg-primary text-white rounded-br-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        {lastMessage?.options && (
            <div className="p-4 border-t border-neutral-200 bg-white rounded-b-xl">
                <div className="flex flex-col gap-2">
                    {lastMessage.options.map((opt, index) => (
                        <button
                            key={`${opt.text}-${index}`}
                            onClick={() => handleOptionClick(opt)}
                            className={`w-full text-left p-2 rounded-xl border-2 transition-colors text-primary border-primary hover:bg-primary/10 ${opt.isLink ? 'font-bold' : ''}`}
                        >
                            {opt.text}
                        </button>
                    ))}
                </div>
            </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
