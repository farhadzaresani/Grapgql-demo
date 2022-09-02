import React from "react";

function HomePage({ data, onclick }) {
  return (
    <div className="h-full flex gap-20 p-20 flex-col justify-center items-center">
      <h1 className="text-2xl">{JSON.stringify(data)}</h1>
      <button className="bg-orange-400 p-2 rounded-lg" onClick={onclick}>
        {" "}
        click me{" "}
      </button>
    </div>
  );
}

export default HomePage;
