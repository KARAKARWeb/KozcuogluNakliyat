// API Versioning Utilities

export const API_VERSIONS = {
  V1: "v1",
  V2: "v2", // Future version
} as const;

export type ApiVersion = (typeof API_VERSIONS)[keyof typeof API_VERSIONS];

export const CURRENT_VERSION: ApiVersion = API_VERSIONS.V1;
export const SUPPORTED_VERSIONS: ApiVersion[] = [API_VERSIONS.V1];
export const DEPRECATED_VERSIONS: ApiVersion[] = [];

// API Version Header
export const API_VERSION_HEADER = "X-API-Version";

// Get API version from request
export function getApiVersion(headers: Headers): ApiVersion {
  const version = headers.get(API_VERSION_HEADER);
  
  if (version && isSupportedVersion(version as ApiVersion)) {
    return version as ApiVersion;
  }
  
  return CURRENT_VERSION;
}

// Check if version is supported
export function isSupportedVersion(version: string): boolean {
  return SUPPORTED_VERSIONS.includes(version as ApiVersion);
}

// Check if version is deprecated
export function isDeprecatedVersion(version: string): boolean {
  return DEPRECATED_VERSIONS.includes(version as ApiVersion);
}

// Get deprecation info
export function getDeprecationInfo(version: ApiVersion): {
  isDeprecated: boolean;
  sunsetDate?: string;
  migrationGuide?: string;
} {
  if (!isDeprecatedVersion(version)) {
    return { isDeprecated: false };
  }

  // Version-specific deprecation info
  const deprecationMap: Record<string, { sunsetDate: string; migrationGuide: string }> = {
    // Example: v0: { sunsetDate: "2024-12-31", migrationGuide: "/docs/migration/v0-to-v1" }
  };

  return {
    isDeprecated: true,
    ...deprecationMap[version],
  };
}

// Add version headers to response
export function addVersionHeaders(
  headers: Headers,
  version: ApiVersion
): Headers {
  const newHeaders = new Headers(headers);
  
  newHeaders.set(API_VERSION_HEADER, version);
  newHeaders.set("X-API-Current-Version", CURRENT_VERSION);
  newHeaders.set("X-API-Supported-Versions", SUPPORTED_VERSIONS.join(", "));
  
  const deprecationInfo = getDeprecationInfo(version);
  if (deprecationInfo.isDeprecated) {
    newHeaders.set("X-API-Deprecated", "true");
    if (deprecationInfo.sunsetDate) {
      newHeaders.set("X-API-Sunset-Date", deprecationInfo.sunsetDate);
    }
    if (deprecationInfo.migrationGuide) {
      newHeaders.set("X-API-Migration-Guide", deprecationInfo.migrationGuide);
    }
  }
  
  return newHeaders;
}

// Version-specific response transformation
export function transformResponse<T>(
  data: T,
  version: ApiVersion
): T | any {
  // Apply version-specific transformations
  switch (version) {
    case API_VERSIONS.V1:
      return data; // No transformation needed for v1
    
    // Future versions
    // case API_VERSIONS.V2:
    //   return transformToV2(data);
    
    default:
      return data;
  }
}

// Backward compatibility helpers
export const BackwardCompatibility = {
  // Convert new field names to old field names
  toV1Fields: <T extends Record<string, any>>(data: T): T => {
    // Example transformations
    // if ('newFieldName' in data) {
    //   return { ...data, oldFieldName: data.newFieldName };
    // }
    return data;
  },

  // Convert old field names to new field names
  fromV1Fields: <T extends Record<string, any>>(data: T): T => {
    // Example transformations
    return data;
  },
};

// API Version Middleware
export function createVersionMiddleware() {
  return (handler: (req: Request, version: ApiVersion) => Promise<Response>) => {
    return async (req: Request): Promise<Response> => {
      const headers = req.headers;
      const version = getApiVersion(headers);

      // Check if version is supported
      if (!isSupportedVersion(version)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Unsupported API version",
            message: `API version ${version} is not supported. Supported versions: ${SUPPORTED_VERSIONS.join(", ")}`,
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Execute handler with version
      const response = await handler(req, version);

      // Add version headers to response
      const versionedHeaders = addVersionHeaders(
        new Headers(response.headers),
        version
      );

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: versionedHeaders,
      });
    };
  };
}

// Route versioning helper
export function getVersionedRoute(
  basePath: string,
  version: ApiVersion = CURRENT_VERSION
): string {
  return `/api/${version}${basePath}`;
}

// Version negotiation
export function negotiateVersion(
  requestedVersion: string | null,
  availableVersions: ApiVersion[] = SUPPORTED_VERSIONS
): ApiVersion {
  if (requestedVersion && availableVersions.includes(requestedVersion as ApiVersion)) {
    return requestedVersion as ApiVersion;
  }
  
  // Return latest supported version
  return availableVersions[availableVersions.length - 1];
}
