"use client";

import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup was already shown
    const shown = localStorage.getItem('exitPopupShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem('exitPopupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      setIsOpen(false);
      alert('Teşekkürler! İndirim kodunuz e-posta adresinize gönderildi.');
    } catch (error) {
      console.error('Newsletter error:', error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Gift className="h-6 w-6 text-[#e3000f]" />
            Bekleyin! Özel Fırsat
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Gitmeden önce size özel <strong className="text-[#e3000f]">%10 indirim</strong> fırsatından yararlanın!
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-[#e3000f] hover:bg-[#c5000d]">
              İndirim Kodunu Al
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            E-posta adresiniz güvende. Spam göndermiyoruz.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
