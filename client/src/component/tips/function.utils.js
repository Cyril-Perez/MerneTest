//created AT
export const configDate = (nbr) => {
  if(!nbr){
    return "..."
  } else {
  let newArrayDate = [];
      let config = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      // console.log(nbr)
      let temps = Date.parse(nbr);
      // console.log(temps);
      let date = new Date(temps).toLocaleDateString("fr-FR", config).toString()
      // console.log(date);
      let setDate = date.split(",")[1].split(":")
      newArrayDate.unshift(" " + setDate[0]+"h")
      newArrayDate.push(setDate[1]+"min")

      let resultDate = newArrayDate.join(" : ")
      let result = [date.split(",")[0], resultDate].join(",")

      return result
  }
    
  };

  export const loading = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  //timestamp

  export const dateNowConfig = (nbr) => {
    let newArrayNewDate = [];
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let newDate = new Date(nbr).toLocaleDateString("fr-FR", options).toString()
    let newSetDate = newDate.split(",")[1].split(":")
    newArrayNewDate.unshift(" " + newSetDate[0]+"h")
    newArrayNewDate.push(newSetDate[1]+"min")

    let newResultDate = newArrayNewDate.join(" : ")
    let resultDate = [newDate.split(",")[0], newResultDate].join(",")
    return resultDate
  }