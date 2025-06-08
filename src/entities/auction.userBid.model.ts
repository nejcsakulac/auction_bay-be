import { Prisma } from '@prisma/client';

export class AuctionWithUserBid implements Prisma.AuctionUncheckedCreateInput {
  id?: number;
  title: string;
  description: string;
  startPrice: number;
  currentPrice: number | null;
  startTime: Date | string | null;
  endTime: Date | string;
  imageUrl?: string | null;
  userId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;

  userHasBid?: boolean; // this property is not part of the Prisma schema but added for frontend logic
}