export default class ResponseData<T> {
  data: T
  statusCode: number
  message: string

  constructor(data: T, statusCode: number, message: string) {
    this.data = data
    this.statusCode = statusCode
    this.message = message
    return this
  }
}
