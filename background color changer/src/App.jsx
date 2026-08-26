








import { useState } from "react";

function App() {
  const [color, setColor] = useState("white");

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "black",
  ];

  const randomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[randomIndex]);
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-4xl font-bold mb-8">
        Background Changer
      </h1>

      <div className="flex flex-wrap justify-center gap-3">

        {colors.map((colorName) => (
          <button
            key={colorName}
            onClick={() => setColor(colorName)}
            className="px-5 py-3 rounded-lg bg-gray-800 text-white"
          >
            {colorName}
          </button>
        ))}

        <button
          onClick={randomColor}
          className="px-5 py-3 rounded-lg bg-white text-black font-bold"
        >
          Random
        </button>

      </div>

      <p className="mt-8 text-xl font-semibold">
        Current Color: {color}
      </p>
    </div>
  );
}

export default App;
