"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, CheckCircle } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdpr) {
      alert('Lütfen KVKK metnini onaylayın');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail('');
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      alert('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Bülten Aboneliği</h3>
      </div>
      {success ? (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <p>Başarıyla abone oldunuz!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="E-posta adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex items-start gap-2">
            <Checkbox
              id="gdpr"
              checked={gdpr}
              onCheckedChange={(checked) => setGdpr(checked as boolean)}
            />
            <label htmlFor="gdpr" className="text-sm text-muted-foreground cursor-pointer">
              KVKK metnini okudum ve kabul ediyorum
            </label>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Gönderiliyor...' : 'Abone Ol'}
          </Button>
        </form>
      )}
    </div>
  );
}
