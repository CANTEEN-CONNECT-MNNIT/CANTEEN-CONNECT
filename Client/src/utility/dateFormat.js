export const dateFormat=(date)=>{
    if(!date) return '-';
    return new Date(date).toDateString() !== new Date().toDateString()
      ? new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
        }) // Format as DD/MM
      : 'Today';
}