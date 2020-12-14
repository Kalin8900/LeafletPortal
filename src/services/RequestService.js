
async function RequestService(url, method) {
    let res, err;

    await fetch(url, {method: method})
        .then(response => response.text())
        .then(data => res = data)
        .catch(error => err = error)

    return (res) ? [res, true] : [err, false] ;
}

export default RequestService;