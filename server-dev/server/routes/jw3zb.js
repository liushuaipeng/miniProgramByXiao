const router = require("koa-router")({
    prefix: "/jw3zb"
});
const co = require("co");

const Client = require("../jw3/zb/client");
const CONFIG = require("../jw3/config");
const client = new Client(CONFIG.APP_KEY, CONFIG.APP_SECRET);

router.get("/test", ctx => {
    ctx.state = {
        code: 1,
        data: {
            msg: "剑网3装备数据"
        }
    };
});

router.get("/list", async ctx => {
    var url = "http://api.j3pz.com/equip";
    var query = ctx.query;
    var result = await client.get(url, {
        query: query,
        headers: {
            accept: "application/json"
        }
    });
    ctx.state = {
        code: 1,
        data: {
            list: result.data
        }
    };
});
router.get("/detail/:id", async ctx => {
    var url = "http://api.j3pz.com/equip/" + ctx.params.id;
    var result = await client.get(url, {
        headers: {
            accept: "application/json"
        }
    });
    ctx.state = {
        code: 1,
        data: result.data
    };
});
module.exports = router;
