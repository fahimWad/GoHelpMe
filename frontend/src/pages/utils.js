export function formatDate(dateString) {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

export function formatTime(timeString) {
    const [hourString, minute] = timeString.split(':');
    let hour = parseInt(hourString);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
}