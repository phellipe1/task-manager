export function realDate(dataString){
    const parts = dataString.split("/");

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1] - 1);
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
}
export function currentStatus(item){
    if(!item) return "";

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    item = realDate(item);
    if(item.getTime() < today.getTime()){
        return "<span class='badge overdue'>🔴 Overdue</span>";
    } else if (item.getTime() === today.getTime()){
        return "<span class='badge today'>🟡 Today</span>";
    } else{
        return "<span class='badge upcoming'>🟢 Upcoming</span>";
    }
}