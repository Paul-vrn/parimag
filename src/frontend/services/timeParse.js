module.exports.timeParse = (secs) => {
    let sec_num = parseInt(secs, 10)
    let hours   = Math.floor(sec_num / 3600)
    let minutes = Math.floor(sec_num / 60) % 60
    let seconds = sec_num % 60
    minutes = (minutes === 0) ? '00' : minutes
    seconds = (seconds === 0) ? '00' : seconds
    if (hours === 0){
        return `${minutes}m${seconds}s`
    }
    return `${hours}h${minutes}m${seconds}s`
}

