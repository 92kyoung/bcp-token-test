import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import axios from 'axios';
import * as config from 'config';

@Injectable()
export class TxService {
  private readonly serverConfig = config.get('url');

  //utils로 분리
  public getProvider() {
    return new ethers.JsonRpcProvider(this.serverConfig.mainNet);
  }
  public async signAndSend(provider: ethers.JsonRpcProvider, tx: any) {
    const { data: signedResponse } = await axios.post(
      this.serverConfig.web3Signer,
      {
        jsonrpc: '2.0',
        method: 'eth_signTransaction',
        id: 1,
        params: [tx],
      },
    );

    if (signedResponse.error) {
      console.error('Web3Signer error:', signedResponse.error);
      throw new Error('Signing failed');
    }

    const signedTx = signedResponse.result;
    const txHash = await provider.send('eth_sendRawTransaction', [signedTx]);
    return await provider.waitForTransaction(txHash, 1, 15000);
  }
}
