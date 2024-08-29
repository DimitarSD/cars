export const executeWithRetries = async (
  fn: () => Promise<any>,
  maxRetries = 3
) => {
  let attempts = 0
  while (attempts < maxRetries) {
    try {
      const result = await fn()
      return result
    } catch (error) {
      attempts++
      if (attempts === maxRetries) {
        throw new Error(`Operation failed after ${maxRetries} attempts.`)
      }
    }
  }
}
