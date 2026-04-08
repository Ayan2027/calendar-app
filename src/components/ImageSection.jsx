export default function ImageSection({ monthName, year }) {
  return (
    <div className="relative h-48 md:h-64 w-full overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200"
        className="h-full w-full object-cover"
        alt="Calendar Header"
      />
      {/* The Blue Geometric Pattern from the image */}
      <div 
        className="absolute inset-0 bg-blue-600 opacity-80"
        style={{ clipPath: "polygon(100% 35%, 100% 100%, 0% 100%, 0% 80%)" }}
      ></div>
      
      <div className="absolute bottom-6 right-8 text-right text-white">
        <p className="text-xl font-light tracking-[0.2em]">{year}</p>
        <h2 className="text-4xl font-bold uppercase tracking-tighter leading-none">
          {monthName}
        </h2>
      </div>
    </div>
  );
}