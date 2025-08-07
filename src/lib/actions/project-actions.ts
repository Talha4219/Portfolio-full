
'use server';

import { cache } from 'react';
import dbConnect from '@/lib/db';
import ProjectModel, { type IProject } from '@/models/Project';
import { revalidatePath } from 'next/cache';

export const getProjects = cache(async () => {
    await dbConnect();
    // Sort by featured status first (descending), then by creation date (descending)
    const projects = await ProjectModel.find({}).sort({ featured: -1, createdAt: -1 });
    return JSON.parse(JSON.stringify(projects));
});

export const getProjectById = cache(async (id: string) => {
    await dbConnect();
    const project = await ProjectModel.findById(id);
    return JSON.parse(JSON.stringify(project));
});

export const getProjectBySlug = cache(async (slug: string) => {
    await dbConnect();
    const project = await ProjectModel.findOne({ slug });
    return JSON.parse(JSON.stringify(project));
});

export async function createProject(projectData: Partial<IProject>) {
    await dbConnect();
    const newProject = new ProjectModel(projectData);
    await newProject.save();
    revalidatePath('/admin/projects');
    revalidatePath('/');
}

export async function updateProject(id: string, projectData: Partial<IProject>) {
    await dbConnect();

    await ProjectModel.findByIdAndUpdate(id, projectData, { new: true });
    revalidatePath('/admin/projects');
    revalidatePath(`/admin/projects/edit/${id}`);
    revalidatePath('/');
    revalidatePath(`/projects/${projectData.slug}`);
}

export async function deleteProject(id: string) {
    await dbConnect();
    await ProjectModel.findByIdAndDelete(id);
    revalidatePath('/admin/projects');
    revalidatePath('/');
}
