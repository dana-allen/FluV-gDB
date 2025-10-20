
function submitApiQuery(url, params, callback) {
    // const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}${params ? `?${params}` : ''}`;
    fetch(fullUrl, {
        headers: { 'database': process.env.REACT_APP_DATABASE },
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        callback(response)
    })
    .catch((error) => {
        console.error('Error:', error);
        callback(error)
    });
        
}

export default submitApiQuery;


