const getDayList = () => {
    const daylist = [];
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    daylist.push(today.toISOString())
    for (let i = 1; i < 30; i++) {
        let tomorrow = new Date(today.getTime() + (86400000 * i));
        daylist.push(tomorrow.toISOString());
    }
    return daylist;
}

const formatDate = (dateObject) => {
    return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1) < 10 ? "0" + (dateObject.getMonth() + 1) : (dateObject.getMonth() + 1)}/${(dateObject.getDate()) < 10 ? "0" + (dateObject.getDate()) : (dateObject.getDate())}`
}

const getStartAndEndDate = () => {
    const dateList = [];
    const today = new Date(Date.now());
    today.setHours(0, 0, 0);
    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(today.getDate() + 30);
    dateList.push(formatDate(today))
    dateList.push(formatDate(thirtyDaysLater))
    return dateList;
}

module.exports = {
    getDayList,
    getStartAndEndDate,
    formatDate
}