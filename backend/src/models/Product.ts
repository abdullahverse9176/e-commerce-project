import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category?: string;
    stock?: number;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema: Schema<IProduct> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price cannot be negative'],
        },
        category: {
            type: String,
            trim: true,
            default: 'General',
        },
        stock: {
            type: Number,
            default: 0,
            min: [0, 'Stock cannot be negative'],
        },
        imageUrl: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
