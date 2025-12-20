export const apiFetchData = async <T>(
  url: string,
  isArray: boolean = false
): Promise<T> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    if (
      !data.success ||
      (isArray ? !Array.isArray(data.data) : typeof data.data !== 'object')
    ) {
      throw new Error('Invalid response structure')
    }
    return data.data as T
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
