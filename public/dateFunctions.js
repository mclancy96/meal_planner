const getDayList = () => {
    const daylist = [];
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    daylist.push(today.toISOString())
    for (let i = 1; i < 30; i++) {
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + i)
        daylist.push(tomorrow.toISOString());
    }
    return daylist;
}

const getStartAndEndDate = () => {
    const dateList = [];
    const today = new Date(Date.now());
    today.setHours(0, 0, 0);
    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(today.getDate() + 30);
    dateList.push(`${today.getFullYear()}/${(today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)}/${(today.getDate() + 1) < 10 ? "0" + (today.getDate() + 1) : (today.getDate() + 1)}`)
    dateList.push(`${thirtyDaysLater.getFullYear()}/${(thirtyDaysLater.getMonth() + 1) < 10 ? "0" + (thirtyDaysLater.getMonth() + 1) : (thirtyDaysLater.getMonth() + 1)}/${(thirtyDaysLater.getDate() + 1) < 10 ? "0" + (thirtyDaysLater.getDate() + 1) : (thirtyDaysLater.getDate() + 1)}`)
    return dateList;
}

module.exports = {
    getDayList,
    getStartAndEndDate
}