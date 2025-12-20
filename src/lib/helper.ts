import { CartAttributeOption } from '@/types/cart'

// date-fns
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export const generateCartItemId = (
  attributes: CartAttributeOption[],
  productId?: string
): string => {
  let id = `${productId}` // Bắt đầu với productId
  // console.log('Type of attributes:', typeof attributes)
  // console.log('Is attributes an array?', Array.isArray(attributes))
  // console.log('Attributes:', attributes)

  if (attributes.length === 0) {
    // Nếu không có thuộc tính, chỉ sử dụng productId làm ID
    return id
  } // Tránh lỗi nếu không có thuộc tính

  // Nếu có thuộc tính, tiếp tục xử lý
  // 🔥 Sắp xếp attributes theo attribute_id để đảm bảo thứ tự luôn cố định
  const sortedAttributes = [...attributes].sort(
    (a, b) => a.attribute_id - b.attribute_id
  )

  const attributesPart = sortedAttributes
    .map(attr => `${attr.attribute_id}-${attr.name.replace(/\s+/g, '-')}`) // Gộp thuộc tính
    .join('_')

  // console.log('attributesPart', attributesPart)

  id += `_${attributesPart}` // Thêm phần thuộc tính vào ID

  return id // Trả về ID duy nhất
}

export const tranformTimer = (createdAt: string) => {
  if (createdAt === '') return ''
  const formattedDate = format(new Date(createdAt), 'dd-MM-yyyy HH:mm', {
    locale: vi
  })

  return formattedDate
}

// Sử dụng trong component khác:
// <OrderDate createdAt="2025-03-29T07:56:59.000000Z" />
