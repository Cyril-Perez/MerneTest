export const configDate = (nbr) => {
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
    let date = new Date(temps).toLocaleDateString("fr-CA", config)
    // console.log(date);
    return date.toString();
  };

  export const loading = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };