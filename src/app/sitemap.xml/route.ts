import { NextResponse } from 'next/server'
import slugify from 'slugify'
import productApiRequest from '@/services/apiProducts'
import postApiRequest from '@/services/apiPost'
import serviceApiRequest from '@/services/apiServices'

export const runtime = 'nodejs'
export const revalidate = 3600 // cache 1 giờ

const baseUrl = 'https://monminpet.com'

function xml(urls: { loc: string; lastmod?: string }[]) {
  const body = urls
    .map(
      u => `
  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`
}

export async function GET() {
  const now = new Date().toISOString()

  // ✅ giới hạn: chỉ lấy 1-2 trang đầu để sitemap không quá nặng
  // (Google không cần bạn nhét hết mọi sản phẩm nếu backend không chịu nổi)
  const staticRoutes = [
    '/',
    '/about-us',
    '/products',
    '/services',
    '/posts',
    '/academy'
  ].map(p => ({ loc: `${baseUrl}${p}`, lastmod: now }))

  let dynamic: { loc: string; lastmod?: string }[] = []

  try {
    const { payload: productCategories } =
      await productApiRequest.getProductsCat()
    // chỉ lấy mỗi category page 1 (hoặc 2)
    for (const cat of productCategories.data ?? []) {
      const res = await productApiRequest.getProducts(cat.id, 1)
      const items = res.payload.data?.data ?? []
      dynamic.push(
        ...items.map((product: any) => {
          const slug = slugify(product.name || '', {
            lower: true,
            strict: true,
            locale: 'vi'
          })
          return {
            loc: `${baseUrl}/products/${slug}/${product.id}`,
            lastmod: now
          }
        })
      )
    }

    const { payload: postCategories } = await postApiRequest.getPostsCat()
    for (const cat of postCategories.data ?? []) {
      const res = await postApiRequest.getPosts(cat.id, 1)
      const items = res.payload.data?.data ?? []
      dynamic.push(
        ...items.map((post: any) => {
          const slug = slugify(post.title || '', {
            lower: true,
            strict: true,
            locale: 'vi'
          })
          return { loc: `${baseUrl}/posts/${slug}/${post.id}`, lastmod: now }
        })
      )
    }

    const { payload: servicesPayload } = await serviceApiRequest.getServices()
    const menus = servicesPayload.menus ?? []
    dynamic.push(
      ...menus.map((s: any) => {
        const slug = slugify(s.name || '', {
          lower: true,
          strict: true,
          locale: 'vi'
        })
        return { loc: `${baseUrl}/services/${slug}/${s.id}`, lastmod: now }
      })
    )
  } catch (e) {
    // Nếu API fail, sitemap vẫn trả static để không chết site/build
    dynamic = []
  }

  const content = xml([...staticRoutes, ...dynamic])
  return new NextResponse(content, {
    headers: { 'Content-Type': 'application/xml' }
  })
}
