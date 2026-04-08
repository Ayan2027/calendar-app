import { useEffect, useState } from "react";

export default function NotesSection({ selectedDate, notes, setNotes, startDate,
    endDate }) {
    const [text, setText] = useState("");

    const key = selectedDate
        ? `${selectedDate.getFullYear()}-${String(
            selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
        : null;

    useEffect(() => {
        if (key && notes[key]) {
            setText(notes[key]);
        } else {
            setText("");
        }
    }, [key]);

    const handleChange = (e) => {
        const value = e.target.value;
        setText(value);

        if (!key && !startDate) return;

        let updated = { ...notes };

        // 🔥 IF RANGE EXISTS
        if (startDate && endDate) {
            let current = new Date(startDate);

            while (current <= endDate) {
                const rangeKey = `${current.getFullYear()}-${String(
                    current.getMonth() + 1
                ).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;

                updated[rangeKey] = value;

                current.setDate(current.getDate() + 1);
            }
        } else {
            // ✅ SINGLE DATE
            updated[key] = value;
        }

        setNotes(updated);
        
    };

    

    return (
        <div className="p-6">
            <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">
                Notes {key && `(${key})`}
            </h3>

            <textarea
                value={text}
                onChange={handleChange}
                placeholder="Write your plans here..."
                className="w-full h-40 bg-transparent text-gray-600 leading-[32px] placeholder-gray-300 resize-none focus:outline-none text-sm font-medium"
                style={{
                    backgroundImage:
                        "linear-gradient(transparent, transparent 31px, #f1f5f9 31px)",
                    backgroundSize: "100% 32px",
                }}
            />
        </div>
    );
}