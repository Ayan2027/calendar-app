export default function ImageSection({ monthName, year }) {
  const month = monthName.toLowerCase();

  // 🔥 IMAGE
  const getImage = () => {
    if (["december", "january", "february"].includes(month)) {
      return "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80";
    }

    if (["march", "april"].includes(month)) {
      return "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80";
    }

    if (["may", "june"].includes(month)) {
      return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
    }

    if (["july", "august", "september"].includes(month)) {
      return "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80";
    }

    return "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80";
  };

  // 🔥 GRADIENT + ICON
  const getSeasonStyle = () => {
    if (["december", "january", "february"].includes(month)) {
      return {
        gradient: "bg-blue-600/70",
        icon: "❄️",
      };
    }

    if (["march", "april"].includes(month)) {
      return {
        gradient: "bg-pink-500/70",
        icon: "🌸",
      };
    }

    if (["may", "june"].includes(month)) {
      return {
        gradient: "bg-yellow-500/70",
        icon: "☀️",
      };
    }

    if (["july", "august", "september"].includes(month)) {
      return {
        gradient: "bg-indigo-700/70",
        icon: "🌧️",
      };
    }

    return {
      gradient: "bg-orange-500/70",
      icon: "🍂",
    };
  };

  const { gradient, icon } = getSeasonStyle();

  return (
    <div className="relative h-48 md:h-64 w-full overflow-hidden">
      
      {/* IMAGE */}
      <img
        src={getImage()}
        className="h-full w-full object-cover transition-all duration-700 ease-in-out hover:scale-105"
        alt="Calendar Header"
      />

      {/* 🔥 DYNAMIC GRADIENT */}
      <div
        className={`absolute inset-0 ${gradient}`}
        style={{
          clipPath: "polygon(100% 35%, 100% 100%, 0% 100%, 0% 80%)",
        }}
      ></div>

      {/* TEXT + ICON */}
      <div className="absolute bottom-6 right-8 text-right text-white">
        <p className="text-xl font-light tracking-[0.2em]">{year}</p>

        <h2 className="text-4xl font-bold uppercase tracking-tighter leading-none flex items-center gap-2 justify-end">
          {monthName} <span>{icon}</span>
        </h2>
      </div>
    </div>
  );
}