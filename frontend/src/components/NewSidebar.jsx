import React from "react";
import img from "../assets/img3.png";

const NewSidebar = ({ data, handleLiClick }) => {
  return (
    <div className="fixed h-screen bg-gray-800 text-white mt-6 rounded-lg w-64 transition-transform duration-300">
      <div className="flex flex-row mt-8 justify-between">
        <img className="w-14 ml-2" src={img} alt="" />
        <h1 className=" font-bold  my-auto mr-24 text-gray-100  text-2xl">
          chatBot
        </h1>
      </div>
      <ul className="p-4 mt-6 list-disc ml-2">
        {data.map((msg) => (
          <li key={msg._id} className="mb-2">
            <a
              href="#"
              className="hover:text-gray-300"
              onClick={() => handleLiClick(msg._id)}
            >
              {msg.question.length > 20
                ? `${msg.question.substring(0, 20)}...`
                : msg.question}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewSidebar;
