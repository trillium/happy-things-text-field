import React, { useState } from "react";

function HappyThingsTextField(): React.ReactElement {
  const [text, setText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="bg-slate-400 p-4 m-4">
      <input type="text" value={text} onChange={handleChange} />
      <div>{text}</div>
    </div>
  );
}

export default HappyThingsTextField;
