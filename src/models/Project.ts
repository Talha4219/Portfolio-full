
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProject {
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    images: string[];
    body: string;
    links: {
        github?: string;
        live?: string;
    };
    tags: string[];
    featured?: boolean;
}

// Add _id for querying
export interface Project extends IProject, Document {
    _id?: string;
}

const ProjectSchema: Schema<Project> = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true, default: 'https://placehold.co/600x400.png' },
    images: { type: [String], default: ['https://placehold.co/1200x800.png'] },
    body: { type: String, required: true },
    links: {
        github: { type: String },
        live: { type: String },
    },
    tags: { type: [String], required: true },
    featured: { type: Boolean, default: false },
}, {
    timestamps: true,
});

const ProjectModel: Model<Project> = mongoose.models.Project || mongoose.model<Project>('Project', ProjectSchema);

export default ProjectModel;
