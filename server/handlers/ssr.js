/**
 * 直出控制器
 */

const path = require('path');
const fs = require('fs');
const Blog = require('../models/Blog.js');
const SSR_PLACEHOLDER = '<!-- {{ssr}} -->';
let tpl = '';

function getHtmlTemplate() {
  if (tpl) return tpl;
  tpl = fs.readFileSync(path.resolve(__dirname, '../app/entry.html'), 'utf-8');
  return tpl;
}

exports.blog = function(req, res) {
  getHtmlTemplate();
  let blogId = req.params.blogId;

  if (/[^0-9]/.test(blogId)) {
    return res.status(200).send(tpl);
  }

  Blog.findByBlogId(parseInt(blogId, 10), function (err, blog) {

    if (err) {
      return res.status(200).send(tpl);
    }

    if (!blog) {
      return res.status(200).send(tpl);
    }

    res.status(200).send(
      tpl
        .replace('<title>杨子聪的个人博客</title>', `<title>${blog.title}</title>`)
        .replace('content="杨子聪的个人博客">', `content="${blog.summary}">`)
        .replace(SSR_PLACEHOLDER, `
          <article class="content" style="display:none">
            <h1 class="title">${blog.title}</h1>
            ${blog.content}
          </article>
        `)
    );
  });

};

exports.home = function(req, res) {
  getHtmlTemplate();
  let page = req.query.page;

  if (!page || /[^0-9]/.test(page)) {
    page = 1;
  }

  Blog.fetchByPage(parseInt(page, 10), function (err, blogs) {

    if (err) {
      return errorHandler(err, res);
    }

    let ssrContent = '';

    blogs.forEach((blog) => {
      ssrContent += `
      <article class="blog-item shadow-1">
          <h1 class="title" title="查看全文"><a href="http://yangzicong.com/article/${blog.blogId}">${blog.title}</a><div class="border"></div></h1>
          <div class="subtitle"><span><i class="icon icon-time" title="发表时间: ${blog.time.createAt}"></i><time>${blog.time.createAt}</time></span><span><i class="icon icon-update" title="最后更新时间: ${blog.time.updateAt}"></i><time>${blog.time.updateAt}</time></span><span title="分类">${blog.category}</span>
          </div>
          <p class="summary">${blog.summary}</p>
          <footer class="details clearfix">
              <div class="tags"><span class="icon icon-tag" title="标签"></span>
                  <ul class="tags-list">
                      <li><span>${blog.tags}</span></li>
                  </ul>
              </div>
              <div class="summation"><span>阅读(${blog.numbers.view})</span><span>评论<(${blog.numbers.comment})</span><a class="article-link" title="查看全文" href="http://yangzicong.com/article/${blog.blogId}">全文链接 »</a>
              </div>
          </footer>
      </article>
      `
    });

    res.status(200).send(
      tpl.replace(SSR_PLACEHOLDER, 
        `<div class="content" style="display:none">
          ${ssrContent}
        </div>`
      )
    );
  
  });

}