// Enhanced VideoObject Schema with all required fields

interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string; // ISO 8601 format: PT1M30S
  contentUrl?: string;
  embedUrl?: string;
  transcript?: string;
}

export function generateVideoSchema(props: VideoSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${props.contentUrl || props.embedUrl}#video`,
    name: props.name,
    description: props.description,
    thumbnailUrl: props.thumbnailUrl,
    uploadDate: props.uploadDate,
    duration: props.duration,
    ...(props.contentUrl && { contentUrl: props.contentUrl }),
    ...(props.embedUrl && { embedUrl: props.embedUrl }),
    ...(props.transcript && { transcript: props.transcript }),
  };
}
