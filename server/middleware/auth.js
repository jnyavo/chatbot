const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = await jwt.verify(token, "codesecret");
      req.userId = decodedData?.id
    } else {
      decodedData = await jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    return res
      .status(403)
      .send({ error: { status: 403, message: "Access Denied" } });
  }
};
