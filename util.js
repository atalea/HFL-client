const callApi = async ({ url, method, token, body }) => {
  try {
    const options = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`
    }
    const response = await fetch(`http://${url}`, options)
    const data = await response.json()
    if (data.error) throw data.error
    return data
  } catch (error) {
    console.error("ERROR: ", error.error, error.message)
    return error
  }
}

module.exports = {
  callApi
}