import React, { useState, useEffect } from "react";
import TZCard from "../modules/timezonecards/components/TZCard.js";
import { v4 as uuid } from "uuid";
import {
  sortedTimeZones,
  uniqueTimeZones,
} from "../modules/common/timezones.js";
import moment from "moment-timezone";

const initiateDate = () => {
  let date = moment
    .tz(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format("yyyy-MM-DD");
  return date;
};

const initiateTime = () => {
  let time = moment
    .tz(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format("HH:mm");
  console.log(time);

  return time;
};

const initiateClocks = () => {
  if (!localStorage.getItem("clocks")) return [];
  if (localStorage.getItem("clocks") === "null") return [];
  return JSON.parse(localStorage.getItem("clocks"));
};

const TZClocks = () => {
  const [mainDateTime, setMainDateTime] = useState();
  const [selectedTZ, setSelectedTZ] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [selectedT, setSelectedT] = useState(() => initiateTime());
  const [selectedD, setSelectedD] = useState(() => initiateDate());
  const [clocks, setClocks] = useState(() => initiateClocks());
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

  const removeClock = (id) => {
    var filteredList = clocks.filter((clock) => {
      return clock.id !== id;
    });
    setClocks(filteredList);
  };

  const updateClockTZ = (id, timeZone) => {
    let tempClocks = [...clocks];
    let objIndex = tempClocks.findIndex((clock) => clock.id === id);
    tempClocks[objIndex].timeZone = timeZone;
    setClocks(tempClocks);
  };

  useEffect(() => {
    localStorage.setItem("clocks", JSON.stringify(clocks));
  }, [clocks]);

  useEffect(() => {
    let DT = moment(selectedD + " " + selectedT, "DD/MM/YYYY HH:mm");
    setMainDateTime(moment.tz(DT._i, selectedTZ).format("YYYY/MM/DD h:mm a Z"));
  }, [selectedD, selectedT, selectedTZ]);

  // useEffect(() => {
  //   console.log(
  //     moment.tz(selectedDT, selectedTZ).format("YYYY/MM/DD h:mm a Z")
  //   );
  //   setMainDateTime(
  //     moment.tz(selectedDT, selectedTZ).format("YYYY/MM/DD h:mm a Z")
  //   );
  // }, [selectedDT, selectedTZ]);

  useEffect(() => {
    if (!showAllTZ) setTimeZoneOptions(uniqueTimeZones());
    if (showAllTZ) setTimeZoneOptions(sortedTimeZones());
  }, [showAllTZ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
      <div className="w-full font-bold backdrop-blur-sm bg-gradient-to-tl from-green-50/40 to-green-50/60 border border-green-200 shadow-sm center rounded">
        <div className="flex w-full">
          <div className="p-5 w-full">
            <div className="flex-col">
              <div>
                <select
                  className="w-full m-0 p-0 bg-transparent font-medium text-gray-900/90"
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
                    className="ml-1 w-4 h-4 text-green-300 bg-green-100 accent-green-200 border-green-300 rounded focus:ring-green-200 focus:ring-2"
                    checked={showAllTZ}
                    onChange={() => setShowAllTZ(!showAllTZ)}
                  ></input>
                  <label
                    htmlFor="showtz"
                    className="ml-2 text-sm font-medium text-gray-900 text-opacity-90 drop-shadow-sm"
                  >
                    Show All
                  </label>
                </div>
              </div>
              {/* <div className="text-2xl">{formatTime(mainDateTime, selectedTZ)}</div> */}
            </div>
            <div className="flex items-end justify-between">
              <div
                className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-8xl font-light sm:font-extralight text-black text-opacity-80 drop-shadow-sm cursor-pointer"
                onClick={() => {
                  document.getElementById("maintime").focus();
                  document.getElementById("maintime").click();
                  document.getElementById("maintime").showPicker();
                }}
              >
                {moment
                  .tz(selectedD + " " + selectedT, selectedTZ)
                  .format("hh:mm a")}
              </div>
              <div
                className="text-xl sm:text-2xl font-medium text-black text-opacity-80 drop-shadow-sm cursor-pointer"
                onClick={() => {
                  document.getElementById("maindate").focus();
                  document.getElementById("maindate").click();
                  document.getElementById("maindate").showPicker();
                }}
              >
                {moment
                  .tz(selectedD + " " + selectedT, selectedTZ)
                  .format("MM/DD/YYYY")}
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <input
                  id="maintime"
                  type="time"
                  name="maintime"
                  className="bg-transparent text-gray-800 text-2xl font-bold"
                  value={selectedT}
                  onChange={(e) => {
                    setSelectedT(e.target.value);
                    console.log(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <input
                  id="maindate"
                  type="date"
                  name="maindate"
                  className="bg-transparent text-gray-800 text-2xl font-bold"
                  value={selectedD}
                  onChange={(e) => setSelectedD(e.target.value)}
                ></input>
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
            removeClock={removeClock}
          />
        ))}

      <button
        className="select-none focus:border-transparent focus:outline-none focus:ring-0 bg-pink-400 hover:bg-pink-500 w-20 h-20 p-2 center font-bold fixed bottom-4 right-4 rounded-full shadow-sm"
        onClick={() => addClock()}
      >
        <div className="select-none text-6xl font-normal text-white drop-shadow-sm leading-0 -mt-2">
          +
        </div>
      </button>
      {/* <button onClick={() => updateClockTZ()}>TZ Update</button> */}
    </div>
  );
};

export default TZClocks;
