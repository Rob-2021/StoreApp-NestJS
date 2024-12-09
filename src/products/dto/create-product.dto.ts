import { Type } from "class-transformer";
import { IsArray, IsDate, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    name: string;
    @Type(() => Date)
    @IsDate()
    product_date: Date;
    @Type(() => Date)
    @IsDate()
    expiration_date: Date;
    @IsInt()
    @IsPositive()
    @Min(0.1)
    stock: number;
    @IsInt()
    @IsPositive()
    @Min(0.1)
    price: number;
    @IsArray()
    @IsString({ each: true })
    tags: [string];
}
