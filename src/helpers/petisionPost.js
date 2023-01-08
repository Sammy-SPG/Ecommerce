const postQuery = async (url, data) => {
    try {
        const query = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const res = await query.json();
        return res;
    } catch (error) {
        console.log(error);
    }
}

export default postQuery;