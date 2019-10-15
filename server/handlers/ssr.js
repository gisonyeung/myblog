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
  let blogId = req.params.blogId;
  let _tpl = getHtmlTemplate();

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