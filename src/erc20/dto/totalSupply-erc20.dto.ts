import { IsNotEmpty } from "class-validator";

export class TotalSupplyErc20Token {
    @IsNotEmpty()
    tokenAddress: string;
    @IsNotEmpty()
    msgSender: string;
}