// import React, { useState, useEffect } from 'react';

// const RealtimeDatetime: React.FC = () => {
//   const [datetime, setDatetime] = useState<Date>(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDatetime(new Date());
//     }, 1000); // Update setiap 1 detik

//     return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
//   }, []);

//   const formatDate = (date: Date): string => {
//     const optionsDate: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
//     return new Intl.DateTimeFormat('id-ID', optionsDate).format(date);
//   };

//   const formatTime = (date: Date): string => {
//     const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
//     return new Intl.DateTimeFormat('id-ID', optionsTime).format(date);
//   };

//   return (
//     <div>
//       {formatDate(datetime)} - {formatTime(datetime)}
//     </div>
//   );
// };

// export default RealtimeDatetime;

import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const DatePickerComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const datePickerRef = useRef<DatePicker | null>(null);
  const timePickerRef = useRef<DatePicker | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-5  rounded-lg w-max relative">
      
      <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full">
        <FaCalendarAlt
          className="cursor-pointer text-orange-500 hover:text-orange-700 transition-colors duration-200"
          onClick={() => datePickerRef.current?.setOpen(true)}
        />
        <DatePicker
          ref={datePickerRef}
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          dateFormat="eee, dd MMM yyyy"
          onClickOutside={() => datePickerRef.current?.setOpen(false)}
          customInput={
            <span className="cursor-pointer text-black">
              {selectedDate?.toLocaleDateString("id-ID", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          }
        />
      </div>

      <span className="text-gray-500 font-bold">-</span>

      <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full">
        <FaClock className="text-orange-500" />
        <span className="text-black">
          {selectedTime?.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default DatePickerComponent;



