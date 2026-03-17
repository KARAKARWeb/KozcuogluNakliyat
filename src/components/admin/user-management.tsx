"use client";

import { useState } from "react";
import { User, Shield, Mail, Calendar, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  lastLogin?: string;
  createdAt: string;
}

const roleLabels = {
  admin: "Yönetici",
  editor: "Editör",
  viewer: "Görüntüleyici",
};

const roleColors = {
  admin: "destructive",
  editor: "default",
  viewer: "secondary",
} as const;

export function UserManagement() {
  const [users] = useState<UserData[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@kozcuoglu.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-02-14T20:00:00",
      createdAt: "2024-01-01T00:00:00",
    },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Kullanıcı Yönetimi</h2>
        <Button size="sm">
          <User className="mr-2 h-4 w-4" />
          Kullanıcı Ekle
        </Button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kullanıcı</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Son Giriş</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={roleColors[user.role]}>
                    <Shield className="mr-1 h-3 w-3" />
                    {roleLabels[user.role]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {user.status === "active" ? "Aktif" : "Pasif"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.lastLogin ? (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(user.lastLogin).toLocaleDateString("tr-TR")}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Düzenle</DropdownMenuItem>
                      <DropdownMenuItem>Rol Değiştir</DropdownMenuItem>
                      <DropdownMenuItem>Şifre Sıfırla</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
