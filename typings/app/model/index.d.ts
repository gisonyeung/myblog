// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/model/blog';

declare module 'egg' {
  interface IModel {
    Blog: ReturnType<typeof ExportBlog>;
  }
}
