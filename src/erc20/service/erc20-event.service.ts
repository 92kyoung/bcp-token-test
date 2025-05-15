import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import * as config from 'config';
import * as fs from 'fs';

@Injectable()
export class ERC20EventService implements OnModuleInit {
  onModuleInit() {
    this.createdTokenEventListener();
  }

  //utils로 분리
  private loadAbi(path: string) {
    return JSON.parse(fs.readFileSync(path, 'utf8')).abi;
  }
  private readonly serverConfig = config.get('factoryCA');

  private readonly tokenFactoryAddress = this.serverConfig.ft;

  // ERC20 토큰 생성 이벤트 리스너
  async createdTokenEventListener() {
    const provider = new ethers.JsonRpcProvider(
      'http://meta-net.hanati.co.kr:8545',
    );

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

        const data = {
          name: name,
          symbol: symbol,
          contractAddress: tokenAddress,
        };
      },
    );
  }

  //토큰 생성
  //토큰 민팅
  //토큰 전송

  //
}
