import { NextRequest, NextResponse } from 'next/server';
import { resolvers } from '@/lib/graphql/resolvers';

// Simple GraphQL API without Apollo Server
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, variables } = body;

    // Parse query to extract operation
    const operationMatch = query.match(/query\s+(\w+)|mutation\s+(\w+)/);
    const operation = operationMatch ? (operationMatch[1] || operationMatch[2]) : null;

    if (!operation) {
      return NextResponse.json({ error: 'Invalid GraphQL query' }, { status: 400 });
    }

    // Execute resolver
    let result;
    if (query.includes('mutation')) {
      const mutationName = query.match(/mutation\s*{\s*(\w+)/)?.[1];
      if (mutationName && mutationName in resolvers.Mutation) {
        result = await (resolvers.Mutation as any)[mutationName](null, variables);
      }
    } else {
      const queryName = query.match(/query\s*{\s*(\w+)/)?.[1] || query.match(/{\s*(\w+)/)?.[1];
      if (queryName && queryName in resolvers.Query) {
        result = await (resolvers.Query as any)[queryName](null, variables);
      }
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('GraphQL error:', error);
    return NextResponse.json({ error: 'GraphQL execution failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'GraphQL API - Use POST with query and variables',
    example: {
      query: '{ services(limit: 5) { id title slug } }',
      variables: {}
    }
  });
}
