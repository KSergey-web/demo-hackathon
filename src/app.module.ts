import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule } from './configure.root';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    configModule,
    SharedModule,
    HttpModule, 
    MongooseModule.forRoot(process.env.MONGODB_WRITE_CONNECTION_STRING),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
