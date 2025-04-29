
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ERC20Service } from './erc20.service';
import { CreateErc20Dto } from './dto/create-erc20.dto';

@Controller('erc20')
export class Erc20Controller {
  constructor(private erc20Service: ERC20Service) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  createToken(
    @Body() createErc20Dto : CreateErc20Dto
  ) {
    return this.erc20Service.createErc20Token(createErc20Dto);
  }

  @Post('/mint')
  mintToken() {
    return this.erc20Service.mintErc20Token();
  }

  @Post('/transfer')
  transferToken(
    deployedTokenAddress: string,
    signer: string,
    toAddress: string,
    amount: number,
  ) {
    return this.erc20Service.transferErc20Token(
      signer,
      deployedTokenAddress,
      toAddress,
      amount,
    );
  }
}
