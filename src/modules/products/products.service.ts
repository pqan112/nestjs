import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { REPOSITORIES } from 'src/constants'
import Product from 'src/entities/product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProductsService {
  constructor(
    @Inject(REPOSITORIES.PRODUCT_REPOSITORY)
    private readonly productRepository: Repository<Product>
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find()
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) {
      throw new HttpException(`Product with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return product
  }

  create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData)
    product.created_at = new Date()
    product.updated_at = new Date()
    return this.productRepository.save(product)
  }

  async update(id: number, productData: Partial<Product>): Promise<Product | null> {
    productData.updated_at = new Date()
    await this.productRepository.update(id, productData)
    return this.productRepository.findOneBy({ id })
  }

  async delete(id: number) {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) {
      throw new HttpException(`Product with id ${id} not found`, HttpStatus.NOT_FOUND)
    }
    await this.productRepository.delete(id)
    return product
  }
}
