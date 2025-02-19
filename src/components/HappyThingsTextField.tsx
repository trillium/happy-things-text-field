import React, { useState } from "react";

const formattedToday = new Date().toISOString().split("T")[0];

const earlierDay = new Date();
earlierDay.setDate(earlierDay.getDate() - 1);
const formattedYesterday = earlierDay.toISOString().split("T")[0];
earlierDay.setDate(earlierDay.getDate() - 1);
const formattedTwoDaysAgo = earlierDay.toISOString().split("T")[0];

const whichDay: { [key: string]: string } = {
  today: formattedToday,
  yesterday: formattedYesterday,
  twoDaysAgo: formattedTwoDaysAgo,
};

function HappyThingsTextField(): React.ReactElement {
  const [text, setText] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>(whichDay.today);
  const [copyButtonText, setCopyButtonText] =
    useState<string>("Copy to Clipboard");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDay(event.target.value);
  };

  const handleCopyButton = () => {
    navigator.clipboard.writeText(outputText);
    setCopyButtonText("Copied!");
    setTimeout(() => {
      setCopyButtonText("Copy to Clipboard");
    }, 5000);
  };

  const outputText =
    `Things that made me happy ${selectedDay}` +
    ("\n" + text)
      .split("\n")
      .filter((v) => v.length > 0)
      .map(
        (v) =>
          "\n- " +
          v.trimStart().charAt(0).toUpperCase() +
          v.trimStart().slice(1)
      )
      .join("");

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="dark:bg-gray-700 p-4 rounded-md">
        <div>
          {Object.keys(whichDay).map((key) => (
            <label className="pl-2" key={key}>
              <input
                type="radio"
                name="day"
                value={whichDay[key]}
                checked={selectedDay === whichDay[key]}
                onChange={handleRadioChange}
                className="dark:bg-gray-600 dark:text-gray-200"
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
        <textarea
          className="border border-black dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 rounded-md p-2 py-4 mt-2 w-full"
          value={text}
          onChange={handleChange}
        />
      </div>
      <div
        className="pl-6 py-2 whitespace-pre-wrap border dark:border-gray-600 rounded-md hover:cursor-pointer dark:hover:bg-gray-700"
        onClick={handleCopyButton}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCopyButton();
          }
        }}
      >
        {outputText}
      </div>
      <div className="flex w-full items-center justify-center">
        <button
          className="mt-2 p-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800 min-w-50"
          onClick={handleCopyButton}
        >
          {copyButtonText}
        </button>
      </div>
    </div>
  );
}

export default HappyThingsTextField;
