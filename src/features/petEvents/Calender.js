import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { PetEventsList, RenderAllPetEvent } from "./petEventsList.js";
import { adjustDateSyntax } from "../../util/AdjustDateSyntax";
import { useSelector } from "react-redux";

const Month = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const curDate = new Date();
export default function Calender() {
  let initialDate = adjustDateSyntax(
    curDate.getFullYear(),
    curDate.getMonth() + 1,
    curDate.getDate()
  );
  const [days, setDays] = useState(DisplayCalender());
  const [renderedDate, setrenderedDate] = useState(initialDate);
  const datesHasEvents = useSelector((state) => state.petsEventDate.map(e => (e.date)))

  const datePicker = (e) => {
    let list = e.target.classList;
    let date = list[0];
    setrenderedDate(date);
  };

  let displayDays = days.map((obj) => {
    let date = adjustDateSyntax(obj.year, obj.month, obj.day);
    if (obj.day === curDate.getDate()) {
      return (
        <div
          className={`${date} today add-events`}
          key={date}
          onClick={datePicker}
        >
          <div className={`${date} day-number`} onClick={datePicker}>
            {obj.day}
          </div>
          {datesHasEvents.includes(date) ? (
            <i
              className={` ${date} fa-solid fa-cat`}
              style={{ float: "right" }}
              onClick={datePicker}
            ></i>
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return (
        <div className={`${date} add-events`} key={date} onClick={datePicker}>
          <div className={`${date} day-number`} onClick={datePicker}>
            {obj.day}
          </div>
          {datesHasEvents.includes(date) ? (
            <i
              className={`${date} fa-solid fa-cat `}
              style={{ float: "right" }}
              onClick={datePicker}
            ></i>
          ) : (
            ""
          )}
        </div>
      );
    }
  });

  //getMonth is 0-based, it will return the index of the month
  // July: return 6
  const curMonthIndex = curDate.getMonth();
  const prevCalender = () => {
    curDate.setMonth(curDate.getMonth() - 1);
    setDays(DisplayCalender());
  };

  const nextCalender = () => {
    curDate.setMonth(curDate.getMonth() + 1);
    setDays(DisplayCalender());
  };
  const navigate = useNavigate();
  const handleFormClicked = () => {
    navigate("/addEventForm");
  };

  return (
    <section className="calender-section">
      <div className="calender-page">
        <div className="calender-container">
          <div className="month">
            <FontAwesomeIcon
              className="prev icon"
              onClick={prevCalender}
              icon={faArrowAltCircleLeft}
            />
            <div className="cur-date">
              <h1 className="cur-month">{Month[curMonthIndex]}</h1>
              <p>{curDate.toDateString()}</p>
            </div>
            <FontAwesomeIcon
              className="next icon"
              onClick={nextCalender}
              icon={faArrowAltCircleRight}
            />
          </div>
          <div className="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="days">{displayDays}</div>
          <button
            id="addpetsEventBtn"
            className="rippleEffect"
            onClick={handleFormClicked}
          >
            <span>Add Reminder</span>
          </button>
        </div>
        <PetEventsList selectedDate={renderedDate} />
      </div>
      <RenderAllPetEvent />
    </section>
  );
}

// get the days in sequence of a month
function DisplayCalender() {
  const lastDateOfPrevMonth = new Date(
    curDate.getFullYear(),
    curDate.getMonth() + 1,
    0 // set the day 0, will return the ending date of the month
  );
  const totalDaysInPrevMonth = lastDateOfPrevMonth.getDate();
  const indexOfLastDayOfPrevMonth = lastDateOfPrevMonth.getDay();

  const firstDateOfCurMonth = new Date( // specify the first day of current Month
    curDate.getFullYear(),
    curDate.getMonth(),
    1
  );
  //getDay():0-based; 0 represents Sunday
  const indexOfFirstDayOfCurMonth = firstDateOfCurMonth.getDay();
  const lastDateOfcurrMonth = new Date(
    curDate.getFullYear(),
    curDate.getMonth(),
    0
  );
  const totalDaysInCurrMonth = lastDateOfcurrMonth.getDate();

  let days = [];

  //displayed days of previous month
  for (let x = indexOfFirstDayOfCurMonth - 1; x >= 0; x--) {
    let obj = {
      year: curDate.getFullYear(),
      month: curDate.getMonth(),
      day: totalDaysInCurrMonth - x,
    };
    days.push(obj);
  }
  //displayed days of current month
  for (let i = 1; i <= totalDaysInPrevMonth; i++) {
    let obj = {
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: i,
    };
    days.push(obj);
  }
  //displayed days of next Month
  for (let j = 0; j < 6 - indexOfLastDayOfPrevMonth; j++) {
    let obj = {
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 2,
      day: j + 1,
    };
    days.push(obj);
  }
  return days;
}
