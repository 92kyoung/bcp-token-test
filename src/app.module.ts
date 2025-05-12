import { Global, Module } from '@nestjs/common';
import { ERC20Module } from './erc20/erc20.module';
import { Erc721Module } from './erc721/erc721.module';
import { MetadataModule } from './metadata/metadata.module';
import { GlobalExceptionsFilter } from './common/exceptions/globlal-exception.filter';

@Module({
  imports: [ERC20Module, Erc721Module, MetadataModule],
  controllers: [],
  providers: [
    {
      provide : 'APP_FILTER',
      useClass : GlobalExceptionsFilter,
    }
  ],
})
export class AppModule {}
