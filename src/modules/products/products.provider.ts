import { DATA_SOURCE, REPOSITORIES } from 'src/constants'
import Product from 'src/entities/product.entity'
import { DataSource } from 'typeorm'

export const productProviders = [
  {
    provide: REPOSITORIES.PRODUCT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: [DATA_SOURCE]
  }
]
