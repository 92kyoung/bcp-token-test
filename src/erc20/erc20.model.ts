export interface Erc20Token {
    name: string;
    symbol: string;
    totalSupply: number;
    decimals: number;
    contractAddress: string;
    status : ERC20Status;
}

export enum ERC20Status {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC',
}