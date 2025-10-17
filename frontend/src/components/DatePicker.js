import { useState, useEffect } from "react";

export default function DatePicker({ onSubmit }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [isValid, setIsValid] = useState(false);

  const years = Array.from({ length: 10 }, (_, i) => 2025 - i);
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );


  const getDaysInMonth = (y, m) => {
    if (!y || !m) return 31;
    const monthIndex = parseInt(m, 10) - 1;
    return new Date(y, monthIndex + 1, 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(year, month) },
    (_, i) => (i + 1).toString().padStart(2, "0")
  );

  useEffect(() => {
    if (!year || !month || !day) {
      setIsValid(false);
      return;
    }

    const dateStr = `${year}-${month}-${day}`;
    const parsed = new Date(`${year}-${month}-${day}T00:00:00Z`);
    const isGood =
      !isNaN(parsed.getTime()) &&
      parsed.getUTCFullYear() === Number(year) &&
      parsed.getUTCMonth() + 1 === Number(month) &&
      parsed.getUTCDate() === Number(day);

    setIsValid(isGood);
  }, [year, month, day]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(`${year}-${month}-${day}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6"
    >
      <div className="flex gap-2">
        {/* Year */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 rounded-lg text-black border border-gray-400 focus:ring focus:ring-blue-400"
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Month */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 rounded-lg text-black border border-gray-400 focus:ring focus:ring-blue-400"
        >
          <option value="">Month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Day */}
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="p-2 rounded-lg text-black border border-gray-400 focus:ring focus:ring-blue-400"
        >
          <option value="">Day</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Fetch button */}
      <button
        type="submit"
        disabled={!isValid}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          isValid
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        Fetch Images
      </button>
    </form>
  );
}
