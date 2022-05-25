import React, { useEffect, useState } from "react";
import { sortedTimeZones, uniqueTimeZones } from "../../common/timezones.js";
import { formatTime, formatDate } from "../../common/helpers.js";

const TZCard = ({ id, timeZone, dateTime, updateClockTZ }) => {
  const [timeZoneOptions, setTimeZoneOptions] = useState(uniqueTimeZones());
  const [showAllTZ, setShowAllTZ] = useState(false);

  useEffect(() => {
    if (!showAllTZ) setTimeZoneOptions(uniqueTimeZones());
    if (showAllTZ) setTimeZoneOptions(sortedTimeZones());
  }, [showAllTZ]);

  return (
    <div className="m-2 font-bold backdrop-blur-sm bg-gradient-to-bl from-white/5 to-white/30 border border-pink-100 shadow-sm rounded w-1/3 ">
      <div className="flex w-full">
        <div className="p-5 w-full">
          <div className="flex-col">
            <div>
              <select
                className="bg-transparent m-0 p-0 w-full min-w-full overflow-ellipsis font-medium text-gray-900/90"
                name="timeZoneSelect"
                id="timeZoneSelector"
                value={timeZone}
                onChange={(e) => updateClockTZ(id, e.target.value)}
              >
                {timeZoneOptions &&
                  timeZoneOptions.map((timeZone) => (
                    <option value={timeZone.timeZoneID} key={timeZone.ID}>
                      {timeZone.displayName && timeZone.displayName} (
                      {timeZone.timeZoneID})
                    </option>
                  ))}
              </select>
            </div>

            <div class="flex items-center mb-4">
              <input
                type="checkbox"
                id="showtz"
                name="showtz"
                className="ml-1 w-4 h-4 text-pink-600 bg-pink-100 accent-pink-500 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={showAllTZ}
                onChange={() => setShowAllTZ(!showAllTZ)}
              ></input>
              <label
                htmlFor="showtz"
                className="ml-2 text-sm font-medium text-gray-900 text-opacity-90 dark:text-gray-300 drop-shadow-sm"
              >
                Show All
              </label>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-8xl font-extralight text-black text-opacity-80 drop-shadow-sm">
              {formatTime(dateTime, timeZone)}
            </div>
            <div className="text-2xl font-medium text-black text-opacity-80 drop-shadow-sm">
              {formatDate(dateTime, timeZone)}
            </div>
          </div>
        </div>
        <div className="w-10 bg-gradient-to-b from-white/40 to-white/10"></div>
      </div>
    </div>
  );
};

export default TZCard;
