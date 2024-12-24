import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Supply extends Document {
    //id lo crea mongo
    @Prop({
        required: true
    })
    date: Date;

    @Prop({
        required: true
    })
    amount: number;

    //Referencia a la entidad User
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    //Referencia a la entidad Product
    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product_id: Types.ObjectId;

    //Referencia a la entidad provisioner
    @Prop({ type: Types.ObjectId, ref: 'Provisioner', required: true })
    provisioner_id: Types.ObjectId;
}

export const SupplySchema = SchemaFactory.createForClass(Supply);
