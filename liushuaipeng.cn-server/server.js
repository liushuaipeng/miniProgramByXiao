const express = require("express");
const request = require("superagent");
const app = express();

app.get("/v2/movie/*", (req, res) => {
    var html = "";
    request.get("https://api.douban.com" + req.originalUrl).end((err, data) => {
        if (err) {
            res.json({ code: "fail", message: "服务" });
        } else {
            res.json(data.body);
        }
    });
});

app.listen(3000, err => console.log("正在运行..."));
