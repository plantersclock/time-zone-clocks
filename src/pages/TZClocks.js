import React, { useState, useEffect } from "react";
import TZCard from "../modules/timezonecards/components/TZCard.js";
import {
  formatDate,
  formatTime,
  getCurrentDateTime,
} from "../modules/common/helpers.js";
import {
  sortedTimeZones,
  uniqueTimeZones,
} from "../modules/common/timezones.js";
import moment from "moment-timezone";

const initiateDateTime = () => {
  const date = new Date();

  // return moment
  //   .tz(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
  //   .format("MM/DD/YYYY h:mm a Z");
  return moment(date)._d;
};

const TZClocks = () => {
  const [mainDateTime, setMainDateTime] = useState(() => initiateDateTime());
  const [selectedTZ, setSelectedTZ] = useState("America/New_York");
  const [selectedDT, setSelectedDT] = useState(() => initiateDateTime());
  const [clocks, setClocks] = useState([]);
  const [timeZoneOptions, setTimeZoneOptions] = useState(uniqueTimeZones());
  const [showAllTZ, setShowAllTZ] = useState(false);

  const addClock = () => {
    setClocks((clocks) => [
      ...clocks,
      {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    ]);
  };

  const updateClockTZ = (id, timeZone) => {
    let tempClocks = [...clocks];
    tempClocks[id].timeZone = timeZone;
    setClocks(tempClocks);
  };

  useEffect(() => {
    setMainDateTime(
      moment.tz(selectedDT, selectedTZ).format("YYYY-MM-DD h:mm a Z")
    );
  }, [selectedDT, selectedTZ]);

  useEffect(() => {
    if (!showAllTZ) setTimeZoneOptions(uniqueTimeZones());
    if (showAllTZ) setTimeZoneOptions(sortedTimeZones());
  }, [showAllTZ]);

  return (
    <div className="flex w-full flex-wrap">
      <div className="m-2 font-bold backdrop-blur-sm bg-gradient-to-bl from-white/5 to-white/30 border border-green-200 shadow-sm center rounded w-1/3">
        <div className="flex w-full">
          <div className="p-5 w-full">
            <div className="flex-col">
              <div>
                <select
                  className="w-full m-0 p-0 bg-transparent"
                  name="mainTimeZoneSelect"
                  id="mainTimeZoneSelector"
                  value={selectedTZ}
                  onChange={(e) => setSelectedTZ(e.target.value)}
                >
                  {timeZoneOptions &&
                    timeZoneOptions.map((timeZone) => (
                      <option value={timeZone.timeZoneID} key={timeZone.ID}>
                        {timeZone.displayName && timeZone.displayName} (
                        {timeZone.timeZoneID})
                      </option>
                    ))}
                </select>
                <div class="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="showtz"
                    name="showtz"
                    className="ml-1 w-4 h-4 text-green-300 bg-pink-100 accent-green-200 border-gray-300 rounded focus:ring-green-200 dark:focus:ring-green-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
              {/* <div className="text-2xl">{formatTime(mainDateTime, selectedTZ)}</div> */}
              <div>
                <input
                  id="maindatetime"
                  type="datetime-local"
                  name="maindatetime"
                  className="bg-transparent text-gray-800 text-2xl font-bold hidden"
                  value={moment
                    .tz(selectedDT, selectedTZ)
                    .format("yyyy-MM-DDTHH:mm")}
                  onChange={(e) => setSelectedDT(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div
                className="text-8xl font-extralight text-black text-opacity-80 drop-shadow-sm cursor-pointer"
                onClick={() =>
                  document.getElementById("maindatetime").showPicker()
                }
              >
                {formatTime(selectedDT, selectedTZ)}
              </div>
              <div className="text-2xl font-medium text-black text-opacity-80 drop-shadow-sm">
                {formatDate(selectedDT, selectedTZ)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {clocks &&
        clocks.map((clock, index) => (
          <TZCard
            id={index}
            dateTime={mainDateTime}
            timeZone={clock.timeZone}
            key={index}
            updateClockTZ={updateClockTZ}
          />
        ))}

      <button
        className="bg-gray-100 rounded m-2 p-2 center font-bold hover:bg-gray-200 h-40"
        onClick={() => addClock()}
      >
        Add Clock
      </button>
      {/* <button onClick={() => updateClockTZ()}>TZ Update</button> */}
    </div>
  );
};

export default TZClocks;
