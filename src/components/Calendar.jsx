import { useState } from "react";
import { useEffect } from "react"; // make sure this is at top
import ImageSection from "./ImageSection";
import NotesSection from "./NotesSection";
import CalendarGrid from "./CalendarGrid";

export default function Calendar() {
    const [direction, setDirection] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());

    const [ranges, setRanges] = useState({});
    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

    const [selectedDate, setSelectedDate] = useState(null);



    const [notes, setNotes] = useState({});
    



    const currentRange = ranges[monthKey] || {
        start: null,
        end: null,
    };

    // ✅ HANDLE DATE CLICK (FIXED)
    const handleDateClick = (date) => {
        if (!date) return;

        const fullDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            date
        );

        fullDate.setHours(0, 0, 0, 0);

        const currentRange = ranges[monthKey] || { start: null, end: null };

        let newStart = currentRange.start;
        let newEnd = currentRange.end;

        if (!newStart || (newStart && newEnd)) {
            newStart = fullDate;
            newEnd = null;
        } else if (fullDate < newStart) {
            newStart = fullDate;
        } else {
            newEnd = fullDate;
        }

        setRanges({
            ...ranges,
            [monthKey]: { start: newStart, end: newEnd },
        });

        setSelectedDate(fullDate);
    };

    // ✅ RANGE CHECK (FIXED)
    const isInRange = (date) => {
        const range = ranges[monthKey];
        if (!range || !range.start || !range.end) return false;

        const current = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            date
        );

        current.setHours(0, 0, 0, 0);

        return current > range.start && current < range.end;
    };

    const monthName = currentDate.toLocaleString("default", {
        month: "long",
    });

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[950px] overflow-hidden flex flex-col md:flex-row border border-gray-100">

                {/* LEFT PANEL */}
                <div className="md:w-1/3 flex flex-col border-r border-gray-50">
                    <ImageSection
                        monthName={monthName}
                        year={currentDate.getFullYear()}
                    />
                    <NotesSection
                        selectedDate={selectedDate}
                        notes={notes}
                        setNotes={setNotes}
                        startDate={currentRange.start}   // ✅ ADD
                        endDate={currentRange.end}

                    />
                </div>

                {/* RIGHT PANEL */}
                <div className="md:w-2/3 relative">
                    <div className="absolute top-8 right-10 flex gap-4 z-10">

                        {/* PREV */}
                        <button
                            onClick={() => {
                                setDirection(-1);
                                setCurrentDate(
                                    new Date(
                                        currentDate.getFullYear(),
                                        currentDate.getMonth() - 1,
                                        1
                                    )
                                );
                                setSelectedDate(null);
                            }}
                            className="text-gray-300 hover:text-blue-600 transition"
                        >
                            ←
                        </button>

                        {/* NEXT */}
                        <button
                            onClick={() => {
                                setDirection(1);
                                setCurrentDate(
                                    new Date(
                                        currentDate.getFullYear(),
                                        currentDate.getMonth() + 1,
                                        1
                                    )
                                );
                                setSelectedDate(null);
                            }}
                            className="text-gray-300 hover:text-blue-600 transition"
                        >
                            →
                        </button>
                    </div>

                    <CalendarGrid
                        currentDate={currentDate}
                        startDate={currentRange.start}
                        endDate={currentRange.end}
                        onDateClick={handleDateClick}
                        isInRange={isInRange}
                        direction={direction}
                        notes={notes}
                    />
                </div>
            </div>
        </div>
    );
}