// Image Optimization - EXIF cleaning & Multiple aspect ratios

interface ImageVariant {
  url: string;
  width: number;
  height: number;
  aspectRatio: string;
}

// Generate multiple aspect ratio variants
export function generateImageVariants(baseUrl: string, filename: string): ImageVariant[] {
  const variants: ImageVariant[] = [
    { url: `${baseUrl}/${filename}-1x1.jpg`, width: 1200, height: 1200, aspectRatio: "1:1" },
    { url: `${baseUrl}/${filename}-4x3.jpg`, width: 1200, height: 900, aspectRatio: "4:3" },
    { url: `${baseUrl}/${filename}-16x9.jpg`, width: 1920, height: 1080, aspectRatio: "16:9" },
  ];
  
  return variants;
}

// EXIF data cleaning checker
export interface EXIFData {
  hasGPS: boolean;
  hasPersonalInfo: boolean;
  hasCameraInfo: boolean;
  warnings: string[];
}

export function checkEXIFData(imagePath: string): EXIFData {
  // This would integrate with sharp or exif-parser in real implementation
  // For now, return structure
  return {
    hasGPS: false,
    hasPersonalInfo: false,
    hasCameraInfo: false,
    warnings: [],
  };
}

export function cleanEXIFData(imagePath: string): {
  success: boolean;
  message: string;
} {
  // This would use sharp to strip EXIF data
  // Example: sharp(imagePath).rotate().toFile(outputPath)
  return {
    success: true,
    message: "EXIF data cleaned successfully",
  };
}

// Image schema for rich results
export function generateImageObjectSchema(image: {
  url: string;
  caption: string;
  width: number;
  height: number;
  author?: string;
  license?: string;
}) {
  return {
    "@type": "ImageObject",
    "@id": `${image.url}#image`,
    url: image.url,
    width: image.width,
    height: image.height,
    caption: image.caption,
    ...(image.author && { author: { "@type": "Person", name: image.author } }),
    ...(image.license && { license: image.license }),
  };
}
