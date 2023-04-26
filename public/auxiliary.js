const getDayList = () => {
    const daylist = [];
    const today = new Date(Date.now());
    today.setHours(0, 0, 0);
    daylist.push(today.toISOString())
    for (let i = 1; i < 30; i++) {
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + i)
        daylist.push(tomorrow.toISOString());
    }
    return daylist;
}

module.exports = {
    getDayList
}