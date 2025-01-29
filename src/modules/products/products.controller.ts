import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import Product from 'src/entities/product.entity'
import ResponseData from 'src/global/response-data'
import { HttpMessage } from 'src/global/response.enum'
import CreateProductDto from './dto/create.dto'
import { ProductsService } from './products.service'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    const products = await this.productsService.findAll()
    return new ResponseData({ data: products, statusCode: HttpStatus.OK, message: HttpMessage.SUCCESS })
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    try {
      const product = await this.productsService.findById(+id)
      return new ResponseData({ data: product, statusCode: HttpStatus.OK, message: HttpMessage.SUCCESS })
    } catch (error) {
      if (error instanceof HttpException) {
        return new ResponseData({ data: null, statusCode: error.getStatus(), message: error.message })
      }
      return new ResponseData({ data: null, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpMessage.ERROR })
    }
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body)
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: Partial<Product>) {
    return this.productsService.update(+id, body)
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    try {
      const product = await this.productsService.delete(+id)
      return new ResponseData({ data: product, statusCode: HttpStatus.OK, message: HttpMessage.SUCCESS })
    } catch (error) {
      if (error instanceof HttpException) {
        return new ResponseData({ data: null, statusCode: error.getStatus(), message: error.message })
      }
      return new ResponseData({ data: null, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpMessage.ERROR })
    }
  }
}
