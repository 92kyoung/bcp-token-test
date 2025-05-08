import { IsNotEmpty } from "class-validator";

export class SendERC20Token {
    @IsNotEmpty()
    deployedTokenAddress: string;
    @IsNotEmpty()
    toAddress: string;
    @IsNotEmpty()
    amount: number;
    @IsNotEmpty()
    msgSender: string;
}