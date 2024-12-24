import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { Types } from "mongoose";

class ContactDto{
    @IsNumber()
    @IsNotEmpty()
    cell_phone: number;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    address: string;
}

export class CreateProvisionerDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    lastname: string;
    @IsNotEmpty()
    contact: ContactDto;

    //user_id
    @IsOptional()
    @ValidateIf((obj, value) => typeof value === 'string' || value instanceof Types.ObjectId)
    @IsMongoId()
    user_id?: string | Types.ObjectId;
}
