import { Platform } from 'react-native';

/**
 * MonitoringService
 * A strategic bridge for production-grade observability (Sentry/PostHog/Mixpanel).
 * In an Antigravity environment, we prioritize telemetry to catch zero-day bugs.
 */
class MonitoringService {
  private static instance: MonitoringService;

  private constructor() {}

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  /**
   * Log non-critical exceptions or diagnostic information.
   */
  log(message: string, data?: any) {
    if (__DEV__) {
      console.log(`[MONITORING] ${message}`, data);
    }
    // Integrate with Sentry.captureMessage or PostHog.capture here
  }

  /**
   * Capture critical errors for immediate debugging.
   */
  error(error: Error | string, context?: any) {
    if (__DEV__) {
      console.error(`[MONITORING ERROR]`, error, context);
    }
    // Integrate with Sentry.captureException here
  }

  /**
   * Track high-value user conversion events (Matches, Gold Upgrades, Calls).
   */
  trackEvent(event: string, properties?: any) {
    if (__DEV__) {
      console.log(`[EVENT TRACKED] ${event}`, properties);
    }
    // Integrate with PostHog or Mixpanel here
  }

  /**
   * Performance monitoring for high-computation tasks.
   */
  startTimer(label: string): () => void {
    const start = Date.now();
    return () => {
      const duration = Date.now() - start;
      this.trackEvent('performance_metric', { label, duration, platform: Platform.OS });
    };
  }
}

export const monitoring = MonitoringService.getInstance();
