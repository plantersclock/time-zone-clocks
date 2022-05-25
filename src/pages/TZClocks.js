import React, { useState, useEffect } from "react";
import TZCard from "../modules/timezonecards/components/TZCard.js";
import { formatDate, formatTime } from "../modules/common/helpers.js";
import { v4 as uuid } from "uuid";
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
        id: uuid(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    ]);
  };

  const updateClockTZ = (id, timeZone) => {
    let tempClocks = [...clocks];
    let objIndex = tempClocks.findIndex((clock) => clock.id === id);
    tempClocks[objIndex].timeZone = timeZone;
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
    <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
      <div className="w-full font-bold backdrop-blur-sm bg-gradient-to-bl from-white/5 to-white/30 border border-green-200 shadow-sm center rounded">
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
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="showtz"
                    name="showtz"
                    className="ml-1 w-4 h-4 text-green-300 bg-green-100 accent-green-200 border-green-300 rounded focus:ring-green-200 dark:focus:ring-green-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                className="text-5xl sm:text-8xl font-light sm:font-extralight text-black text-opacity-80 drop-shadow-sm cursor-pointer"
                onClick={() =>
                  document.getElementById("maindatetime").showPicker()
                }
              >
                {formatTime(selectedDT, selectedTZ)}
              </div>
              <div
                className="text-xl sm:text-2xl font-medium text-black text-opacity-80 drop-shadow-sm pointer"
                onClick={() =>
                  document.getElementById("maindatetime").showPicker()
                }
              >
                {formatDate(selectedDT, selectedTZ)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {clocks &&
        clocks.map((clock) => (
          <TZCard
            id={clock.id}
            dateTime={mainDateTime}
            timeZone={clock.timeZone}
            key={clock.id}
            clock={clock}
            updateClockTZ={updateClockTZ}
          />
        ))}

      <button
        className="bg-pink-400 hover:bg-pink-500 w-20 h-20 p-2 center font-bold fixed bottom-4 right-4 rounded-full shadow-sm"
        onClick={() => addClock()}
      >
        <div className="text-6xl font-normal text-white drop-shadow-sm leading-0 -mt-2">
          +
        </div>
      </button>
      {/* <button onClick={() => updateClockTZ()}>TZ Update</button> */}
    </div>
  );
};

export default TZClocks;
