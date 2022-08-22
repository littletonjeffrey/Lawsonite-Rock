//exports the helper function
module.exports = {
    dateFormat: (currentDate) => {
        return `${new Date(currentDate).getMonth() + 1}
        /
        ${new Date(currentDate).getDate()}
        /
        ${new Date(currentDate.getFullYear() +5)}`
        }
    }