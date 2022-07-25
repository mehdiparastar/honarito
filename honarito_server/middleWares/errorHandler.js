module.exports = (error, req, res, next) => {
    try {
        console.log(error)
        const status = error.statusCode || 500
        const message = error.message || 'server Error'
        const errors = error.errors || []
        const data = error.data
        return res.status(status).json({ message, data, errors, status })
    }
    catch (ex) {
        return res.status(500).json({ message: 'unknown Err', data: null, errors: null, status: 500 })
    }
}