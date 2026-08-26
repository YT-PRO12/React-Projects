import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");

  const [length, setLength] = useState(12);

  const [includeNumbers, setIncludeNumbers] = useState(true);

  const [includeSymbols, setIncludeSymbols] = useState(true);

  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const numbers = "0123456789";

  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const generatePassword = () => {
    let characters = letters;

    if (includeNumbers) {
      characters += numbers;
    }

    if (includeSymbols) {
      characters += symbols;
    }

    let newPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length
      );

      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          🔐 Password Generator
        </h1>

        <div className="flex gap-2 mb-6">

          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white outline-none"
            placeholder="Your password"
          />

          <button
            onClick={copyPassword}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Copy
          </button>

        </div>

        <div className="mb-6">

          <div className="flex justify-between text-white mb-2">

            <span>Password Length</span>

            <span>{length}</span>

          </div>

          <input
            type="range"
            min="6"
            max="30"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />

        </div>

        <div className="flex items-center gap-3 mb-4">

          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) =>
              setIncludeNumbers(e.target.checked)
            }
            className="w-4 h-4"
          />

          <label className="text-white">
            Include Numbers
          </label>

        </div>

        <div className="flex items-center gap-3 mb-6">

          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) =>
              setIncludeSymbols(e.target.checked)
            }
            className="w-4 h-4"
          />

          <label className="text-white">
            Include Special Characters
          </label>

        </div>

        <button
          onClick={generatePassword}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
        >
          Generate Password
        </button>

      </div>
    </div>
  );
}

export default App;