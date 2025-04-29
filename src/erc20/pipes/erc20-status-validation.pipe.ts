import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ERC20Status } from "../erc20.model";

//ERC20 상태값 검증을 위한 커스텀 파이프
export class Erc20StatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        ERC20Status.PRIVATE,
        ERC20Status.PUBLIC 
    ]
    
    transform(value: any, metadata : ArgumentMetadata) {
        value = value.toUpperCase(); // 대문자로 변환
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}는 유효하지 않는 상태값입니다"`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.StatusOptions.indexOf(status);
        return idx !== -1;
    }
}