const customFetch = async (url, options = {}) => {
    options.headers ||= {};
    options.method ||= 'GET';
    if (options.method.toUpperCase() !== 'GET') {
        if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
            options.headers["Content-Type"] = "application/json";
        }
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    const res = await fetch(url, options);

    if (res.status >= 500) throw res;

    return res;
}

export default csrfFetch;