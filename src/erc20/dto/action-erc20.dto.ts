import { IsNotEmpty, Validate } from 'class-validator';
import { IsTokenTxType } from '../../transaction/pipe/toekn-tx-type-validation.pipe';

export class ActionERC20Token {
  @IsNotEmpty()
  tokenAddress: string;
  @IsNotEmpty()
  toAddress: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  msgSender: string;
  @Validate(IsTokenTxType)
  sendTxType: string;
}
