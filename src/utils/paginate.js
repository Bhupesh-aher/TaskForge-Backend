exports.paginate = (page = 1, limit = 10) => {
  const p = parseInt(page);
  const l = parseInt(limit);
  return {
    skip: (p - 1) * l,
    limit: l,
    page: p
  };
};


// Then you can import and use this in all controllers:

// const { skip, limit, page } = paginate(req.query.page, req.query.limit);