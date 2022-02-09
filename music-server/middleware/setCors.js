function setCors(req, res, next) {
  // 配置cors跨域
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Max-Age", 100);
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
}
module.exports = setCors;
