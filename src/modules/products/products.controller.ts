import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe
} from '@nestjs/common'
import { ProductsService } from './products.service'
import Product from 'src/entities/product.entity'
import CreateProductDto from './dto/create.dto'
import ResponseData from 'src/global/Response'
import { HttpMessage } from 'src/global/Response.enum'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    try {
      const product = await this.productsService.findById(+id)
      return new ResponseData(product, HttpStatus.OK, HttpMessage.SUCCESS)
    } catch (error) {
      if (error instanceof HttpException) {
        return new ResponseData(null, error.getStatus(), error.message)
      }
      return new ResponseData(null, HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.ERROR)
    }
  }

  @Post()
  create(@Body(new ValidationPipe()) body: CreateProductDto) {
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
      return new ResponseData(product, HttpStatus.OK, HttpMessage.SUCCESS)
    } catch (error) {
      if (error instanceof HttpException) {
        return new ResponseData(null, error.getStatus(), error.message)
      }
      return new ResponseData(null, HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.ERROR)
    }
  }
}
