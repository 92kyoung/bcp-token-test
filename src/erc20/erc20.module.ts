import { Module } from '@nestjs/common';
import { ERC20Controller } from './erc20.controller';
import { ERC20Service } from './erc20.service';
import { TxService } from 'src/transaction/tx.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ERC20Controller],
  providers: [ERC20Service, TxService, PrismaService]
})
export class ERC20Module {}
