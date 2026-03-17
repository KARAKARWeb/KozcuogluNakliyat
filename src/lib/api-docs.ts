// API Documentation - OpenAPI/Swagger Specification

export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Kozcuoğlu Nakliyat API",
    version: "1.0.0",
    description: "Kozcuoğlu Nakliyat web sitesi için RESTful API",
    contact: {
      name: "KARAKAR Web",
      email: "info@karakar.web.tr",
      url: "https://karakar.web.tr",
    },
  },
  servers: [
    {
      url: "https://kozcuoglunakliyat.com.tr/api/v1",
      description: "Production server",
    },
    {
      url: "http://localhost:3000/api/v1",
      description: "Development server",
    },
  ],
  tags: [
    { name: "Blog", description: "Blog post operations" },
    { name: "Services", description: "Service operations" },
    { name: "Regions", description: "Region operations" },
    { name: "Contact", description: "Contact and quote operations" },
    { name: "Newsletter", description: "Newsletter operations" },
  ],
  paths: {
    "/blog": {
      get: {
        tags: ["Blog"],
        summary: "Get all blog posts",
        description: "Retrieve a paginated list of blog posts",
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer", default: 1 },
            description: "Page number",
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 10, maximum: 100 },
            description: "Items per page",
          },
          {
            name: "category",
            in: "query",
            schema: { type: "string" },
            description: "Filter by category",
          },
          {
            name: "sort",
            in: "query",
            schema: { type: "string", default: "-publishedAt" },
            description: "Sort field (prefix with - for descending)",
          },
          {
            name: "search",
            in: "query",
            schema: { type: "string" },
            description: "Search in title and content",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Blog" },
                    },
                    meta: { $ref: "#/components/schemas/PaginationMeta" },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "429": { $ref: "#/components/responses/RateLimitExceeded" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Blog"],
        summary: "Create a new blog post",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BlogInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Blog post created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/Blog" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "422": { $ref: "#/components/responses/ValidationError" },
        },
      },
    },
    "/blog/{slug}": {
      get: {
        tags: ["Blog"],
        summary: "Get blog post by slug",
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Blog post slug",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/Blog" },
                  },
                },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/contact": {
      post: {
        tags: ["Contact"],
        summary: "Submit contact form",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ContactInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Message sent successfully",
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "429": { $ref: "#/components/responses/RateLimitExceeded" },
        },
      },
    },
    "/newsletter": {
      post: {
        tags: ["Newsletter"],
        summary: "Subscribe to newsletter",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", format: "email" },
                  source: { type: "string", default: "website" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Subscribed successfully",
          },
          "400": { $ref: "#/components/responses/BadRequest" },
        },
      },
    },
  },
  components: {
    schemas: {
      Blog: {
        type: "object",
        properties: {
          id: { type: "string", example: "clx123abc" },
          title: { type: "string", example: "Ankara Nakliyat Rehberi" },
          slug: { type: "string", example: "ankara-nakliyat-rehberi" },
          excerpt: { type: "string" },
          content: { type: "string" },
          image: { type: "string", nullable: true },
          category: { type: "string", example: "Rehber" },
          tags: { type: "array", items: { type: "string" } },
          author: { type: "string" },
          isPublished: { type: "boolean" },
          publishedAt: { type: "string", format: "date-time", nullable: true },
          viewCount: { type: "integer", default: 0 },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      BlogInput: {
        type: "object",
        required: ["title", "slug", "excerpt", "content", "category", "author"],
        properties: {
          title: { type: "string", minLength: 1, maxLength: 200 },
          slug: { type: "string", pattern: "^[a-z0-9-]+$" },
          excerpt: { type: "string", maxLength: 500 },
          content: { type: "string" },
          image: { type: "string", nullable: true },
          category: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          author: { type: "string" },
          isPublished: { type: "boolean", default: false },
        },
      },
      ContactInput: {
        type: "object",
        required: ["name", "email", "message"],
        properties: {
          name: { type: "string", minLength: 2 },
          email: { type: "string", format: "email" },
          phone: { type: "string", nullable: true },
          subject: { type: "string", nullable: true },
          message: { type: "string", minLength: 10 },
        },
      },
      PaginationMeta: {
        type: "object",
        properties: {
          total: { type: "integer", example: 100 },
          page: { type: "integer", example: 1 },
          limit: { type: "integer", example: 10 },
          totalPages: { type: "integer", example: 10 },
          hasNext: { type: "boolean", example: true },
          hasPrev: { type: "boolean", example: false },
          nextCursor: { type: "string", nullable: true },
          prevCursor: { type: "string", nullable: true },
        },
      },
      Error: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          error: { type: "string" },
          message: { type: "string" },
          details: { type: "object", nullable: true },
          code: { type: "string", nullable: true },
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Bad request",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
            example: {
              success: false,
              error: "Bad request",
              message: "Invalid parameters",
            },
          },
        },
      },
      Unauthorized: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
            example: {
              success: false,
              error: "Unauthorized",
              message: "Authentication required",
            },
          },
        },
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
            example: {
              success: false,
              error: "Not found",
              message: "Resource not found",
            },
          },
        },
      },
      ValidationError: {
        description: "Validation error",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
            example: {
              success: false,
              error: "Validation failed",
              details: {
                title: ["Title is required"],
              },
            },
          },
        },
      },
      RateLimitExceeded: {
        description: "Rate limit exceeded",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
            example: {
              success: false,
              error: "Rate limit exceeded",
              message: "Too many requests. Please try again later.",
              retryAfter: 60,
            },
          },
        },
      },
      InternalError: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
            example: {
              success: false,
              error: "Internal server error",
              message: "An unexpected error occurred",
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

// Error codes documentation
export const ERROR_CODES = {
  // Validation errors (1000-1999)
  VALIDATION_ERROR: {
    code: "1000",
    message: "Validation failed",
    httpStatus: 422,
  },
  INVALID_INPUT: {
    code: "1001",
    message: "Invalid input",
    httpStatus: 400,
  },
  
  // Authentication errors (2000-2999)
  UNAUTHORIZED: {
    code: "2000",
    message: "Authentication required",
    httpStatus: 401,
  },
  FORBIDDEN: {
    code: "2001",
    message: "Access forbidden",
    httpStatus: 403,
  },
  
  // Resource errors (3000-3999)
  NOT_FOUND: {
    code: "3000",
    message: "Resource not found",
    httpStatus: 404,
  },
  ALREADY_EXISTS: {
    code: "3001",
    message: "Resource already exists",
    httpStatus: 409,
  },
  
  // Rate limiting (4000-4999)
  RATE_LIMIT_EXCEEDED: {
    code: "4000",
    message: "Rate limit exceeded",
    httpStatus: 429,
  },
  
  // Server errors (5000-5999)
  INTERNAL_ERROR: {
    code: "5000",
    message: "Internal server error",
    httpStatus: 500,
  },
  DATABASE_ERROR: {
    code: "5001",
    message: "Database error",
    httpStatus: 500,
  },
} as const;
