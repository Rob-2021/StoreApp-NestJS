import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Category extends Document{

    @Prop({
        required: true
    })
    name:string

    //one to many relationship
    @Prop({type:[{type: String, ref:'Product'}], default:[]})
    products: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);