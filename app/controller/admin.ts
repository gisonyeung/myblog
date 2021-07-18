import { Controller } from 'egg';
import _ from 'lodash';

export default class AdminController extends Controller {
  public async publishBlog() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    // body.needNotification,

    const schemaData = {
      title: body.title,
      category: body.category,
      summary: body.summary,
      tags: body.tags || '',
      content: body.content,
      markdown: body.markdown,
    };

    if (
      app.validate.notEmptyStr(ctx, schemaData.title, 'title')
      || app.validate.notEmptyStr(ctx, schemaData.category, 'category')
      || app.validate.summary(ctx, schemaData.summary, 'summary')
      || app.validate.notEmptyStr(ctx, schemaData.content, 'content')
    ) {
      return;
    }

    try {
      const newestBlog = await ctx.model.Blog.findNewestOne();
      const blogId = newestBlog ? (newestBlog[0].blogId + 1) : 1;

      await new ctx.model.Blog({
        blogId,
        ...schemaData,
      }).save();

      // 更新分类
      const category = await ctx.model.Category.findByName(schemaData.category);
      if (!category) {
        await new ctx.model.Category({
          name: schemaData.category,
          blogs: [ blogId ],
        }).save();
      } else {
        _.pull(category.blogs, blogId).push(blogId);
        await category.save();
      }

      // 更新标签
      const tags = schemaData.tags.split(',');
      _.each((tags), async (name) => {
        const tag = await ctx.model.Tag.findByName(name);
        if (!tag) {
          await new ctx.model.Tag({
            name,
            blogs: [ blogId ],
          }).save();
        } else {
          _.pull(tag.blogs, blogId).push(blogId);
          tag.save();
        }
      });

      // TODO 发送优剪

      // 成功
      ctx.body = app.res.resolve({
        blogId,
        url: `/article/${blogId}`,
      });
    } catch (err) {
      ctx.body = app.res.reject('数据库操作异常');
    }
  }
}
