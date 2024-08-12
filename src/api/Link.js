import service from "../util/service.js"

let link=(url, method , data ={}, params ={}, header = {}, withCredentials =false)=> {
    return new Promise((resolve, reject)=> {
        service.request({
            url,
            method,
            data,
            params,
            header,
            withCredentials
        }).then((ok)=> {
            resolve(ok)
        }).catch((err)=> {
            reject(err)
        })
    })
}

export default link