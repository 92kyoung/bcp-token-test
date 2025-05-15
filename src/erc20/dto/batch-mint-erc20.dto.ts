import { IsNotEmpty, Validate } from 'class-validator';
import { IsTokenTxType } from 'src/transaction/pipe/toekn-tx-type-validation.pipe';

export class BatchMintERC20Token {
  @IsNotEmpty()
  tokenAddress: string;
  @IsNotEmpty()
  toAddresses: string[];
  @IsNotEmpty()
  amounts: number[];
  @IsNotEmpty()
  msgSender: string;
  @IsNotEmpty()
  @Validate(IsTokenTxType)
  sendTxType: string;
}
