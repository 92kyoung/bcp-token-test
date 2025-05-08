import { Module } from '@nestjs/common';
import { ERC20Module } from './erc20/erc20.module';

@Module({
  imports: [ERC20Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
