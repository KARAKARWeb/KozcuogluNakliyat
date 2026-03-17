// Cloud Storage Utilities - AWS S3 & Cloudinary Integration

// AWS S3 Configuration
export interface S3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
}

// Cloudinary Configuration
export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

export type StorageProvider = "s3" | "cloudinary" | "local";

export interface UploadOptions {
  folder?: string;
  filename?: string;
  public?: boolean;
  overwrite?: boolean;
  tags?: string[];
}

export interface UploadResult {
  success: boolean;
  url: string;
  publicId?: string;
  key?: string;
  size: number;
  format: string;
  width?: number;
  height?: number;
  error?: string;
}

export interface DeleteResult {
  success: boolean;
  error?: string;
}

// AWS S3 Utilities
export class S3Storage {
  private config: S3Config;

  constructor(config: S3Config) {
    this.config = config;
  }

  async upload(
    file: File | Buffer,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    try {
      // Note: Requires @aws-sdk/client-s3 package
      // This is a placeholder implementation
      
      const filename = options.filename || `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const key = options.folder ? `${options.folder}/${filename}` : filename;

      // In real implementation:
      // const s3Client = new S3Client({ region: this.config.region, credentials: {...} });
      // const command = new PutObjectCommand({ Bucket: this.config.bucket, Key: key, Body: buffer });
      // await s3Client.send(command);

      const url = `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com/${key}`;

      return {
        success: true,
        url,
        key,
        size: file instanceof File ? file.size : file.length,
        format: file instanceof File ? file.type : "unknown",
      };
    } catch (error) {
      return {
        success: false,
        url: "",
        size: 0,
        format: "",
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  async delete(key: string): Promise<DeleteResult> {
    try {
      // In real implementation:
      // const s3Client = new S3Client({ region: this.config.region, credentials: {...} });
      // const command = new DeleteObjectCommand({ Bucket: this.config.bucket, Key: key });
      // await s3Client.send(command);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Delete failed",
      };
    }
  }

  getPublicUrl(key: string): string {
    return `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com/${key}`;
  }

  getSignedUrl(key: string, expiresIn: number = 3600): string {
    // In real implementation, use getSignedUrl from @aws-sdk/s3-request-presigner
    return this.getPublicUrl(key);
  }
}

// Cloudinary Utilities
export class CloudinaryStorage {
  private config: CloudinaryConfig;

  constructor(config: CloudinaryConfig) {
    this.config = config;
  }

  async upload(
    file: File | Buffer,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    try {
      // Note: Requires cloudinary package
      // This is a placeholder implementation

      const publicId = options.filename || `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const folder = options.folder || "uploads";

      // In real implementation:
      // const cloudinary = require('cloudinary').v2;
      // cloudinary.config({ cloud_name: this.config.cloudName, api_key: this.config.apiKey, api_secret: this.config.apiSecret });
      // const result = await cloudinary.uploader.upload(filePath, { folder, public_id: publicId, overwrite: options.overwrite, tags: options.tags });

      const url = `https://res.cloudinary.com/${this.config.cloudName}/image/upload/${folder}/${publicId}`;

      return {
        success: true,
        url,
        publicId: `${folder}/${publicId}`,
        size: file instanceof File ? file.size : file.length,
        format: file instanceof File ? file.type : "unknown",
      };
    } catch (error) {
      return {
        success: false,
        url: "",
        size: 0,
        format: "",
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  async delete(publicId: string): Promise<DeleteResult> {
    try {
      // In real implementation:
      // const cloudinary = require('cloudinary').v2;
      // await cloudinary.uploader.destroy(publicId);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Delete failed",
      };
    }
  }

  getPublicUrl(publicId: string, transformations?: string): string {
    const baseUrl = `https://res.cloudinary.com/${this.config.cloudName}/image/upload`;
    return transformations ? `${baseUrl}/${transformations}/${publicId}` : `${baseUrl}/${publicId}`;
  }

  getOptimizedUrl(publicId: string, width?: number, height?: number, quality: number = 80): string {
    const transformations = [];
    
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push(`q_${quality}`);
    transformations.push("f_auto"); // Auto format (WebP if supported)
    
    return this.getPublicUrl(publicId, transformations.join(","));
  }
}

// Local Storage (fallback)
export class LocalStorage {
  private uploadDir: string;

  constructor(uploadDir: string = "public/uploads") {
    this.uploadDir = uploadDir;
  }

  async upload(
    file: File | Buffer,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    try {
      const filename = options.filename || `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const folder = options.folder || "";
      const relativePath = folder ? `${folder}/${filename}` : filename;
      
      // In real implementation with Node.js fs:
      // const fs = require('fs').promises;
      // const path = require('path');
      // const fullPath = path.join(this.uploadDir, relativePath);
      // await fs.mkdir(path.dirname(fullPath), { recursive: true });
      // await fs.writeFile(fullPath, buffer);

      const url = `/uploads/${relativePath}`;

      return {
        success: true,
        url,
        key: relativePath,
        size: file instanceof File ? file.size : file.length,
        format: file instanceof File ? file.type : "unknown",
      };
    } catch (error) {
      return {
        success: false,
        url: "",
        size: 0,
        format: "",
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  async delete(key: string): Promise<DeleteResult> {
    try {
      // In real implementation:
      // const fs = require('fs').promises;
      // const path = require('path');
      // const fullPath = path.join(this.uploadDir, key);
      // await fs.unlink(fullPath);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Delete failed",
      };
    }
  }

  getPublicUrl(key: string): string {
    return `/uploads/${key}`;
  }
}

// Storage Factory
export class StorageManager {
  private provider: StorageProvider;
  private storage: S3Storage | CloudinaryStorage | LocalStorage;

  constructor(provider: StorageProvider = "local") {
    this.provider = provider;

    switch (provider) {
      case "s3":
        this.storage = new S3Storage({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
          region: process.env.AWS_REGION || "eu-central-1",
          bucket: process.env.AWS_S3_BUCKET || "",
        });
        break;

      case "cloudinary":
        this.storage = new CloudinaryStorage({
          cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
          apiKey: process.env.CLOUDINARY_API_KEY || "",
          apiSecret: process.env.CLOUDINARY_API_SECRET || "",
        });
        break;

      default:
        this.storage = new LocalStorage();
    }
  }

  async upload(file: File | Buffer, options?: UploadOptions): Promise<UploadResult> {
    return this.storage.upload(file, options);
  }

  async delete(keyOrPublicId: string): Promise<DeleteResult> {
    return this.storage.delete(keyOrPublicId);
  }

  getPublicUrl(keyOrPublicId: string): string {
    if (this.storage instanceof CloudinaryStorage) {
      return this.storage.getPublicUrl(keyOrPublicId);
    }
    return this.storage.getPublicUrl(keyOrPublicId);
  }

  getOptimizedUrl(keyOrPublicId: string, width?: number, height?: number, quality?: number): string {
    if (this.storage instanceof CloudinaryStorage) {
      return this.storage.getOptimizedUrl(keyOrPublicId, width, height, quality);
    }
    return this.getPublicUrl(keyOrPublicId);
  }
}

// Helper function to get storage manager
export function getStorageManager(): StorageManager {
  const provider = (process.env.STORAGE_PROVIDER as StorageProvider) || "local";
  return new StorageManager(provider);
}

// File to Buffer conversion (for browser File objects)
export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Generate unique filename
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const ext = originalName.split(".").pop();
  return `${timestamp}-${random}.${ext}`;
}

// Extract key from URL
export function extractKeyFromUrl(url: string, provider: StorageProvider): string {
  if (provider === "s3") {
    // Extract from S3 URL
    const match = url.match(/\.amazonaws\.com\/(.+)$/);
    return match ? match[1] : url;
  } else if (provider === "cloudinary") {
    // Extract from Cloudinary URL
    const match = url.match(/\/upload\/(.+)$/);
    return match ? match[1] : url;
  } else {
    // Local storage
    return url.replace("/uploads/", "");
  }
}
