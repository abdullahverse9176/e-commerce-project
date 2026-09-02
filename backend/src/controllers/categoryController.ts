import { Request, Response } from 'express';
import slugify from 'slugify';
import Category from '../models/Category';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    const category = new Category({
      name:name,
      slug:slugify(name,{lower:true,trim:true})
    });

    const savedCategory = await category.save();

    res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
 try {
    const categories = await Category.find({}).sort({createdAt:-1});
    
    res.status(200).json({ success: true, data: categories });

 } catch (error) {
  res.status(500).json({ success: false, message: (error as Error).message });
 }
};

export const getSingleCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if(!category){
      res.status(404).json({success:false,message:'Category not found'});
    }
    res.status(200).json({success:true,data:category});
  } catch (error) {
    
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try{
    const id = req.params.id; 
    const category = await Category.findByIdAndDelete(id);
    if(!category){
      res.status(404).json({success:false,message:'Category not found'});
    }
    res.status(200).json({success:true,data:category});
  }catch(error){
    res.status(500).json({success:false,message:(error as Error).message});
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try{  
    const id = req.params.id;  
    const {name} = req.body;
    const category = await Category.findByIdAndUpdate(id,{name:name,slug:slugify(name,{lower:true,trim:true})});
    if(!category){
      res.status(404).json({success:false,message:'Category not found'});
    }
    res.status(200).json({success:true,data:category});
  }catch(error){
    res.status(500).json({success:false,message:(error as Error).message});
  }
};