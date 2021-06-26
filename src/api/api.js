function send(options, successCallback, errorCallback) {
    const init = {
        method: options.method,
        headers: options.headers,
    }
    if (options.data) {
        init.body = JSON.stringify(options.data)
    }
    fetch(options.url, init)
    .then(res => {
        if (res.status === 204) {
            return {}
        }
        return res.json()
    })
    .then(
        (result) => {
            if (result.code && result.code !== options.expectedStatusCode) {
                errorCallback(result.error)
                return
            }
            successCallback(result)
        },
        (error) => {
            errorCallback(error)
        }
    )
}

export default send