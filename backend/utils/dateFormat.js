//exports the helper function
module.exports = {
    //formats date to be in mm/dd/yyyy format
    dateFormat: (currentDate) => {
        return `${new Date(currentDate).getMonth() + 1}
        /
        ${new Date(currentDate).getDate()}
        /
        ${new Date(currentDate.getFullYear() +5)}`
        }
    }