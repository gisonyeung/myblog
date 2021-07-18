import { Application } from 'egg';
import { Document, Model } from 'mongoose';

export interface BlogDoc extends Document {
  blogId: number;
  title: string;
  summary: string;
  markdown: string;
  content: string;
  category: string;
  tags: string;
  views: number;
  likes: number;
  comments: number;
  createAt: number;
  updateAt: number;
  isPublic: boolean;
}

export interface BlogModel extends Model<BlogDoc> {
  findAllPublic(): any;
  findNewestOne(): any;
}

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const BlogSchema = new Schema<BlogDoc, BlogModel>({
    blogId: Number,
    title: String,
    summary: String,
    markdown: String,
    content: String,
    category: String,
    tags: String,
    views: Number,
    likes: Number,
    comments: Number,
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  });

  BlogSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createAt = this.updateAt = Date.now();
      this.views = 0;
      this.likes = 0;
      this.comments = 0;
      this.isPublic = true;
    } else {
      this.updateAt = Date.now();
    }
    next();
  });

  BlogSchema.statics = {
    findAllPublic() {
      return this
        .find({ isPublic: true }, { content: 0 })
        .sort('createAt');
    },
    findNewestOne() {
      return this
        .find()
        .sort({ createAt: -1 })
        .limit(1);
    },
  };

  return mongoose.model('Blog', BlogSchema);
};
