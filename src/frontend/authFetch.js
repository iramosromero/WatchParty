async function authFetch(URI, method = 'GET', body) {
  return new Promise((res, rej) => {
    console.log(body);
    console.log(method);
    const token = localStorage.getItem('USER-TOKEN');
    if (token) {
      fetch(`http://localhost:4000${URI}`, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },
      })
        .then((response) => { res(response.json()); })
        .catch((error) => {
          console.log(error);
          rej(error);
        });
    } else {
      rej(Error('User token not found'));
    }
  });
}

module.exports = authFetch;
