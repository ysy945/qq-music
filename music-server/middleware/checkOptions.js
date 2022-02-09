function checkOptions(req, res, next) {
  // 如果是option请求直接通过
  if (req.method.toLowerCase() === "options") {
    res.status(200).send();
  }
  // 不是options请求就向下执
  else {
    next();
  }
}
module.exports = checkOptions;
