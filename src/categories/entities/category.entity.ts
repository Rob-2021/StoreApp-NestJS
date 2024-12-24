import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Category extends Document{

    @Prop({
        required: true
    })
    name:string

    //one to many relationship
    // @Prop({type:[{type: String, ref:'Product'}], default:[]})
    // products: string[];

    //Referencia a la entidad User
    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    user_id: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);