import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import * as fs from 'fs';
import { TxService } from 'src/transaction/tx.service';
import { CreateErc20Dto } from './dto/create-erc20.dto';
import { PrismaService } from 'prisma/prisma.service';
import { SendERC20Token } from './dto/send-erc20.dto';
import * as config from 'config';

@Injectable()
export class ERC20Service implements OnModuleInit {
  onModuleInit() {
    this.createdTokenEventListener();
  }
  private readonly serverConfig = config.get('contract');

  private readonly tokenFactoryAddress = this.serverConfig.factory;

  constructor(
    private readonly txService: TxService,
    private prisma: PrismaService,
  ) {}
  //utils로 분리
  private loadAbi(path: string) {
    return JSON.parse(fs.readFileSync(path, 'utf8')).abi;
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

  // ER20 토큰 생성
  async createErc20Token(createErc20Dto: CreateErc20Dto) {
    const provider = this.txService.getProvider();

    const { msgSender, name, symbol, initialSupply } = createErc20Dto;

    console.log('createToken');

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

    const nonce = await provider.getTransactionCount(createErc20Dto.msgSender);
    const gas = await provider.estimateGas({
      from: msgSender,
      to: this.tokenFactoryAddress,
      data: deployData,
    });

    const tx = {
      from: createErc20Dto.msgSender,
      to: this.tokenFactoryAddress,
      gas: ethers.toBeHex(gas),
      gasPrice: ethers.toBeHex(0),
      nonce: ethers.toBeHex(nonce),
      data: deployData,
    };
    return this.txService.signAndSend(provider, tx);
  }

  async sendErc20Token(sendERC20Token: SendERC20Token, sendTxType: string) {
    const { deployedTokenAddress, toAddress, amount, msgSender } =
      sendERC20Token;

    const provider = this.txService.getProvider();

    const abi = this.loadAbi('./src/token/abi/ERC20Token.json');
    const contractAddress = deployedTokenAddress; //'0xff7337FF5928a9Ba26Ff6EB90f7BE0fFF4303819'
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const data = contract.interface.encodeFunctionData(sendTxType, [
      toAddress,
      amount,
    ]);

    const nonce = await provider.getTransactionCount(msgSender);
    const gas = await provider.estimateGas({
      from: msgSender,
      to: deployedTokenAddress,
      data,
    });

    const tx = {
      from: msgSender,
      to: contractAddress,
      gas: ethers.toBeHex(gas),
      gasPrice: ethers.toBeHex(0),
      nonce: ethers.toBeHex(nonce),
      data,
    };

    return this.txService.signAndSend(provider, tx);
  }

  // ERC20 토큰 생성 이벤트 리스너
  async createdTokenEventListener() {
    const provider = new ethers.JsonRpcProvider(
      'http://meta-net.hanati.co.kr:8545',
    );

    // const provider = new ethers.WebSocketProvider(
    //   'ws://meta-net.hanati.co.kr:8545',
    // );
    

    const abi = this.loadAbi(
      './hardhat/artifacts/contracts/ERC20Token.sol/ERC20TokenFactory.json',
    );
    const contract = new ethers.Contract(
      this.tokenFactoryAddress,
      abi,
      provider,
    );
    
    // 기존 리스너 제거(중복방지)
    contract.removeAllListeners('TokenCreated');
    
    contract.on(
      'TokenCreated',
      async (
        tokenAddress: string,
        name: string,
        symbol: string,
        initialSupply: number,
      ) => {
        console.log(`Token created: ${tokenAddress}`);
        await this.prisma.erc20token.create({
          data: {
            name: name,
            symbol: symbol,
            contractAddress: tokenAddress,
          },
        });
      },
    );
  }
}
