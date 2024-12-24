import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
class Contact {
    @Prop({
        required: true
    })
    cell_phone: number;

    @Prop({
        required: true
    })
    email: string;

    @Prop({
        required: true
    })
    address: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

@Schema()
export class Provisioner extends Document {
    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true
    })
    lastname: string;

    @Prop({
        type: ContactSchema,
        required: true
    })
    contact: Contact;

    //Referencia a la entidad User
    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    user_id: Types.ObjectId;
}

export const ProvisionerSchema = SchemaFactory.createForClass(Provisioner);
