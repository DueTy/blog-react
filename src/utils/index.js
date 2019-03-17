export const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple"
];


export function timerTrans(time) {
    let date = new Date(time),
        Y = date.getFullYear() + "-",
        M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-",
        D = (date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate()) + " ";
    return Y + M + D;
}