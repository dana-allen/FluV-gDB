
function submitPostApiQuery(url, params, callback) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${url}`, {
            method: 'POST',
            headers: { 'database': process.env.REACT_APP_DATABASE,
                        'Content-Type': 'application/json',
             },
            body: JSON.stringify(params)
        })
        .then((response) => {
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

export default submitPostApiQuery;

