import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as fs from 'fs';
import { TxService } from 'src/transaction/tx.service';
import { CreateErc20Dto } from './dto/create-erc20.dto';

@Injectable()
export class ERC20Service {
  private readonly tokenFactoryAddress =
    '0xC269964695c44aF171508c61b151C3664d637a97';
  private readonly rpcURL = 'http://meta-net.hanati.co.kr:8545';
  private readonly from = '0x5a30d60885b5077bc95ad689ead806bb90e57ab4';

  constructor(private readonly txService: TxService) {}
  private getProvider() {
    return new ethers.JsonRpcProvider(this.rpcURL);
  }

  private loadAbi(path: string) {
    return JSON.parse(fs.readFileSync(path, 'utf8')).abi;
  }

  async createErc20Token(createErc20Dto: CreateErc20Dto) {
    const provider = this.getProvider();
    const abi = this.loadAbi('./src/token/abi/ERC20TokenFactory.json');
    const contract = new ethers.Contract(
      this.tokenFactoryAddress,
      abi,
      provider,
    );

    const deployData = contract.interface.encodeFunctionData('createNewToken', [
      createErc20Dto.msgSender,
      createErc20Dto.name,
      createErc20Dto.symbol,
    ]);

    const nonce = await provider.getTransactionCount(createErc20Dto.msgSender);
    const gas = await provider.estimateGas({
      from: createErc20Dto.msgSender,
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

  async mintErc20Token() {
    const provider = this.getProvider();
    const abi = this.loadAbi('./src/token/abi/ERC20Token.json');
    const contractAddress = '0xff7337FF5928a9Ba26Ff6EB90f7BE0fFF4303819';
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const data = contract.interface.encodeFunctionData('mint', [
      '0xf72d7fde41e29485785d1bdfe824a10ae1074fd0',
      18,
    ]);

    const nonce = await provider.getTransactionCount(this.from);
    const gas = await provider.estimateGas({
      from: this.from,
      to: contractAddress,
      data,
    });

    const tx = {
      from: this.from,
      to: contractAddress,
      gas: ethers.toBeHex(gas),
      gasPrice: ethers.toBeHex(0),
      nonce: ethers.toBeHex(nonce),
      data,
    };

    return this.txService.signAndSend(provider, tx);
  }

  async transferErc20Token(
    signer: string,
    toAddress: string,
    deployedTokenAddress: string,
    amount: number,
  ) {
    const provider = this.getProvider();
    const abi = this.loadAbi('./src/token/abi/ERC20Token.json');
    const contractAddress = deployedTokenAddress; // '0xff7337FF5928a9Ba26Ff6EB90f7BE0fFF4303819'
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const data = contract.interface.encodeFunctionData('transfer', [
      toAddress,
      amount,
    ]);

    const tx = {
      from: signer, //signer address
      to: contractAddress, //token contract

      data,
    };

    return this.txService.signAndSend(provider, tx);
  }
}
