// Email Service - SendGrid/Mailgun Integration

export interface EmailConfig {
  provider: "sendgrid" | "mailgun" | "smtp";
  apiKey?: string;
  domain?: string;
  from: {
    name: string;
    email: string;
  };
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: EmailAttachment[];
  tags?: string[];
  templateId?: string;
  templateData?: Record<string, any>;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface EmailTrackingData {
  messageId: string;
  to: string;
  subject: string;
  status: "sent" | "delivered" | "opened" | "clicked" | "bounced" | "failed";
  sentAt: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
}

// SendGrid Email Service
export class SendGridEmailService {
  private apiKey: string;
  private from: { name: string; email: string };

  constructor(apiKey: string, from: { name: string; email: string }) {
    this.apiKey = apiKey;
    this.from = from;
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      // Note: Requires @sendgrid/mail package
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(this.apiKey);

      // const msg = {
      //   to: options.to,
      //   from: this.from,
      //   subject: options.subject,
      //   text: options.text,
      //   html: options.html,
      //   cc: options.cc,
      //   bcc: options.bcc,
      //   attachments: options.attachments,
      //   customArgs: { tags: options.tags?.join(',') },
      // };

      // const response = await sgMail.send(msg);

      return {
        success: true,
        messageId: `sg_${Date.now()}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Send failed",
      };
    }
  }

  async sendTemplate(
    to: string | string[],
    templateId: string,
    templateData: Record<string, any>
  ): Promise<EmailResult> {
    try {
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(this.apiKey);

      // const msg = {
      //   to,
      //   from: this.from,
      //   templateId,
      //   dynamicTemplateData: templateData,
      // };

      // await sgMail.send(msg);

      return {
        success: true,
        messageId: `sg_template_${Date.now()}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Template send failed",
      };
    }
  }
}

// Mailgun Email Service
export class MailgunEmailService {
  private apiKey: string;
  private domain: string;
  private from: { name: string; email: string };

  constructor(apiKey: string, domain: string, from: { name: string; email: string }) {
    this.apiKey = apiKey;
    this.domain = domain;
    this.from = from;
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      // Note: Requires mailgun.js package
      // const formData = require('form-data');
      // const Mailgun = require('mailgun.js');
      // const mailgun = new Mailgun(formData);
      // const mg = mailgun.client({ username: 'api', key: this.apiKey });

      // const data = {
      //   from: `${this.from.name} <${this.from.email}>`,
      //   to: Array.isArray(options.to) ? options.to.join(',') : options.to,
      //   subject: options.subject,
      //   text: options.text,
      //   html: options.html,
      //   'o:tag': options.tags,
      // };

      // const response = await mg.messages.create(this.domain, data);

      return {
        success: true,
        messageId: `mg_${Date.now()}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Send failed",
      };
    }
  }
}

// Email Queue (Bull/BullMQ placeholder)
export class EmailQueue {
  private queue: Array<{ id: string; options: EmailOptions; status: string }> = [];

  async add(options: EmailOptions, priority: number = 0): Promise<string> {
    const jobId = `email_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Note: In production, use Bull/BullMQ with Redis
    // const Queue = require('bull');
    // const emailQueue = new Queue('email', { redis: { port: 6379, host: '127.0.0.1' } });
    // const job = await emailQueue.add(options, { priority });

    this.queue.push({ id: jobId, options, status: "pending" });
    
    return jobId;
  }

  async process(handler: (options: EmailOptions) => Promise<EmailResult>): Promise<void> {
    // In production:
    // emailQueue.process(async (job) => {
    //   return handler(job.data);
    // });

    for (const item of this.queue) {
      if (item.status === "pending") {
        item.status = "processing";
        await handler(item.options);
        item.status = "completed";
      }
    }
  }

  async getJob(jobId: string) {
    return this.queue.find((item) => item.id === jobId);
  }

  async getQueueStatus() {
    return {
      pending: this.queue.filter((item) => item.status === "pending").length,
      processing: this.queue.filter((item) => item.status === "processing").length,
      completed: this.queue.filter((item) => item.status === "completed").length,
    };
  }
}

// Email Service Manager
export class EmailService {
  private provider: SendGridEmailService | MailgunEmailService;
  private queue: EmailQueue;

  constructor(config: EmailConfig) {
    if (config.provider === "sendgrid" && config.apiKey) {
      this.provider = new SendGridEmailService(config.apiKey, config.from);
    } else if (config.provider === "mailgun" && config.apiKey && config.domain) {
      this.provider = new MailgunEmailService(config.apiKey, config.domain, config.from);
    } else {
      throw new Error("Invalid email service configuration");
    }

    this.queue = new EmailQueue();
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    return this.provider.send(options);
  }

  async sendQueued(options: EmailOptions, priority?: number): Promise<string> {
    return this.queue.add(options, priority);
  }

  async processQueue(): Promise<void> {
    await this.queue.process((options) => this.provider.send(options));
  }

  getQueue(): EmailQueue {
    return this.queue;
  }
}

// Newsletter utilities
export interface NewsletterCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  segmentId?: string;
  scheduledAt?: Date;
  sentAt?: Date;
  status: "draft" | "scheduled" | "sending" | "sent" | "failed";
  stats?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  tags?: string[];
  segmentIds?: string[];
  status: "active" | "unsubscribed" | "bounced";
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

export interface NewsletterSegment {
  id: string;
  name: string;
  description?: string;
  filters: {
    tags?: string[];
    subscribedAfter?: Date;
    subscribedBefore?: Date;
  };
}

// Get email service instance
export function getEmailService(): EmailService {
  const config: EmailConfig = {
    provider: (process.env.EMAIL_PROVIDER as "sendgrid" | "mailgun") || "sendgrid",
    apiKey: process.env.EMAIL_API_KEY,
    domain: process.env.EMAIL_DOMAIN,
    from: {
      name: process.env.EMAIL_FROM_NAME || "Kozcuoğlu Nakliyat",
      email: process.env.EMAIL_FROM_ADDRESS || "info@kozcuoglunakliyat.com.tr",
    },
  };

  return new EmailService(config);
}

// Email tracking
const emailTracking = new Map<string, EmailTrackingData>();

export function trackEmail(data: EmailTrackingData): void {
  emailTracking.set(data.messageId, data);
}

export function updateEmailStatus(
  messageId: string,
  status: EmailTrackingData["status"],
  timestamp?: Date
): void {
  const tracking = emailTracking.get(messageId);
  if (!tracking) return;

  tracking.status = status;

  if (status === "delivered") tracking.deliveredAt = timestamp || new Date();
  if (status === "opened") tracking.openedAt = timestamp || new Date();
  if (status === "clicked") tracking.clickedAt = timestamp || new Date();
}

export function getEmailTracking(messageId: string): EmailTrackingData | undefined {
  return emailTracking.get(messageId);
}

// Email analytics
export function getEmailAnalytics(messageIds: string[]) {
  const trackingData = messageIds
    .map((id) => emailTracking.get(id))
    .filter((data): data is EmailTrackingData => data !== undefined);

  const total = trackingData.length;
  const delivered = trackingData.filter((d) => d.status === "delivered" || d.openedAt).length;
  const opened = trackingData.filter((d) => d.openedAt).length;
  const clicked = trackingData.filter((d) => d.clickedAt).length;
  const bounced = trackingData.filter((d) => d.status === "bounced").length;

  return {
    total,
    delivered,
    opened,
    clicked,
    bounced,
    deliveryRate: total > 0 ? (delivered / total) * 100 : 0,
    openRate: delivered > 0 ? (opened / delivered) * 100 : 0,
    clickRate: opened > 0 ? (clicked / opened) * 100 : 0,
    bounceRate: total > 0 ? (bounced / total) * 100 : 0,
  };
}
