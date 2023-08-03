const cacheHeaders = (req, res, next) => {
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  next();
};

export default cacheHeaders;
