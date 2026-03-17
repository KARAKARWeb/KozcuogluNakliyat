"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, User, Mail } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

interface CommentFormListProps {
  pageSlug: string;
  comments: Comment[];
  onCommentAdded?: () => void;
}

export function CommentFormList({ pageSlug, comments, onCommentAdded }: CommentFormListProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageSlug, name, email, content }),
      });

      if (res.ok) {
        setName('');
        setEmail('');
        setContent('');
        alert('Yorumunuz gönderildi. Onaylandıktan sonra yayınlanacaktır.');
        onCommentAdded?.();
      }
    } catch (error) {
      alert('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const approvedComments = comments.filter(c => c.approved);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Yorumlar ({approvedComments.length})
        </h3>
        <div className="space-y-4">
          {approvedComments.map((comment) => (
            <div key={comment.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{comment.name}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                </span>
              </div>
              <p className="text-muted-foreground">{comment.content}</p>
            </div>
          ))}
          {approvedComments.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Henüz yorum yapılmamış. İlk yorumu siz yapın!
            </p>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Yorum Yap</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Adınız</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div className="space-y-2">
              <Label>E-posta</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ornek@email.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Yorumunuz</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              placeholder="Yorumunuzu yazın..."
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Gönderiliyor...' : 'Yorum Gönder'}
          </Button>
        </form>
      </div>
    </div>
  );
}
