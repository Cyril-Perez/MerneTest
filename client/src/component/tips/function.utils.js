export const configDate = (nbr) => {
    let newArrayDate = []
    let config = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    
    let temps = Date.parse(nbr);
    // console.log(temps);
    let date = new Date(temps).toLocaleDateString("fr-FR", config)
    date.toString();
    let setDate = date.split(",")[1].split(":")
    newArrayDate.unshift(" " + setDate[0]+"h")
    newArrayDate.push(setDate[1]+"min")

    let resultDate = newArrayDate.join(" : ")
    let result = [date.split(",")[0], resultDate].join(",")

    return result
  };

  export const loading = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  export const dateNowConfig = (nbr) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let newDate = new Date(nbr).toLocaleDateString("fr-FR", options);
  
    return newDate.toString();
  }