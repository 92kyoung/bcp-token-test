import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import * as fs from 'fs';
import { TxService } from 'src/transaction/tx.service';
import { TxDto } from 'src/transaction/dto/tx.dto';
import * as config from 'config';
import { CreateErc20Dto } from '../dto/create-erc20.dto';

@Injectable()
export class ERC20FactoryService implements OnModuleInit {
  onModuleInit() {}
  //TODO : 삭제예정
  private readonly serverConfig = config.get('factoryCA');

  private readonly tokenFactoryAddress = this.serverConfig.ft;

  constructor(private readonly txService: TxService) {}

  //utils로 분리
  private loadAbi(path: string) {
    return JSON.parse(fs.readFileSync(path, 'utf8')).abi;
  }
  // TODO: 삭제예정

  /**
   * ERC20 컨트랙트 배포 RAW TX 요청
   */
  async createTxData(createErc20Dto: CreateErc20Dto) {
    const provider = this.txService.getProvider();

    const { msgSender, name, symbol, initialSupply } = createErc20Dto;

    const abi = this.loadAbi(
      './hardhat/artifacts/contracts/ERC20Token.sol/ERC20TokenFactory.json',
    );

    const contract = new ethers.Contract(
      this.tokenFactoryAddress,
      abi,
      provider,
    );

    const deployData = contract.interface.encodeFunctionData('createNewToken', [
      msgSender,
      name,
      symbol,
      initialSupply,
    ]);

    return this.txService.signAndSend(
      provider,
      await this.txService.buildTx(
        msgSender,
        this.tokenFactoryAddress,
        deployData,
      ),
    );
  }

  // 배포된 토큰 주소 가져오기
  async getDeployedTokenAddress() {
    const provider = this.txService.getProvider();

    const abi = this.loadAbi(
      './hardhat/artifacts/contracts/ERC20Token.sol/ERC20TokenFactory.json',
    );

    const contract = new ethers.Contract(
      this.tokenFactoryAddress,
      abi,
      provider,
    );

    const deployedTokenAddress = await contract.getDeployedTokens();
    return deployedTokenAddress;
  }
}
