import { IsNotEmpty } from "class-validator";

export class BalanceErc20Token {
    @IsNotEmpty()
    tokenAddress : string;
    @IsNotEmpty()
    holderAddress : string
}