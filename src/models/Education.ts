
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IEducation {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description?: string;
    logo?: string;
}

export interface Education extends IEducation, Document {
    _id?: string;
}

const EducationSchema: Schema<Education> = new mongoose.Schema({
    school: { type: String, required: true },
    degree: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String },
    logo: { type: String },
}, {
    timestamps: true,
});

const EducationModel: Model<Education> = mongoose.models.Education || mongoose.model<Education>('Education', EducationSchema);

export default EducationModel;
