import { User } from 'src/modules/user/user.entity'
import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'test',
        entities: [User], // danh sách các entity sẽ ánh xạ
        synchronize: true // tự động tạo bảng từ entity (chỉ dùng trong development)
      })

      return dataSource.initialize()
    }
  }
]
