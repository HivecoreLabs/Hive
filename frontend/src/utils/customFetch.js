// const customFetch = async (url, options = {}) => {
//     debugger
//     options.headers ||= {};
//     options.method ||= 'GET';
//     if (options.method.toUpperCase() !== 'GET') {
//         options.headers["Content-Type"] = "application/json";

//         const storedToken = localStorage.getItem('token');

//         if (storedToken) {
//             options.headers.Authorization = `Token ${storedToken}`;
//         }
//     }

//     const response = await fetch(url, options);
//     if (response.status >= 500) throw res;
//     return response;
// }

// export default customFetch;