import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateSupplyDto {
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    date: Date;
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
