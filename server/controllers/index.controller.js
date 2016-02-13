/**
 * Render the SPA index page
 * @param req
 * @param res
 */
exports.index = function(req, res) {
  res.sendFile('./client/index.html');
};

