export interface ServicesCat {
  id: number
  name: string
  thumb: string
  video?: string
  type_thumb_video?: string
  content: string
  desc: string
}

export interface ServicesListProps {
  servicesList: ServicesCat[]
}

// export interface ServiceDetail {
//   id: number
//   title: string
//   thumb: string
//   desc: string
//   hot: number
//   video: string
//   content: string
//   type_thumb_video: string
//   tags: string[]
//   menus: {
//     id: number
//     name: string
//     thumb: string
//     desc: string | null
//     content: string
//     video: string
//     type_thumb_video: string
//   }
//   faqs: {
//     id: number
//     question: string
//     answer: string
//   }[]
// }
export interface ServiceDetail {
  id: number
  name: string
  thumb: string
  desc: string
  content: string
  faqs: {
    id: number
    question: string
    answer: string
  }[]
}

/**{
    "full_name": "Giàu",
    "email": "",
    "phone": "",
    "pet": "Chó",
    "service": "Tỉa lông",
    "message": "xin chhaso",
    "appointment_at": ""
} */

interface MessageBody {
  full_name: string
  email: string
  phone: string
  pet: string
  service: string
  message: string
  appointment_at: string
}

interface DataProps {
  id: string
  title: string
  desc: string
}
export interface ServiceMessageRes {
  success: boolean
  message: string
  data: MessageBody
}
export interface ServiceDetailRes {
  success: boolean
  message: string
  data: ServiceDetail
}
export interface ServiceCatRes {
  success: boolean
  message: string
  data: DataProps[]
  menus: ServicesCat[]
}
