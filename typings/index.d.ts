import 'egg';
import { BlogModel } from '../app/model/blog';
import { CategoryModel } from '../app/model/category';
import { TagModel } from '../app/model/tag';

declare module 'egg' {
  interface MongooseModels {
    Blog: BlogModel;
    Category: CategoryModel;
    Tag: TagModel;
  }
  interface Application {
    res: {
      resolve<T>(data: any): (data: T) => { retcode: number, retmsg: string, data: T },
      reject<T,P>(msg: string, code?: number): (msg: T, code?: P) => { retcode: P, retmsg: T, data: any }
    },
    validate: {
      [method: string]: (ctx: any, data: any, type?: string) => boolean
    },
  }
};
