export const numDifferentiation=(val: any,currency:any)=>{
    const newValue = parseInt(val);

    if (currency === 0) {
      if (newValue >= 10000000) {
        val = (newValue / 10000000).toFixed(2) + " Cr";
      } else if (newValue >= 100000) {
        val = (newValue / 100000).toFixed(2) + " Lac";
      } else if (newValue >= 1000) {
        val = (newValue / 1000).toFixed(2) + " K";
      } else if (newValue <= 1000) {
        val = newValue + " Rs";
      }
    } else {
      if (newValue >= 100000000) {
        val = (newValue / 100000000).toFixed(2) + " B$";
      } else if (newValue >= 1000000) {
        val = (newValue / 1000000).toFixed(2) + " M$";
      } else if (newValue >= 1000) {
        val = (newValue / 1000).toFixed(2) + " K$";
      } else if (newValue <= 1000) {
        val = newValue + " $";
      }
    }

    return val;
  }