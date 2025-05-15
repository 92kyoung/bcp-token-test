import { IsNotEmpty } from "class-validator";

export class BurnErc20Token {
    @IsNotEmpty()
    tokenAddress : string;
    @IsNotEmpty()
    msgSender : string
    @IsNotEmpty()
    amount : number
}