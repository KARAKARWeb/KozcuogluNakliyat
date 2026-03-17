import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST() {
  try {
    // Clear Next.js cache
    revalidatePath('/', 'layout');
    
    // Clear all routes
    const routes = [
      '/',
      '/hizmetler',
      '/hakkimizda',
      '/iletisim',
      '/blog',
      '/hizmet-bolgeleri',
      '/teklif-al',
      '/tasima-takip',
    ];
    
    routes.forEach(route => {
      revalidatePath(route);
    });

    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      clearedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cache clear error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}
