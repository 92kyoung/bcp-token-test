import { IsNotEmpty, IsString } from "class-validator";

export class CreateErc20Dto {
    @IsNotEmpty()
    @IsString()
    msgSender: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    symbol: string;
    initialSupply: number;
}