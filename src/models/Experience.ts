
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IExperience {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description?: string;
    logo?: string;
}

export interface Experience extends IExperience, Document {
    _id?: string;
}

const ExperienceSchema: Schema<Experience> = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String },
    logo: { type: String },
}, {
    timestamps: true,
});

const ExperienceModel: Model<Experience> = mongoose.models.Experience || mongoose.model<Experience>('Experience', ExperienceSchema);

export default ExperienceModel;
