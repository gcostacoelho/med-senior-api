export function getDaysOfWeek(date: Date): Date[] {
    const currentDate = new Date(date);

    const dayOfWeek = currentDate.getDay();

    const daysDiff = dayOfWeek - 0;

    currentDate.setDate(currentDate.getDate() - daysDiff);

    const daysOfWeek: Date[] = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(currentDate);
        day.setDate(currentDate.getDate() + i);
        daysOfWeek.push(day);
    }

    return daysOfWeek;
}