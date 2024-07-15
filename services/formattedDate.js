const { DateTime } = require("luxon");

const getFormattedDate = () => {
  const date = DateTime.local().setZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const formattedDate =
    date.toFormat("EEE MMM dd yyyy HH:mm:ss 'GMT'ZZ") + ` (${date.zoneName})`;
  return formattedDate;
};

module.exports = {
  getFormattedDate,
};
