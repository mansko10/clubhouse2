function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).render("notAuthenticated");
  }
}

module.exports = { isAuthenticated };
