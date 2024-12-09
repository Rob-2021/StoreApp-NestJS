import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    toJSON:{
        transform:(doc, ret)=>{
            delete ret.password;
            return ret;
        }
    }
})
export class User extends Document {
    @Prop({
        required: true,
        unique: true
    })
    fullName: string;
    @Prop({
        required: true,
        unique: true
    })
    email: string;
    @Prop({
        required: true,
        select: false
    })
    password: string;
    @Prop({
        default: true
    })
    isActive: boolean;
    @Prop({
        type: [String],
        default: ['user']
    })
    role: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);