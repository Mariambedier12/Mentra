"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function CalendarSection({
  selectedDate,
  setSelectedDate,
}: Props) {
  return (
    <div className="h-full bg-[#F3F4F3] rounded-[28px] p-5">

      <Calendar
        onChange={(value) => setSelectedDate(value as Date)}
        value={selectedDate}
        className="!border-0 !bg-[#F3F4F3] w-full"
      />

      <style jsx global>{`
        .react-calendar {
          border: none !important;
          background: #F3F4F3 !important;
          width: 100%;
          font-family: inherit;
        }

        .react-calendar__navigation {
          margin-bottom: 20px;
        }

        .react-calendar__navigation button {
          background: transparent !important;
          font-weight: 600;
          color: #1E1E1E;
          font-size: 15px;
        }

        .react-calendar__month-view__weekdays {
          text-transform: capitalize;
          font-size: 12px;
          color: #8E8E93;
          margin-bottom: 10px;
        }

        .react-calendar__tile {
          background: transparent !important;
          border-radius: 999px;
          height: 38px;
          width: 38px;
          font-size: 14px;
          color: #1E1E1E;
        }

        .react-calendar__tile--active {
          background: #091A58 !important;
          color: white !important;
        }

        .react-calendar__tile:hover {
          background: #E5E7EB !important;
        }

        .react-calendar__month-view__days__day--neighboringMonth {
          color: #C7C7CC;
        }
      `}</style>

    </div>
  );
}