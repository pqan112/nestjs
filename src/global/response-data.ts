export default class ResponseData<T> {
  data: T
  statusCode: number
  message: string
  success: boolean

  constructor({
    data,
    statusCode,
    message,
    success = true
  }: {
    data: T
    statusCode: number
    message: string
    success?: boolean
  }) {
    this.data = data
    this.success = success
    this.statusCode = statusCode
    this.message = message
    return this
  }
}
