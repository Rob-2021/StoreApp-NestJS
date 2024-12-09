import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
    //id lo crea mongo
    @Prop({
        unique: true,
        index: true,
        required: true
    })

    @Prop({
        required: true
    })
    name: string;

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
}

export const ProductSchema = SchemaFactory.createForClass(Product);