import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ERC20Service } from './erc20.service';
import { CreateErc20Dto } from './dto/create-erc20.dto';
import { SendERC20Token } from './dto/send-erc20.dto';

@Controller('erc20')
export class ERC20Controller {
  constructor(private erc20Service: ERC20Service) {}

  @Post('/deployedTokenAddress/get')
  getDeployedTokenAddress() {
    return this.erc20Service.getDeployedTokenAddress();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createToken(@Body() createErc20Dto: CreateErc20Dto) {
    return this.erc20Service.createErc20Token(createErc20Dto);
  }

  @Post('/mint')
  @UsePipes(ValidationPipe)
  mintToken(@Body() sendc20Dto: SendERC20Token) {
    return this.erc20Service.sendErc20Token(sendc20Dto, 'mint');
  }

  @Post('/transfer')
  @UsePipes(ValidationPipe)
  transferToken(@Body() sendc20Dto: SendERC20Token) {
    return this.erc20Service.sendErc20Token(sendc20Dto, 'transfer');
  }
}
