// Hotjar Integration & Session Recording

declare global {
  interface Window {
    hj?: (...args: any[]) => void;
    _hjSettings?: {
      hjid: number;
      hjsv: number;
    };
  }
}

// Initialize Hotjar
export function initHotjar(hjid: number, hjsv: number = 6) {
  if (typeof window === 'undefined') return;

  window._hjSettings = { hjid, hjsv };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://static.hotjar.com/c/hotjar-${hjid}.js?sv=${hjsv}`;
  document.head.appendChild(script);

  window.hj = window.hj || function() {
    (window.hj as any).q = (window.hj as any).q || [];
    (window.hj as any).q.push(arguments);
  };
}

// Trigger Hotjar event
export function triggerHotjarEvent(eventName: string) {
  if (typeof window === 'undefined' || !window.hj) return;
  window.hj('event', eventName);
}

// Identify user
export function identifyHotjarUser(userId: string, attributes?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;
  window.hj('identify', userId, attributes);
}

// Tag recording
export function tagHotjarRecording(tags: string[]) {
  if (typeof window === 'undefined' || !window.hj) return;
  tags.forEach(tag => window.hj!('tagRecording', [tag]));
}

// Virtual page view
export function trackHotjarPageView(url: string) {
  if (typeof window === 'undefined' || !window.hj) return;
  window.hj('stateChange', url);
}

// Heatmap tracking
export interface HeatmapData {
  url: string;
  clicks: Array<{ x: number; y: number; timestamp: number }>;
  scrollDepth: number[];
  mouseMovements: Array<{ x: number; y: number; timestamp: number }>;
}

// Track click
export function trackClick(x: number, y: number): void {
  if (typeof window === 'undefined') return;
  
  const data = {
    x,
    y,
    timestamp: Date.now(),
    url: window.location.pathname,
  };
  
  // Store in localStorage for later analysis
  const clicks = JSON.parse(localStorage.getItem('heatmap_clicks') || '[]');
  clicks.push(data);
  localStorage.setItem('heatmap_clicks', JSON.stringify(clicks.slice(-100)));
}

// Track scroll depth
export function trackScrollDepth(): void {
  if (typeof window === 'undefined') return;
  
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  
  const depths = JSON.parse(localStorage.getItem('scroll_depths') || '[]');
  depths.push({
    depth: Math.round(scrollPercentage),
    timestamp: Date.now(),
    url: window.location.pathname,
  });
  localStorage.setItem('scroll_depths', JSON.stringify(depths.slice(-100)));
}

// Initialize click tracking
export function initClickTracking(): void {
  if (typeof window === 'undefined') return;
  
  document.addEventListener('click', (e) => {
    trackClick(e.clientX, e.clientY);
  });
}

// Initialize scroll tracking
export function initScrollTracking(): void {
  if (typeof window === 'undefined') return;
  
  let scrollTimeout: NodeJS.Timeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      trackScrollDepth();
    }, 100);
  });
}

// Get heatmap data
export function getHeatmapData(): HeatmapData {
  if (typeof window === 'undefined') {
    return {
      url: '',
      clicks: [],
      scrollDepth: [],
      mouseMovements: [],
    };
  }
  
  return {
    url: window.location.pathname,
    clicks: JSON.parse(localStorage.getItem('heatmap_clicks') || '[]'),
    scrollDepth: JSON.parse(localStorage.getItem('scroll_depths') || '[]'),
    mouseMovements: JSON.parse(localStorage.getItem('mouse_movements') || '[]'),
  };
}

// Session recording utilities
export interface SessionData {
  sessionId: string;
  startTime: number;
  endTime?: number;
  events: Array<{
    type: 'click' | 'scroll' | 'input' | 'navigation';
    timestamp: number;
    data: any;
  }>;
}

// Start session recording
export function startSessionRecording(): string {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const session: SessionData = {
    sessionId,
    startTime: Date.now(),
    events: [],
  };
  
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('current_session', JSON.stringify(session));
  }
  
  return sessionId;
}

// Record session event
export function recordSessionEvent(type: SessionData['events'][0]['type'], data: any): void {
  if (typeof window === 'undefined') return;
  
  const sessionStr = sessionStorage.getItem('current_session');
  if (!sessionStr) return;
  
  const session: SessionData = JSON.parse(sessionStr);
  session.events.push({
    type,
    timestamp: Date.now(),
    data,
  });
  
  sessionStorage.setItem('current_session', JSON.stringify(session));
}

// End session recording
export function endSessionRecording(): SessionData | null {
  if (typeof window === 'undefined') return null;
  
  const sessionStr = sessionStorage.getItem('current_session');
  if (!sessionStr) return null;
  
  const session: SessionData = JSON.parse(sessionStr);
  session.endTime = Date.now();
  
  // Save to localStorage for analysis
  const sessions = JSON.parse(localStorage.getItem('recorded_sessions') || '[]');
  sessions.push(session);
  localStorage.setItem('recorded_sessions', JSON.stringify(sessions.slice(-10)));
  
  sessionStorage.removeItem('current_session');
  
  return session;
}

// Get session analytics
export function getSessionAnalytics(): {
  totalSessions: number;
  averageDuration: number;
  averageEvents: number;
} {
  if (typeof window === 'undefined') {
    return { totalSessions: 0, averageDuration: 0, averageEvents: 0 };
  }
  
  const sessions: SessionData[] = JSON.parse(localStorage.getItem('recorded_sessions') || '[]');
  
  if (sessions.length === 0) {
    return { totalSessions: 0, averageDuration: 0, averageEvents: 0 };
  }
  
  const totalDuration = sessions.reduce((sum, s) => {
    return sum + ((s.endTime || Date.now()) - s.startTime);
  }, 0);
  
  const totalEvents = sessions.reduce((sum, s) => sum + s.events.length, 0);
  
  return {
    totalSessions: sessions.length,
    averageDuration: totalDuration / sessions.length,
    averageEvents: totalEvents / sessions.length,
  };
}
