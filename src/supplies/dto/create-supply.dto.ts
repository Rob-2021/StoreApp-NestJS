import { Type } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from "class-validator";
import { Types } from "mongoose";

export class CreateSupplyDto {
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    date: Date;
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    //user_id
    @IsOptional()
    @ValidateIf((obj, value) => typeof value === 'string' || value instanceof Types.ObjectId)
    @IsMongoId()
    user_id?: string | Types.ObjectId;

    //product_id
    @IsOptional()
    @ValidateIf((obj, value) => typeof value === 'string' || value instanceof Types.ObjectId)
    @IsMongoId()
    product_id?: string | Types.ObjectId;

    //provisioner_id
    @IsOptional()
    @ValidateIf((obj, value) => typeof value === 'string' || value instanceof Types.ObjectId)
    @IsMongoId()
    provisioner_id?: string | Types.ObjectId;
}
