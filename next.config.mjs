/** @type {import('next').NextConfig} */
const nextConfig = {
  // Thêm hàm redirects vào đây
  async redirects() {
    return [
      {
        source: '/service/:slug/:id', // Bắt tất cả URL cũ có dạng /service/slug/id
        destination: '/services/:id',  // Chuyển hướng đến URL mới chỉ có /services/id
        permanent: true,             // Đây là redirect 301
      },
      // Redirect này để bắt các trường hợp lẻ như /service/noi-khoa
      {
        source: '/service/:slug',
        destination: '/services', // Chuyển về trang dịch vụ chung
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.monminpet.com',
      },
      {
        protocol: 'https',
        hostname: 'down-vn.img.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'api.vietqr.io',
      },
      {
        protocol: 'https',
        hostname: 'www.petmart.vn',
      },
      {
        protocol: 'https',
        hostname: 'medlatec.vn',
      },
    ]
  }
};

export default nextConfig;
