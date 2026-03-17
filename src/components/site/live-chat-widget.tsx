"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'agent' }>>([]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { text: message, sender: 'user' }]);
    setMessage("");
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Mesajınız alındı. En kısa sürede dönüş yapacağız.", sender: 'agent' }]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 rounded-lg border bg-card shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="font-semibold">Canlı Destek</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-3 py-2 max-w-[80%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Mesajınızı yazın..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button size="icon" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
