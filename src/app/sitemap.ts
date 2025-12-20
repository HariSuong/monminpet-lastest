// app/sitemap.ts

import { MetadataRoute } from 'next';
import productApiRequest from '@/services/apiProducts';
import postApiRequest from '@/services/apiPost';
import serviceApiRequest from '@/services/apiServices';
import slugify from 'slugify';

const baseUrl = 'https://monminpet.com';

// --- ĐỊNH NGHĨA CÁC KIỂU DỮ LIỆU ---
interface Category {
  id: number;
}
// Không cần 'updated_at' trong interface này nữa
interface SitemapItem {
  id: number;
  slug?: string;
  name?: string; 
  title?: string; // Dùng cho posts
}
interface ServiceMenuItem {
  id: number;
  name: string;
}

// --- HÀM HELPER CHO PRODUCTS ---
async function getAllProductsFromCategory(categoryId: number): Promise<SitemapItem[]> {
  let allItems: SitemapItem[] = [];
  let currentPage = 1;
  let lastPage = 1;
  do {
    const response = await productApiRequest.getProducts(categoryId, currentPage);
    const { data, last_page } = response.payload.data;
    if (data && data.length > 0) {
      allItems.push(...data);
    }
    lastPage = last_page;
    currentPage++;
  } while (currentPage <= lastPage);
  return allItems;
}

// --- HÀM HELPER CHO POSTS ---
async function getAllPostsFromCategory(categoryId: number): Promise<SitemapItem[]> {
  let allItems: SitemapItem[] = [];
  let currentPage = 1;
  let lastPage = 1;
  do {
    const response = await postApiRequest.getPosts(categoryId, currentPage); 
    const { data, last_page } = response.payload.data;
    if (data && data.length > 0) {
      allItems.push(...data);
    }
    lastPage = last_page;
    currentPage++;
  } while (currentPage <= lastPage);
  return allItems;
}

// --- HÀM SITEMAP CHÍNH ---
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // 1. URL Tĩnh
  const staticRoutes = [
    '/', '/about-us', '/products', '/services', '/posts', '/academy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  // 2. Thu thập URL động cho PRODUCTS
  const { payload: productCategoriesPayload } = await productApiRequest.getProductsCat();
  const productCategoryPromises = productCategoriesPayload.data.map((cat: Category) => getAllProductsFromCategory(cat.id));
  const productArrays = await Promise.all(productCategoryPromises);
  const allProducts = productArrays.flat();
  const productRoutes = allProducts.map((product) => {
    // Vì product không có slug, chúng ta tạo slug từ name
    const slug = slugify(product.name || '', { lower: true, strict: true, locale: 'vi' });
    return {
      url: `${baseUrl}/products/${slug}/${product.id}`,
      // 👇 THAY ĐỔI Ở ĐÂY: Dùng ngày hiện tại
      lastModified: currentDate,
      priority: 0.7,
    }
  });

  // 3. Thu thập URL động cho POSTS
  const { payload: postCategoriesPayload } = await postApiRequest.getPostsCat();
  const postCategoryPromises = postCategoriesPayload.data.map((cat: Category) => getAllPostsFromCategory(cat.id));
  const postArrays = await Promise.all(postCategoryPromises);
  const allPosts = postArrays.flat();
  const postRoutes = allPosts.map((post) => {
    // Post dùng title để tạo slug
    const slug = slugify(post.title || '', { lower: true, strict: true, locale: 'vi' });
    return {
      url: `${baseUrl}/posts/${slug}/${post.id}`,
      // 👇 THAY ĐỔI Ở ĐÂY: Dùng ngày hiện tại
      lastModified: currentDate,
      priority: 0.6,
    }
  });

  // 4. Thu thập URL động cho SERVICES
  const { payload: servicesPayload } = await serviceApiRequest.getServices();
  const serviceMenus: ServiceMenuItem[] = servicesPayload.menus;
  const serviceRoutes = serviceMenus.map((service) => {
    const slug = slugify(service.name || '', { lower: true, strict: true, locale: 'vi' });
    return {
      url: `${baseUrl}/services/${slug}/${service.id}`,
      lastModified: currentDate,
      priority: 0.7,
    };
  });

  // 5. Kết hợp tất cả lại
  return [...staticRoutes, ...productRoutes, ...postRoutes, ...serviceRoutes];
}