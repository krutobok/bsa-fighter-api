const responseMiddleware = (req, res, next) => {
  if (res.err) {
    const status = res.err.status || 400
    return res.status(status).json({
      error: true,
      message: res.err.message || 'Internal Server Error',
    })
  }

  if (res.data) {
    return res.status(200).json(res.data)
  }

  next()
}

export { responseMiddleware }
