
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISkill {
    name: string;
    icon: string; // This will now be an image URL
    category: 'frontend' | 'backend' | 'others';
}

export interface Skill extends ISkill, Document {
    _id?: string;
}

const SkillSchema: Schema<Skill> = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true }, // URL to the icon image
    category: { type: String, enum: ['frontend', 'backend', 'others'], required: true },
}, {
    timestamps: true,
});

const SkillModel: Model<Skill> = mongoose.models.Skill || mongoose.model<Skill>('Skill', SkillSchema);

export default SkillModel;
