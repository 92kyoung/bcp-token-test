import { Module } from '@nestjs/common';
import { Erc20Controller } from './erc20.controller';
import { ERC20Service } from './erc20.service';

@Module({
  controllers: [Erc20Controller],
  providers: [ERC20Service]
})
export class Erc20Module {}
