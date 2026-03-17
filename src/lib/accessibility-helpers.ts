// Accessibility Helpers - Keyboard Navigation, ARIA, Focus Management

// Keyboard navigation utilities
export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  TAB: "Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End",
} as const;

export function isKeyboardEvent(event: KeyboardEvent, key: string): boolean {
  return event.key === key;
}

export function handleKeyboardNavigation(
  event: KeyboardEvent,
  handlers: Partial<Record<keyof typeof KEYBOARD_KEYS, () => void>>
) {
  const key = event.key;
  
  for (const [handlerKey, handler] of Object.entries(handlers)) {
    if (KEYBOARD_KEYS[handlerKey as keyof typeof KEYBOARD_KEYS] === key) {
      event.preventDefault();
      handler();
      break;
    }
  }
}

// Focus management
export class FocusTrap {
  private element: HTMLElement;
  private previousFocus: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];

  constructor(element: HTMLElement) {
    this.element = element;
  }

  activate() {
    this.previousFocus = document.activeElement as HTMLElement;
    this.updateFocusableElements();
    
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }

    document.addEventListener("keydown", this.handleKeyDown);
  }

  deactivate() {
    document.removeEventListener("keydown", this.handleKeyDown);
    
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  private updateFocusableElements() {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    this.focusableElements = Array.from(
      this.element.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== KEYBOARD_KEYS.TAB) return;

    this.updateFocusableElements();

    if (this.focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    if (event.shiftKey) {
      if (activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };
}

// ARIA live region announcer
export class LiveRegionAnnouncer {
  private liveRegion: HTMLElement | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.createLiveRegion();
    }
  }

  private createLiveRegion() {
    this.liveRegion = document.createElement("div");
    this.liveRegion.setAttribute("role", "status");
    this.liveRegion.setAttribute("aria-live", "polite");
    this.liveRegion.setAttribute("aria-atomic", "true");
    this.liveRegion.className = "sr-only";
    document.body.appendChild(this.liveRegion);
  }

  announce(message: string, priority: "polite" | "assertive" = "polite") {
    if (!this.liveRegion) return;

    this.liveRegion.setAttribute("aria-live", priority);
    this.liveRegion.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = "";
      }
    }, 1000);
  }

  destroy() {
    if (this.liveRegion && this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
    }
  }
}

// Screen reader only text
export function getScreenReaderOnlyClass(): string {
  return "sr-only absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0";
}

// ARIA label generators
export function generateAriaLabel(
  type: "button" | "link" | "input" | "dialog" | "menu",
  context: string
): string {
  const templates = {
    button: `${context} düğmesi`,
    link: `${context} bağlantısı`,
    input: `${context} giriş alanı`,
    dialog: `${context} penceresi`,
    menu: `${context} menüsü`,
  };

  return templates[type];
}

// Color contrast checker
export function checkColorContrast(
  foreground: string,
  background: string
): { ratio: number; passesAA: boolean; passesAAA: boolean } {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.replace("#", ""), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;

    const [rs, gs, bs] = [r, g, b].map((c) => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return {
    ratio: Math.round(ratio * 100) / 100,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
  };
}

// Skip to content link
export function createSkipLink(targetId: string, label: string = "Ana içeriğe atla"): HTMLAnchorElement {
  const skipLink = document.createElement("a");
  skipLink.href = `#${targetId}`;
  skipLink.textContent = label;
  skipLink.className = "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[#e3000f] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white";
  
  return skipLink;
}

// Accessible form field helpers
export interface AccessibleFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
}

export function getAccessibleFieldProps(props: AccessibleFieldProps) {
  const { id, label, error, required, description } = props;
  
  return {
    id,
    "aria-label": label,
    "aria-required": required,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : description ? `${id}-description` : undefined,
  };
}

// Keyboard shortcuts manager
export class KeyboardShortcutManager {
  private shortcuts: Map<string, () => void> = new Map();

  register(key: string, handler: () => void, modifiers?: { ctrl?: boolean; alt?: boolean; shift?: boolean }) {
    const shortcutKey = this.getShortcutKey(key, modifiers);
    this.shortcuts.set(shortcutKey, handler);
  }

  unregister(key: string, modifiers?: { ctrl?: boolean; alt?: boolean; shift?: boolean }) {
    const shortcutKey = this.getShortcutKey(key, modifiers);
    this.shortcuts.delete(shortcutKey);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const shortcutKey = this.getShortcutKey(
      event.key,
      {
        ctrl: event.ctrlKey || event.metaKey,
        alt: event.altKey,
        shift: event.shiftKey,
      }
    );

    const handler = this.shortcuts.get(shortcutKey);
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

  private getShortcutKey(key: string, modifiers?: { ctrl?: boolean; alt?: boolean; shift?: boolean }): string {
    const parts: string[] = [];
    
    if (modifiers?.ctrl) parts.push("ctrl");
    if (modifiers?.alt) parts.push("alt");
    if (modifiers?.shift) parts.push("shift");
    parts.push(key.toLowerCase());
    
    return parts.join("+");
  }

  activate() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  deactivate() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
}

// Mobile touch helpers
export function isTouchDevice(): boolean {
  return typeof window !== "undefined" && (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

export function handleTouchOrClick(
  touchHandler: (event: TouchEvent) => void,
  clickHandler: (event: MouseEvent) => void
) {
  if (isTouchDevice()) {
    return { onTouchEnd: touchHandler };
  }
  return { onClick: clickHandler };
}

// Responsive viewport helpers
export function getViewportSize(): { width: number; height: number } {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function isMobileViewport(): boolean {
  const { width } = getViewportSize();
  return width < 768;
}

export function isTabletViewport(): boolean {
  const { width } = getViewportSize();
  return width >= 768 && width < 1024;
}

export function isDesktopViewport(): boolean {
  const { width } = getViewportSize();
  return width >= 1024;
}
