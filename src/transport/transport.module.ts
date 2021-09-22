import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transport, TransportSchema } from './schemas/transport.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Transport.name, schema: TransportSchema }]),],
  controllers: [TransportController],
  providers: [TransportService]
})
export class TransportModule {}
