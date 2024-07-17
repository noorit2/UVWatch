 export function formatDateTo12Hour(timeString) {
    const date = new Date(timeString);
  
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    // Add leading zero to minutes if needed
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
    const formattedTime = hours + ':' + minutesStr + ' ' + ampm;
    return formattedTime;
  }
