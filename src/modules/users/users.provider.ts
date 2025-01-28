import { DATA_SOURCE, REPOSITORIES } from 'src/constants'
import User from 'src/entities/user.entity'
import { DataSource } from 'typeorm'

export const userProviders = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE]
  }
]
