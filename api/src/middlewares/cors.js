const cors = (req, res, next) => {
  const origin = req.headers.origin;

  if (process.env.ORIGINS_ALLOWED.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "S-CSRF-Token, Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
  }

  return next();
};
export default cors;
