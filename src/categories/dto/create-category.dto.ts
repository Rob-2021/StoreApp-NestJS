import { IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { Types } from "mongoose";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string

    // //user_id
    @IsOptional()
    @ValidateIf((obj, value) => typeof value === 'string' || value instanceof Types.ObjectId)
    @IsMongoId()
    user_id?: string | Types.ObjectId;
}
