import axios from "axios"

const ServerURL = "http://localhost:4000"

const postData = async (url, body, isFile = false) => {
    try {
        const headers = {
            headers: {
                "content-type": isFile ? "multipart/form-data" : "application/json",
            }
        }

        var response = await axios.post(`${ServerURL}/${url}`, body, headers)
        var result = await response.data
        return (result)
    }
    catch (error) {
        return (false)
    }
}

const getData = async (url) => {
    try {
        var response = await fetch(`${ServerURL}/${url}`)
        var result = await response.json()
        return (result)
    }
    catch (error) {
        return (null)
    }
}


export { ServerURL, postData, getData }