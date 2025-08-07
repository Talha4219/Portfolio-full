
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAbout {
    name: string;
    headshot: string;
    heroImage: string;
    bio: string;
    resumeUrl: string;
}

export interface About extends IAbout, Document {
    _id?: string;
}

const AboutSchema: Schema<About> = new mongoose.Schema({
    name: { type: String, required: true },
    headshot: { type: String, required: true, default: 'https://placehold.co/250x250.png' },
    heroImage: { type: String, default: 'https://placehold.co/600x600.png' },
    bio: { type: String, required: true },
    resumeUrl: { type: String },
}, {
    timestamps: true,
});

const AboutModel: Model<About> = mongoose.models.About || mongoose.model<About>('About', AboutSchema);

export default AboutModel;
