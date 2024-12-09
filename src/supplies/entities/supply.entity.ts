import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Supply extends Document{
    //id lo crea mongo
    @Prop({
        required: true
    })
    date: Date;

    @Prop({
        required: true
    })
    amount: number;
}

export const SupplySchema = SchemaFactory.createForClass(Supply);
