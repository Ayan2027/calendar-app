import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendarGrid({
    currentDate,
    startDate,
    endDate,
    onDateClick,
    isInRange,
    direction,
    notes,
}) {
    const [hoveredDate, setHoveredDate] = useState(null); // ⭐ ADDED

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    const dates = [];
    for (let i = 0; i < firstDay; i++) dates.push(null);
    for (let i = 1; i <= daysInMonth; i++) dates.push(i);

    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    

    return (
        <div className="p-8 flex flex-col justify-center h-full">

            {/* DAYS */}
            <div className="grid grid-cols-7 mb-6">
                {days.map((d) => (
                    <div
                        key={d}
                        className="text-center text-[10px] font-bold text-gray-300 tracking-tighter"
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* GRID */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${month}-${year}`}
                    initial={{ x: direction === 1 ? 60 : -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction === 1 ? -60 : 60, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-7 gap-y-2"
                >
                    {dates.map((date, i) => {
                        if (!date) return <div key={i} className="h-12" />;

                        const current = new Date(year, month, date);
                        current.setHours(0, 0, 0, 0);

                        const day = current.getDay(); // ✅ FIX
                        const isSunday = day === 0;
                        const isSaturday = day === 6;

                        const isSelected =
                            (startDate && current.getTime() === startDate.getTime()) ||
                            (endDate && current.getTime() === endDate.getTime());

                        const inRange = isInRange && isInRange(date);

                        const isToday =
                            date === today.getDate() &&
                            month === today.getMonth() &&
                            year === today.getFullYear();

                        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
                        const isHoliday = holidays[dateKey];

                        const hasNote = notes && notes[dateKey];

                        return (
                            <motion.div
                                key={i}
                                onClick={() => onDateClick(date)}
                                onMouseEnter={() => setHoveredDate(dateKey)} // ⭐ ADDED
                                onMouseLeave={() => setHoveredDate(null)}    // ⭐ ADDED
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`relative h-12 flex items-center justify-center cursor-pointer transition-all
                  ${inRange ? "bg-blue-50" : ""}
                  ${date === startDate && endDate ? "rounded-l-full bg-blue-50" : ""}
                  ${date === endDate ? "rounded-r-full bg-blue-50" : ""}
                `}
                            >
                                <span
                                    className={`relative w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all
                    ${isSelected
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }
                    ${isToday && !isSelected
                                            ? "border-2 border-blue-600 text-blue-600 font-bold shadow-sm"
                                            : ""
                                        }
                    ${isSunday && !isSelected && !isToday ? "text-red-500" : ""}
${isSaturday && !isSelected && !isToday ? "text-yellow-500" : ""}
                                        ${isHoliday ? "bg-purple-100 text-purple-700 font-bold" : ""}
                  `}
                                >
                                    {date}

                                    {/* 🔵 RANGE DOT */}
                                    {inRange && (
                                        <span className="absolute bottom-1 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                    )}

                                    {/* 🟡 NOTE DOT */}
                                    {hasNote && (
                                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                                    )}
                                    {isHoliday && (
                                        <span className="absolute bottom-1 w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                    )}
                                </span>

                                
                            </motion.div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}