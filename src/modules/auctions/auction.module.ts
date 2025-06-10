import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { PrismaService } from '../../prisma.service';
import { AuctionService } from './auction.service';

@Module({
  controllers: [AuctionController],
  providers: [AuctionService, PrismaService],
})
export class AuctionModule {}
