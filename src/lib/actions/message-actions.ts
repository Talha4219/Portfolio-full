
'use server';

import dbConnect from '@/lib/db';
import MessageModel, { type IMessage } from '@/models/Message';
import { revalidatePath } from 'next/cache';

export async function createMessage(messageData: IMessage) {
    await dbConnect();
    const newMessage = new MessageModel(messageData);
    await newMessage.save();
}

export async function getMessages() {
    await dbConnect();
    const messages = await MessageModel.find({}).sort({ createdAt: -1 });
    return messages;
}

export async function updateMessageStatus(id: string, read: boolean) {
    await dbConnect();
    await MessageModel.findByIdAndUpdate(id, { read });
    revalidatePath('/admin/messages');
}

export async function deleteMessage(id: string) {
    await dbConnect();
    await MessageModel.findByIdAndDelete(id);
    revalidatePath('/admin/messages');
}
