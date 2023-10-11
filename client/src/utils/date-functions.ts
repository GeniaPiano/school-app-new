export const formatDate = (date: Date) => {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const day = originalDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const getExpireDate = (date: Date) => {
    const originDate = new Date(date);
    const futureDate = new Date(originDate);
    futureDate.setDate(originDate.getDate() + 30);
    return futureDate;
}


