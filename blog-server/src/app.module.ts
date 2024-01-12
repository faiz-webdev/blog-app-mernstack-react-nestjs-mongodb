import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { config } from 'dotenv';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';
import { GlobalConfigModule } from 'db/config.module';

config();

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://0.0.0.0:27017/nest-react-blog'),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [databaseConfig],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('database.uri'),
    //   }),
    //   inject: [ConfigService],
    // }),
    GlobalConfigModule,
    UserModule,
    PostModule,
    CategoryModule,
    TagModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
