// Bulk Operations - Toplu İşlemler Utilities

export interface BulkOperationResult {
  success: boolean;
  processed: number;
  failed: number;
  errors: Array<{ id: string; error: string }>;
}

export interface BulkOperationOptions {
  ids: string[];
  operation: 'delete' | 'activate' | 'deactivate' | 'updateCategory' | 'addTags';
  data?: {
    category?: string;
    tags?: string[];
    [key: string]: any;
  };
}

// Bulk Delete
export async function bulkDelete(
  endpoint: string,
  ids: string[]
): Promise<BulkOperationResult> {
  const result: BulkOperationResult = {
    success: true,
    processed: 0,
    failed: 0,
    errors: [],
  };

  for (const id of ids) {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        result.processed++;
      } else {
        result.failed++;
        result.errors.push({ id, error: 'Delete failed' });
      }
    } catch (error) {
      result.failed++;
      result.errors.push({ id, error: String(error) });
    }
  }

  result.success = result.failed === 0;
  return result;
}

// Bulk Update Status
export async function bulkUpdateStatus(
  endpoint: string,
  ids: string[],
  isActive: boolean
): Promise<BulkOperationResult> {
  const result: BulkOperationResult = {
    success: true,
    processed: 0,
    failed: 0,
    errors: [],
  };

  for (const id of ids) {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      });

      if (response.ok) {
        result.processed++;
      } else {
        result.failed++;
        result.errors.push({ id, error: 'Status update failed' });
      }
    } catch (error) {
      result.failed++;
      result.errors.push({ id, error: String(error) });
    }
  }

  result.success = result.failed === 0;
  return result;
}

// Bulk Update Category
export async function bulkUpdateCategory(
  endpoint: string,
  ids: string[],
  category: string
): Promise<BulkOperationResult> {
  const result: BulkOperationResult = {
    success: true,
    processed: 0,
    failed: 0,
    errors: [],
  };

  for (const id of ids) {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });

      if (response.ok) {
        result.processed++;
      } else {
        result.failed++;
        result.errors.push({ id, error: 'Category update failed' });
      }
    } catch (error) {
      result.failed++;
      result.errors.push({ id, error: String(error) });
    }
  }

  result.success = result.failed === 0;
  return result;
}

// Bulk Add Tags
export async function bulkAddTags(
  endpoint: string,
  ids: string[],
  tags: string[]
): Promise<BulkOperationResult> {
  const result: BulkOperationResult = {
    success: true,
    processed: 0,
    failed: 0,
    errors: [],
  };

  for (const id of ids) {
    try {
      const response = await fetch(`${endpoint}/${id}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags }),
      });

      if (response.ok) {
        result.processed++;
      } else {
        result.failed++;
        result.errors.push({ id, error: 'Tag addition failed' });
      }
    } catch (error) {
      result.failed++;
      result.errors.push({ id, error: String(error) });
    }
  }

  result.success = result.failed === 0;
  return result;
}

// Generic Bulk Operation
export async function executeBulkOperation(
  options: BulkOperationOptions
): Promise<BulkOperationResult> {
  const { ids, operation, data } = options;

  switch (operation) {
    case 'delete':
      return bulkDelete('/api/items', ids);
    
    case 'activate':
      return bulkUpdateStatus('/api/items', ids, true);
    
    case 'deactivate':
      return bulkUpdateStatus('/api/items', ids, false);
    
    case 'updateCategory':
      if (!data?.category) throw new Error('Category required');
      return bulkUpdateCategory('/api/items', ids, data.category);
    
    case 'addTags':
      if (!data?.tags) throw new Error('Tags required');
      return bulkAddTags('/api/items', ids, data.tags);
    
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
}

// Progress Tracker
export class BulkOperationProgress {
  private total: number;
  private current: number = 0;
  private onProgress?: (progress: number) => void;

  constructor(total: number, onProgress?: (progress: number) => void) {
    this.total = total;
    this.onProgress = onProgress;
  }

  increment() {
    this.current++;
    if (this.onProgress) {
      this.onProgress((this.current / this.total) * 100);
    }
  }

  getProgress(): number {
    return (this.current / this.total) * 100;
  }

  isComplete(): boolean {
    return this.current >= this.total;
  }
}
