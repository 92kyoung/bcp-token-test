import { ERC20FactoryService } from './../service/erc20-factory.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateErc20Dto } from '../dto/create-erc20.dto';
import { ActionERC20Token } from '../dto/action-erc20.dto';
import { ERC20Service } from '../service/erc20.service';
import { BalanceErc20Token } from '../dto/balance-erc20.dto';
import { BatchMintERC20Token } from '../dto/batch-mint-erc20.dto';
import { TotalSupplyErc20Token } from '../dto/totalSupply-erc20.dto';
import { BurnErc20Token } from '../dto/burn-erc20.dto';

@UsePipes(ValidationPipe)
@Controller('erc20')
export class ERC20Controller {
  constructor(
    private erc20Service: ERC20Service,
    private erc20FactoryService: ERC20FactoryService,
  ) {}

  /**
   * ERC20 컨트랙트 배포 RAW TX 요청
   */
  @Post('/create')
  createToken(@Body() body: CreateErc20Dto) {
    return this.erc20FactoryService.createTxData(body);
  }

  /**
   * ERC20 컨트랙트 조회
   */
  @Post('/address/get')
  getDeployedTokenAddress() {
    return this.erc20FactoryService.getDeployedTokenAddress();
  }

  /**
   * ERC20 ACTION RAW TX 요청
   * - transfer, mint
   */
  @Post('/actions')
  executeTokenAction(@Body() sendc20Dto: ActionERC20Token) {
    return this.erc20Service.actionTxData(sendc20Dto);
  }

  /**
   * ERC20  ATCH ACTION RAW TX 요청
   * - batchTransfer, batchMint
   */
  @Post('/batch-actions')
  batchMint(@Body() batchMintERC20Token: BatchMintERC20Token) {
    return this.erc20Service.batchActionTxData(batchMintERC20Token);
  }


  /**
   * ERC20 소각
   */
  @Post('/burn')
  burnToken(@Body()burnERC20Token: BurnErc20Token) {
    return this.erc20Service.burnTxData(burnERC20Token);
  }

  /**
   * ERC20 보유 잔액 조회
   */
  @Post('/balance/get')
  getBalanceOf(@Body() balanceErc20Token: BalanceErc20Token) {
    return this.erc20Service.getBalanceOf(balanceErc20Token);
  }

  /**
   * ERC20 총 공급량 조회
   */
  @Post('/totalSupply/get')
  getTotalSupply(@Body() totalSupplyErc20Token: TotalSupplyErc20Token) {
    return this.erc20Service.getTotalSupply(totalSupplyErc20Token);
  }

  // @Get('/functions')
  // getFunctions() {
  //   return this.erc20Service.getFunctions();
  // }
}
