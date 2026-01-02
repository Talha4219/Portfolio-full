
'use server';

import { cache } from 'react';
import dbConnect from '@/lib/db';
import ProjectModel, { type IProject } from '@/models/Project';
import { revalidatePath } from 'next/cache';

export const getProjects = cache(async () => {
    try {
        await dbConnect();
        // Sort by featured status first (descending), then by creation date (descending)
        const projects = await ProjectModel.find({}).sort({ featured: -1, createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw new Error('Failed to fetch projects.');
    }
});

export const getProjectById = cache(async (id: string) => {
    try {
        await dbConnect();
        const project = await ProjectModel.findById(id).lean();
        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        console.error(`Failed to fetch project with id ${id}:`, error);
        throw new Error('Failed to fetch project.');
    }
});

export const getProjectBySlug = cache(async (slug: string) => {
    try {
        await dbConnect();
        const project = await ProjectModel.findOne({ slug }).lean();
        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        console.error(`Failed to fetch project with slug ${slug}:`, error);
        throw new Error('Failed to fetch project.');
    }
});

export async function createProject(projectData: Partial<IProject>) {
    try {
        await dbConnect();
        const newProject = new ProjectModel(projectData);
        await newProject.save();
        revalidatePath('/admin/projects');
        revalidatePath('/');
    } catch (error) {
        console.error('Failed to create project:', error);
        throw new Error('Failed to create project.');
    }
}

export async function updateProject(id: string, projectData: Partial<IProject>) {
    try {
        await dbConnect();

        await ProjectModel.findByIdAndUpdate(id, projectData, { new: true });
        revalidatePath('/admin/projects');
        revalidatePath(`/admin/projects/edit/${id}`);
        revalidatePath('/');
        revalidatePath(`/projects/${projectData.slug}`);
    } catch (error) {
        console.error(`Failed to update project with id ${id}:`, error);
        throw new Error('Failed to update project.');
    }
}

export async function deleteProject(id: string) {
    try {
        await dbConnect();
        await ProjectModel.findByIdAndDelete(id);
        revalidatePath('/admin/projects');
        revalidatePath('/');
    } catch (error) {
        console.error(`Failed to delete project with id ${id}:`, error);
        throw new Error('Failed to delete project.');
    }
}
