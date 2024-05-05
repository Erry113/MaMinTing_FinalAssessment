async function http(obj) {
    let { method, url, params, data} = obj
    if  (params) {
        let str = new URLSearchParams(params).toString()
        url += '?'+ str
    }
    let res
    if (data) {
        res = await fetch(url,{
            method:method,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
    }else {
        res = await fetch(url)
    }
    return res.json()
}