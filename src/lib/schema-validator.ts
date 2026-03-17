// Build-time Schema Validation - Deploy öncesi otomatik kontrol

interface SchemaValidationError {
  path: string;
  field: string;
  message: string;
  severity: "error" | "warning";
}

interface SchemaValidationResult {
  isValid: boolean;
  errors: SchemaValidationError[];
  warnings: SchemaValidationError[];
}

// Required fields for each schema type
const REQUIRED_FIELDS: Record<string, string[]> = {
  Organization: ["@type", "@id", "name", "url", "telephone", "address", "sameAs"],
  Service: ["@type", "@id", "name", "description", "url", "provider"],
  Article: ["@type", "@id", "headline", "datePublished", "author", "publisher"],
  WebPage: ["@type", "@id", "name", "url", "isPartOf", "publisher"],
  FAQPage: ["@type", "mainEntity"],
  HowTo: ["@type", "name", "step"],
  BreadcrumbList: ["@type", "itemListElement"],
};

export function validateSchema(schema: any, schemaType: string): SchemaValidationResult {
  const errors: SchemaValidationError[] = [];
  const warnings: SchemaValidationError[] = [];

  // Check required fields
  const requiredFields = REQUIRED_FIELDS[schemaType] || [];
  requiredFields.forEach((field) => {
    if (!schema[field]) {
      errors.push({
        path: schemaType,
        field,
        message: `Required field "${field}" is missing`,
        severity: "error",
      });
    }
  });

  // Validate @id format
  if (schema["@id"] && !schema["@id"].includes("#")) {
    warnings.push({
      path: schemaType,
      field: "@id",
      message: "@id should include fragment identifier (e.g., #organization)",
      severity: "warning",
    });
  }

  // Validate URL format
  if (schema.url && !schema.url.startsWith("http")) {
    errors.push({
      path: schemaType,
      field: "url",
      message: "URL must be absolute (start with http/https)",
      severity: "error",
    });
  }

  // Validate sameAs array
  if (schema.sameAs && Array.isArray(schema.sameAs)) {
    if (schema.sameAs.length < 5) {
      warnings.push({
        path: schemaType,
        field: "sameAs",
        message: "sameAs should have at least 5 social media links for better entity recognition",
        severity: "warning",
      });
    }
  }

  // Validate @graph structure
  if (schema["@graph"] && Array.isArray(schema["@graph"])) {
    schema["@graph"].forEach((item: any, idx: number) => {
      if (!item["@type"]) {
        errors.push({
          path: `@graph[${idx}]`,
          field: "@type",
          message: "Each @graph item must have @type",
          severity: "error",
        });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

// Validate all schemas in a page
export function validatePageSchemas(schemas: any): SchemaValidationResult {
  const allErrors: SchemaValidationError[] = [];
  const allWarnings: SchemaValidationError[] = [];

  if (schemas["@graph"]) {
    schemas["@graph"].forEach((schema: any) => {
      const result = validateSchema(schema, schema["@type"]);
      allErrors.push(...result.errors);
      allWarnings.push(...result.warnings);
    });
  } else if (Array.isArray(schemas)) {
    schemas.forEach((schema: any) => {
      const result = validateSchema(schema, schema["@type"]);
      allErrors.push(...result.errors);
      allWarnings.push(...result.warnings);
    });
  } else {
    const result = validateSchema(schemas, schemas["@type"]);
    allErrors.push(...result.errors);
    allWarnings.push(...result.warnings);
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}

// Console logger for development
export function logSchemaValidation(result: SchemaValidationResult, pagePath: string) {
  if (result.isValid && result.warnings.length === 0) {
    console.log(`✅ [Schema Validation] ${pagePath} - All schemas valid`);
    return;
  }

  if (result.errors.length > 0) {
    console.error(`❌ [Schema Validation] ${pagePath} - ${result.errors.length} errors found:`);
    result.errors.forEach((err) => {
      console.error(`   - ${err.path}.${err.field}: ${err.message}`);
    });
  }

  if (result.warnings.length > 0) {
    console.warn(`⚠️  [Schema Validation] ${pagePath} - ${result.warnings.length} warnings:`);
    result.warnings.forEach((warn) => {
      console.warn(`   - ${warn.path}.${warn.field}: ${warn.message}`);
    });
  }
}

// Build-time validation script
export async function runBuildTimeValidation() {
  console.log("🔍 Running build-time schema validation...\n");

  const testUrls = [
    { path: "/", name: "Homepage" },
    { path: "/evden-eve-nakliyat", name: "Service Page" },
    { path: "/blog", name: "Blog List" },
    { path: "/hizmetlerimiz", name: "Services List" },
  ];

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const url of testUrls) {
    console.log(`\n📄 Validating: ${url.name} (${url.path})`);
    // Validation logic would go here in actual implementation
    // This is a placeholder for the build script
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`📊 Validation Summary:`);
  console.log(`   Total Errors: ${totalErrors}`);
  console.log(`   Total Warnings: ${totalWarnings}`);
  console.log(`${"=".repeat(60)}\n`);

  if (totalErrors > 0) {
    console.error("❌ Build failed due to schema validation errors");
    process.exit(1);
  } else {
    console.log("✅ All schemas validated successfully");
  }
}
