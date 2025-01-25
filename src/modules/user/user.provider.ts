import { DATA_SOURCE, REPOSITORIES } from 'src/constants'
import { DataSource } from 'typeorm'
import { User } from './user.entity'

export const userProviders = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE]
  }
]
