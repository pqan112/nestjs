import { DATA_SOURCE } from 'src/constants'
import Product from 'src/entities/product.entity'
import User from 'src/entities/user.entity'
import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Product, User], // danh sách các entity sẽ ánh xạ
        synchronize: true // tự động tạo bảng từ entity (chỉ dùng trong development)
      })

      return dataSource.initialize()
    }
  }
]
