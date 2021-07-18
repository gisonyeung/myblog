import { Application } from 'egg';
import { Document, Model } from 'mongoose';

export interface TagDoc extends Document {
  name: number;
  blogs: any[];
  createAt: number;
  updateAt: number;
}

export interface TagModel extends Model<TagDoc> {
  findByName(name: string): any;
  findAll(): any;
  findNewestOne(): any;
}

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const TagSchema = new Schema<TagDoc, TagModel>({
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

  TagSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createAt = this.updateAt = Date.now();
    } else {
      this.updateAt = Date.now();
    }
    next();
  });

  TagSchema.statics = {
    findByName(name) {
      return this
        .find({ name });
    },
    findAll() {
      return this
        .find()
        .sort({ createAt: 1 });
    },
  };

  return mongoose.model('Tag', TagSchema);
};
