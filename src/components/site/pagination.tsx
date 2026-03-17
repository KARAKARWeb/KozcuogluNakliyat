"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  baseUrl,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  const PageButton = ({ page }: { page: number | string }) => {
    if (page === "...") {
      return (
        <Button variant="ghost" size="icon" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    }

    const pageNum = page as number;
    const isActive = pageNum === currentPage;

    if (baseUrl) {
      return (
        <Link href={`${baseUrl}?page=${pageNum}`}>
          <Button
            variant={isActive ? "default" : "outline"}
            size="icon"
            className={isActive ? "pointer-events-none" : ""}
          >
            {pageNum}
          </Button>
        </Link>
      );
    }

    return (
      <Button
        variant={isActive ? "default" : "outline"}
        size="icon"
        onClick={() => handlePageChange(pageNum)}
        disabled={isActive}
      >
        {pageNum}
      </Button>
    );
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) => (
        <PageButton key={`${page}-${index}`} page={page} />
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function LoadMore({
  hasMore,
  loading,
  onLoadMore,
}: {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center py-8">
      <Button
        variant="outline"
        onClick={onLoadMore}
        disabled={loading}
        className="min-w-[200px]"
      >
        {loading ? "Yükleniyor..." : "Daha Fazla Yükle"}
      </Button>
    </div>
  );
}

export function InfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
}: {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}) {
  return (
    <div className="py-8">
      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      {!loading && hasMore && (
        <div className="text-center text-sm text-muted-foreground">
          Daha fazla içerik için aşağı kaydırın
        </div>
      )}
      {!hasMore && (
        <div className="text-center text-sm text-muted-foreground">
          Tüm içerik yüklendi
        </div>
      )}
    </div>
  );
}
