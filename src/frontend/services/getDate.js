module.exports.getDate = (date) => {
    let hours = date.getHours(),minutes = date.getMinutes(),secondes = date.getSeconds(),day = date.getDate(),month = (date.getMonth()+1),year = date.getFullYear()
    if (hours <10){hours = '0'+hours}
    if (minutes <10){minutes = '0'+minutes}
    if (secondes <10){secondes = '0'+secondes}
    if (day <10){day = '0'+day}
    if (month <10){month = '0'+month}
    return `${hours}:${minutes}:${secondes} le ${day}-${month}-${year}`

}

