const customFetch = async (url, options = {}) => {
    options.headers ||= {};
    options.method ||= 'GET';
    if (options.method.toUpperCase() !== 'GET') {
        if (!options.headers["Content-Type"]) {
            options.headers["Content-Type"] = "application/json";
        }

        if (options.body && typeof options.body === 'object') {
            options.body = JSON.stringify(options.body);
        }

        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            options.headers.Authorization = `Token ${storedToken}`;
        }
    }

    const response = await fetch(url, options);
    if (response.status >= 500) throw res;
    return response;
}

export default customFetch;