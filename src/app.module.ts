import { Global, Module } from '@nestjs/common';
import { ERC20Module } from './erc20/erc20.module';
import { Erc721Module } from './erc721/erc721.module';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [ERC20Module, Erc721Module, MetadataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
