import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import * as fs from 'fs';
import { TxService } from 'src/transaction/tx.service';
import { ActionERC20Token } from '../dto/action-erc20.dto';
import { BalanceErc20Token } from '../dto/balance-erc20.dto';
import { BatchMintERC20Token } from '../dto/batch-mint-erc20.dto';
import { BurnErc20Token } from '../dto/burn-erc20.dto';
import { TotalSupplyErc20Token } from '../dto/totalSupply-erc20.dto';

@Injectable()
export class ERC20Service implements OnModuleInit {
  onModuleInit() {}
  constructor(private readonly txService: TxService) {}

  //utils로 분리
  private loadAbi(path: string) {
    return JSON.parse(fs.readFileSync(path, 'utf8')).abi;
  }
  // TODO: 삭제예정
  private readonly abi = this.loadAbi(
    './hardhat/artifacts/contracts/ERC20token.sol/ERC20Token.json',
  );

  /**
   * ERC20 Batch Action RAW TX 요청
   * - batchTransfer, batchMint
   */
  async batchActionTxData(batchMintERC20Token: BatchMintERC20Token) {
    const provider = this.txService.getProvider();
    const { tokenAddress, toAddresses, amounts, msgSender, sendTxType } =
      batchMintERC20Token;
    const contract = new ethers.Contract(tokenAddress, this.abi, provider);

    const deployData = contract.interface.encodeFunctionData(sendTxType, [
      toAddresses,
      amounts,
    ]);

    // return deployData;

    return this.txService.signAndSend(
      provider,
      await this.txService.buildTx(msgSender, tokenAddress, deployData),
    );
  }

  /**
   * ERC20 Action RAW TX 요청
   * - transfer, mint
   */
  async actionTxData(sendERC20Token: ActionERC20Token) {
    const { tokenAddress, toAddress, amount, msgSender, sendTxType } =
      sendERC20Token;
    const provider = this.txService.getProvider();

    const contractAddress = tokenAddress; //'0xff7337FF5928a9Ba26Ff6EB90f7BE0fFF4303819'
    const contract = new ethers.Contract(contractAddress, this.abi, provider);

    const deployData = contract.interface.encodeFunctionData(sendTxType, [
      toAddress,
      amount,
    ]);

    return this.txService.signAndSend(
      provider,
      await this.txService.buildTx(msgSender, tokenAddress, deployData),
    );

    // return this.txService.buildTx(
    //   msgSender,
    //   tokenAddress,
    //   deployData,
    // );
  }

  /**
   * ERC20 Burn 요청
   */
  async burnTxData(burnERC20Token: BurnErc20Token) {
    const { tokenAddress, amount, msgSender } = burnERC20Token;
    const provider = this.txService.getProvider();

    const contractAddress = tokenAddress; //'0xff7337FF5928a9Ba26Ff6EB90f7BE0fFF4303819'
    const contract = new ethers.Contract(contractAddress, this.abi, provider);

    const deployData = contract.interface.encodeFunctionData('burn', [amount]);

    return this.txService.signAndSend(
      provider,
      await this.txService.buildTx(msgSender, tokenAddress, deployData),
    );
  }

  /**
   * ERC20 잔액 조회
   */
  async getBalanceOf(balanceErc20Token: BalanceErc20Token) {
    const { tokenAddress, holderAddress } = balanceErc20Token;
    const provider = this.txService.getProvider();

    const contract = new ethers.Contract(tokenAddress, this.abi, provider);

    const balance: ethers.BigNumberish =
      await contract.balanceOf(holderAddress);

    // TODO :db 조회로 수정필요
    const decimal = 18;
    return ethers.formatUnits(balance, decimal);
  }

  /**
   * ERC20 total supply 조회
   */
  // 서비스 메서드
  async getTotalSupply(
    totalSupplyErc20Token: TotalSupplyErc20Token,
  ): Promise<string> {
    const provider = this.txService.getProvider();

    const { tokenAddress, msgSender } = totalSupplyErc20Token;
    const tokenContract = new ethers.Contract(tokenAddress, this.abi, provider);
    const [rawSupply, decimals] = await Promise.all([
      tokenContract.totalSupply(),
      tokenContract.decimals(),
    ]);

    const humanReadableSupply = ethers.formatUnits(rawSupply, decimals);

    return humanReadableSupply;
  }

  // async getFunctions() {
  //   const abi = this.loadAbi(
  //     './hardhat/artifacts/contracts/ERC20Token.sol/ERC20Token.json',
  //   );
  //   const functions = {};
  //   // ABI 내 함수들에 대해 순회
  //   abi.forEach((item) => {
  //     if (item.type === 'function') {
  //       const functionName = item.name;
  //       const inputs = item.inputs.map((input) => ({
  //         name: input.name,
  //         type: input.type,
  //       }));

  //       // 함수 이름을 키로, 함수의 인자 정보 배열을 값으로 저장
  //       functions[functionName] = inputs;
  //     }
  //   });
  //   return functions;
  // }
}
