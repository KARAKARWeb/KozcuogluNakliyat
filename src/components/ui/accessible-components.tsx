"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Accessible Modal
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function AccessibleModal({ isOpen, onClose, title, children }: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };

      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      // Focus first focusable element
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }, 100);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-xl font-bold">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Modalı kapat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// Skip to Content Link
export function SkipToContent({ targetId = "main-content" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
    >
      Ana içeriğe geç
    </a>
  );
}

// Screen Reader Only Text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

// Accessible Button with Loading State
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export function AccessibleButton({
  loading,
  loadingText = "Yükleniyor...",
  children,
  disabled,
  ...props
}: AccessibleButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-live="polite"
    >
      {loading ? (
        <>
          <span className="sr-only">{loadingText}</span>
          <span aria-hidden="true">{children}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}

// Accessible Form Field
interface AccessibleFormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  children: React.ReactNode;
}

export function AccessibleFormField({
  id,
  label,
  error,
  required,
  helpText,
  children,
}: AccessibleFormFieldProps) {
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="zorunlu">
            *
          </span>
        )}
      </label>
      
      {helpText && (
        <p id={helpId} className="text-sm text-muted-foreground">
          {helpText}
        </p>
      )}

      <div>
        {children}
      </div>

      {error && (
        <p id={errorId} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Live Region for Announcements
export function LiveRegion({
  message,
  priority = "polite",
}: {
  message: string;
  priority?: "polite" | "assertive";
}) {
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

// Accessible Tabs
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function AccessibleTabs({ tabs }: { tabs: Tab[] }) {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab((index + 1) % tabs.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab((index - 1 + tabs.length) % tabs.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveTab(tabs.length - 1);
    }
  };

  return (
    <div>
      <div role="tablist" className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 py-2 font-medium ${
              activeTab === index
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== index}
          className="p-4"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

// Accessible Tooltip
export function AccessibleTooltip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const tooltipId = React.useId();

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-describedby={tooltipId}
      >
        {children}
      </div>
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded whitespace-nowrap"
        >
          {content}
        </div>
      )}
    </div>
  );
}
