const router = require("koa-router")({
  prefix: "/jw3home"
});
const co = require("co");
const axios = require("axios");
router.get("/test", ctx => {
  ctx.state = {
    code: 1,
    data: {
      msg: "剑网3装备数据"
    }
  };
});
router.get("/article/list/:type", async ctx => {
  var originalUrl = ctx.url.substr(16);
  var res = await axios.get('http://liushuaipeng.cn:8080/jw3/home' + originalUrl)
  ctx.state = {
    code: 1,
    data: res.data
  }
});
router.get("/article/detail", async ctx => {
  var originalUrl = ctx.url.substr(16);
  var res = await axios.get('http://liushuaipeng.cn:8080/jw3/home' + originalUrl)
  ctx.state = {
    code: 1,
    data: res.data
  }
});
module.exports = router;
