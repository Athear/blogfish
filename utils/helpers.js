module.exports = {


  dateFormat:(dateString)=>{
    const fullDate = new Date(dateString);
    return fullDate.toLocaleDateString();
  }

    
    // get_emoji: () => {
    //   const randomNum = Math.random();
    //   let book = "📗";
  
    //   if (randomNum > 0.7) {
    //     book = "📘";
    //   } else if (randomNum > 0.4) {
    //     book = "📙";
    //   }
  
    //   return `<span for="img" aria-label="book">${book}</span>`;
    // },
  };
  