import { Module } from '@nestjs/common';
import { ERC20Controller } from './erc20.controller';
import { ERC20Service } from './erc20.service';
import { TxService } from 'src/transaction/tx.service';

@Module({
  controllers: [ERC20Controller],
  providers: [ERC20Service, TxService]
})
export class ERC20Module {}
