"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, Flag, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  isApproved: boolean;
  likes: number;
  replies?: Comment[];
}

interface CommentsSystemProps {
  itemId: string;
  itemType: "blog" | "service" | "solution";
  comments: Comment[];
  onSubmit: (comment: Omit<Comment, "id" | "createdAt" | "isApproved" | "likes">) => Promise<void>;
}

export function CommentsSystem({ itemId, itemType, comments, onSubmit }: CommentsSystemProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const approvedComments = comments.filter((c) => c.isApproved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !content) return;

    setSubmitting(true);
    try {
      await onSubmit({
        author: name,
        email,
        content,
        replies: [],
      });
      setName("");
      setEmail("");
      setContent("");
      setReplyTo(null);
    } catch (error) {
      console.error("Comment submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Comments Header */}
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        <h3 className="text-xl font-bold">
          Yorumlar ({approvedComments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6">
        <h4 className="font-semibold">Yorum Yap</h4>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium mb-2 block">Adınız *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınız Soyadınız"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">E-posta *</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Yorumunuz *</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Yorumunuzu yazın..."
            rows={4}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Yorumunuz onaylandıktan sonra yayınlanacaktır.
          </p>
          <Button type="submit" disabled={submitting}>
            <Send className="mr-2 h-4 w-4" />
            {submitting ? "Gönderiliyor..." : "Yorum Yap"}
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {approvedComments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
          </div>
        ) : (
          approvedComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{comment.author}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            {comment.isApproved && (
              <Badge variant="secondary">Onaylandı</Badge>
            )}
          </div>

          <p className="text-sm leading-relaxed">{comment.content}</p>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ThumbsUp className="mr-1 h-3 w-3" />
              Beğen ({comment.likes})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReply(!showReply)}
            >
              <MessageSquare className="mr-1 h-3 w-3" />
              Yanıtla
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="mr-1 h-3 w-3" />
              Bildir
            </Button>
          </div>

          {showReply && (
            <div className="mt-4 pl-4 border-l-2">
              <Textarea
                placeholder="Yanıtınızı yazın..."
                rows={3}
                className="mb-2"
              />
              <div className="flex gap-2">
                <Button size="sm">Yanıtla</Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReply(false)}
                >
                  İptal
                </Button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4 pl-4 border-l-2">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CommentModerationPanel({ comments }: { comments: Comment[] }) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const filteredComments = comments.filter((c) => {
    if (filter === "pending") return !c.isApproved;
    if (filter === "approved") return c.isApproved;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Yorum Yönetimi</h3>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Tümü ({comments.length})
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
          >
            Bekleyen ({comments.filter((c) => !c.isApproved).length})
          </Button>
          <Button
            variant={filter === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("approved")}
          >
            Onaylı ({comments.filter((c) => c.isApproved).length})
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg border bg-white p-4 flex items-start justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-medium">{comment.author}</p>
                <Badge variant={comment.isApproved ? "default" : "secondary"}>
                  {comment.isApproved ? "Onaylı" : "Bekliyor"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {comment.content}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleString("tr-TR")}
              </p>
            </div>
            <div className="flex gap-2">
              {!comment.isApproved && (
                <Button size="sm" variant="default">
                  Onayla
                </Button>
              )}
              <Button size="sm" variant="destructive">
                Sil
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
