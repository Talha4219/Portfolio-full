
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IMessage {
    name: string;
    email: string;
    message: string;
    read: boolean;
}

export interface Message extends IMessage, Document {
    _id?: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
}, {
    timestamps: true,
});

const MessageModel: Model<Message> = mongoose.models.Message || mongoose.model<Message>('Message', MessageSchema);

export default MessageModel;
