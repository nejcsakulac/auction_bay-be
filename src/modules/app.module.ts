import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AuctionModule } from './auctions/auction.module';

@Module({
  imports: [

    UserModule,
    AuthModule,
    AuctionModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
