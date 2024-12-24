import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
    //id lo crea mongo
    @Prop({
        unique: true,
        index: true,
        required: true
    })
    name: string;s

    @Prop({
        required: true
    })
    product_date: Date;

    @Prop({
        required: true
    })
    expiration_date: Date;

    @Prop({
        required: true
    })
    stock: number;

    @Prop({
        required: true
    })
    price: number;

    tags: string[];//image

    //Referencia a la entidad User
    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    user_id: Types.ObjectId;

    //Referencia a la entidad Categoria
    @Prop({type: Types.ObjectId, ref: 'Category', required: true})
    category_id: Types.ObjectId;

    //one to many relationship
    // @Prop({type:[{type: Types.ObjectId, ref:'Category'}], default:[]})
    // categories: Types.ObjectId;

    //one to many relationship
    // @Prop({type:[{type: Types.ObjectId, ref:'Supply'}], default:[]})
    // supplies: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);