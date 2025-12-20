// src/components/SocialIcons.tsx

import ZaloIcon from '@/components/zalo-icon';
import Link from 'next/link';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';


// Định nghĩa một mảng chứa thông tin các mạng xã hội
// Cách này giúp bạn dễ dàng thêm/bớt icon trong tương lai
const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/monminpet99999',
    icon: <FaFacebookF className="h-5 w-5" />, // Dùng icon từ react-icons
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/monminpet/',
    icon: <FaInstagram className="h-5 w-5" />,
  },
  {
    name: 'Zalo',
    href: 'https://zalo.me/0779029133',
    icon: <ZaloIcon className="h-5 w-5 fill-current" />, // Dùng component ZaloIcon
  },
];

export const SocialIcons = () => {
  return (
    <ul className="flex items-center space-x-3">
      {socialLinks.map((social) => (
        <li key={social.name}>
          <Link
            href={social.href}
            target="_blank"
            title={social.name}
            // Đây là phần styling chính bằng Tailwind CSS
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white text-white transition-colors hover:bg-white hover:text-black"
          >
            {social.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
};