module.exports.getAuth = () => {
    const cookies = document.cookie.split(';')
    let jwt = undefined
        cookies.forEach(cookie => {
            if (cookie.includes('access_token')){
                jwt = cookie.substring(cookie.indexOf('=')+1)
            }
        }); 
        return jwt
}