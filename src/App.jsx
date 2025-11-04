import { useState, useCallback, useRef, useEffect } from "react";

function App() {
  const [len, setLen] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const [copied, setCopied] = useState(false);

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [len, numAllowed, charAllowed, setpassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
    setCopied(true); // show copied state
    setTimeout(() => setCopied(false), 1500); // revert after 1.5s
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [len, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3 text-xl font-semibold">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className={`outline-none px-3 py-0.5 shrink-0 text-white font-medium transition-all duration-300 
              ${
                copied
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex text-sm gap-x-2 flex-wrap">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={len}
              className="cursor-pointer"
              onChange={(e) => setLen(e.target.value)}
            />
            <label>Length: {len}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numAllowed}
              id="numberInput"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
