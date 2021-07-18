import { Application } from 'egg';
import { Document, Model } from 'mongoose';

export interface CategoryDoc extends Document {
  name: number;
  blogs: any[];
  createAt: number;
  updateAt: number;
}

export interface CategoryModel extends Model<CategoryDoc> {
  findByName(name: string): any;
  findAll(): any;
  findNewestOne(): any;
}

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const CategorySchema = new Schema<CategoryDoc, CategoryModel>({
    name: String,
    blogs: {
      type: Array,
      default: [],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  });

  CategorySchema.pre('save', function(next) {
    if (this.isNew) {
      this.createAt = this.updateAt = Date.now();
    } else {
      this.updateAt = Date.now();
    }
    next();
  });

  CategorySchema.statics = {
    findByName(name) {
      return this
        .find({ name });
    },
    findAll() {
      return this
        .find()
        .sort({ createAt: 1 });
    },
    findNewestOne() {
      return this
        .find()
        .sort({ createAt: -1 })
        .limit(1);
    },
  };

  return mongoose.model('Category', CategorySchema);
};
