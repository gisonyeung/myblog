import { Context } from 'egg';

const extend = {
  res: {
    resolve(data: any) {
      return {
        retcode: 0,
        retmsg: 'success',
        data,
      };
    },
    reject(msg: string, code = -1) {
      return {
        retcode: code,
        retmsg: msg,
        data: null,
      };
    },
  },
  validate: {
    notEmptyStr(ctx: Context, data: string, type: string) {
      if (!data || typeof data !== 'string' || !/\S/.test(data)) {
        ctx.body = extend.res.reject(`${type} 不能为空`);
        return true;
      }

      return false;
    },
    title(ctx: Context, data: string) {
      if (!data || !/\S/.test(data)) {
        ctx.body = extend.res.reject('标题不能为空');
        return true;
      }

      return false;
    },

  },
};

module.exports = extend;
