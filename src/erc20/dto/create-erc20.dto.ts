import { IsNotEmpty, IsString } from "class-validator";
import { ERC20Status } from "../erc20.model";

export class CreateErc20Dto {
    @IsNotEmpty()
    @IsString()
    msgSender: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    symbol: string;
    status: ERC20Status;
    initialSupply: number;
}