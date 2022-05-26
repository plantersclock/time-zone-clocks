import moment from "moment-timezone";

export const getCurrentDateTime = () => {
  const date = new Date();

  return moment(date)._d;
};

export const formatTime = (dateTime, timeZone) => {
  return moment(dateTime).tz(timeZone, false).format("h:mm a");
};

export const formatDate = (dateTime, timeZone) => {
  return moment(dateTime).tz(timeZone, false).format("MM/DD/YYYY");
};

// export const convertDateTime = (dateTime, timeZone) => {
//   if (typeof dateTime === "string") {
//     return new Date(dateTime).toLocaleString("en-US", {
//       timeZone,
//     });
//   }

//   return dateTime.toLocaleString("en-US", {
//     timeZone,
//   });
// };

// export const formatTime = (dateTime) => {
//   if (typeof dateTime === "string") {
//     return new Date(dateTime).toLocaleString("en-US", {
//       timeZone: "Asia/Dubai",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     });
//   }

//   return dateTime.toLocaleString("en-US", {
//     timeZone: "Asia/Dubai",
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   });
// };
