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
import { Erc20StatusValidationPipe } from './pipes/erc20-status-validation.pipe';
import { ERC20Status } from './erc20.model';

@Controller('erc20')
export class ERC20Controller {
  constructor(private erc20Service: ERC20Service) {}

  @Post('/deployedTokenAddress/get')
  getDeployedTokenAddress() {
    return this.erc20Service.getDeployedTokenAddress();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createToken(
    @Body() body: CreateErc20Dto,
    @Body('status', Erc20StatusValidationPipe) status: ERC20Status,
  ) {
    return this.erc20Service.createErc20Token({ ...body, status });
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
