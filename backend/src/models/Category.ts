import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema: Schema<ICategory> = new Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Category name is required'],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, 'Category slug is required'],
        }
    },
    {
        timestamps: true,
    }
);

export const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
