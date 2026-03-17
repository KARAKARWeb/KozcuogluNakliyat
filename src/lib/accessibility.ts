// WCAG 2.1 AA Compliance Utilities

// ARIA Labels Helper
export function generateAriaLabel(element: string, context?: string): string {
  const labels: Record<string, string> = {
    search: "Arama",
    menu: "Menü",
    close: "Kapat",
    open: "Aç",
    next: "Sonraki",
    previous: "Önceki",
    submit: "Gönder",
    cancel: "İptal",
    delete: "Sil",
    edit: "Düzenle",
    save: "Kaydet",
  };

  const label = labels[element] || element;
  return context ? `${label} - ${context}` : label;
}

// Keyboard Navigation Handler
export class KeyboardNavigationManager {
  private focusableElements: HTMLElement[] = [];
  private currentIndex = 0;

  constructor(container: HTMLElement) {
    this.updateFocusableElements(container);
  }

  updateFocusableElements(container: HTMLElement) {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    this.focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(selector)
    );
  }

  handleKeyDown(event: KeyboardEvent) {
    const { key, shiftKey } = event;

    if (key === 'Tab') {
      event.preventDefault();
      
      if (shiftKey) {
        this.focusPrevious();
      } else {
        this.focusNext();
      }
    }

    if (key === 'Escape') {
      this.focusFirst();
    }

    if (key === 'Home') {
      event.preventDefault();
      this.focusFirst();
    }

    if (key === 'End') {
      event.preventDefault();
      this.focusLast();
    }
  }

  focusNext() {
    this.currentIndex = (this.currentIndex + 1) % this.focusableElements.length;
    this.focusableElements[this.currentIndex]?.focus();
  }

  focusPrevious() {
    this.currentIndex =
      (this.currentIndex - 1 + this.focusableElements.length) %
      this.focusableElements.length;
    this.focusableElements[this.currentIndex]?.focus();
  }

  focusFirst() {
    this.currentIndex = 0;
    this.focusableElements[0]?.focus();
  }

  focusLast() {
    this.currentIndex = this.focusableElements.length - 1;
    this.focusableElements[this.currentIndex]?.focus();
  }
}

// Focus Management
export class FocusManager {
  private previousFocus: HTMLElement | null = null;

  trap(container: HTMLElement) {
    this.previousFocus = document.activeElement as HTMLElement;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      this.restore();
    };
  }

  restore() {
    if (this.previousFocus) {
      this.previousFocus.focus();
      this.previousFocus = null;
    }
  }
}

// Color Contrast Checker
export function checkColorContrast(
  foreground: string,
  background: string
): {
  ratio: number;
  AA: boolean;
  AAA: boolean;
  AALarge: boolean;
  AAALarge: boolean;
} {
  const ratio = calculateContrastRatio(foreground, background);

  return {
    ratio,
    AA: ratio >= 4.5,
    AAA: ratio >= 7,
    AALarge: ratio >= 3,
    AAALarge: ratio >= 4.5,
  };
}

function calculateContrastRatio(color1: string, color2: string): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(color: string): number {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const [r, g, b] = rgb.map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

// Screen Reader Announcer
export class ScreenReaderAnnouncer {
  private liveRegion: HTMLElement | null = null;

  constructor() {
    this.createLiveRegion();
  }

  private createLiveRegion() {
    if (typeof document === 'undefined') return;

    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('role', 'status');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    this.liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    `;

    document.body.appendChild(this.liveRegion);
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.liveRegion) return;

    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = '';

    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = message;
      }
    }, 100);
  }

  destroy() {
    if (this.liveRegion) {
      this.liveRegion.remove();
      this.liveRegion = null;
    }
  }
}

// Skip to Content Link
export function createSkipLink(targetId: string, label: string = 'Ana içeriğe geç') {
  if (typeof document === 'undefined') return;

  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = label;
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  `;

  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
}

// ARIA Live Region Manager
export class LiveRegionManager {
  private regions: Map<string, HTMLElement> = new Map();

  createRegion(
    id: string,
    options: {
      live?: 'polite' | 'assertive' | 'off';
      atomic?: boolean;
      relevant?: string;
    } = {}
  ) {
    if (typeof document === 'undefined') return;

    const region = document.createElement('div');
    region.id = id;
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', options.live || 'polite');
    region.setAttribute('aria-atomic', String(options.atomic ?? true));
    
    if (options.relevant) {
      region.setAttribute('aria-relevant', options.relevant);
    }

    region.className = 'sr-only';
    document.body.appendChild(region);
    this.regions.set(id, region);
  }

  announce(id: string, message: string) {
    const region = this.regions.get(id);
    if (region) {
      region.textContent = message;
    }
  }

  clear(id: string) {
    const region = this.regions.get(id);
    if (region) {
      region.textContent = '';
    }
  }

  destroy(id: string) {
    const region = this.regions.get(id);
    if (region) {
      region.remove();
      this.regions.delete(id);
    }
  }
}

// Accessible Modal Manager
export class AccessibleModalManager {
  private focusManager = new FocusManager();
  private previouslyFocused: HTMLElement | null = null;

  open(modal: HTMLElement) {
    this.previouslyFocused = document.activeElement as HTMLElement;
    
    // Set ARIA attributes
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    
    // Trap focus
    this.focusManager.trap(modal);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.close(modal);
      }
    };
    
    modal.addEventListener('keydown', handleEscape);
    
    return () => {
      modal.removeEventListener('keydown', handleEscape);
    };
  }

  close(modal: HTMLElement) {
    // Restore focus
    this.focusManager.restore();
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Remove ARIA attributes
    modal.removeAttribute('role');
    modal.removeAttribute('aria-modal');
  }
}

// Accessible Form Validation
export function announceFormError(fieldName: string, error: string) {
  const announcer = new ScreenReaderAnnouncer();
  announcer.announce(`${fieldName}: ${error}`, 'assertive');
}

// WCAG Compliance Checker
export interface WCAGCheckResult {
  criterion: string;
  level: 'A' | 'AA' | 'AAA';
  passed: boolean;
  message: string;
}

export function checkWCAGCompliance(element: HTMLElement): WCAGCheckResult[] {
  const results: WCAGCheckResult[] = [];

  // Check for alt text on images
  if (element.tagName === 'IMG') {
    const img = element as HTMLImageElement;
    results.push({
      criterion: '1.1.1 Non-text Content',
      level: 'A',
      passed: !!img.alt,
      message: img.alt ? 'Alt text provided' : 'Missing alt text',
    });
  }

  // Check for labels on form inputs
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    const input = element as HTMLInputElement;
    const hasLabel = !!input.labels?.length || !!input.getAttribute('aria-label');
    results.push({
      criterion: '3.3.2 Labels or Instructions',
      level: 'A',
      passed: hasLabel,
      message: hasLabel ? 'Label provided' : 'Missing label',
    });
  }

  // Check for keyboard accessibility
  const isInteractive = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(
    element.tagName
  );
  if (isInteractive) {
    const tabIndex = element.getAttribute('tabindex');
    results.push({
      criterion: '2.1.1 Keyboard',
      level: 'A',
      passed: tabIndex !== '-1',
      message: tabIndex !== '-1' ? 'Keyboard accessible' : 'Not keyboard accessible',
    });
  }

  return results;
}
