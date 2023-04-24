import React, { Component } from "react";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { RangeDatePicker } from "@y0c/react-datepicker";

class DateFormat extends Component {
  render() {
    return (
      <div className="d-block calender-box">
        <div className="clender-content">
          <DateRangeIcon className="calender-icon" />
          <div className="calender-text">
            <p>Change Period</p>
            <span>
              <RangeDatePicker
                startPlaceholder="2021-06-01"
                endPlaceholder="2021-06-10"
              />
            </span>
          </div>
          <ArrowDropDownIcon className="calender-arrow" />
        </div>
      </div>
    );
  }
}

export default DateFormat;