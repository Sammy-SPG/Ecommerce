const DateUnix = (unixDate) => {
    let date = new Date(unixDate * 1000);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}


export default DateUnix;