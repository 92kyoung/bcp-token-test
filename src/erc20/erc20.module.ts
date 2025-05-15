import { ERC20FactoryService } from './service/erc20-factory.service';
import { Module } from '@nestjs/common';
import { ERC20Controller } from './controller/erc20.controller';
import { TxService } from 'src/transaction/tx.service';
import { ERC20Service } from './service/erc20.service';

@Module({
  controllers: [ERC20Controller],
  providers: [ERC20Service, ERC20FactoryService, TxService]
})
export class ERC20Module {}
