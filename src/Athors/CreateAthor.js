import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_ATHORS = gql`
  mutation CreateAuthor($name: String!) {
    createAuthor(name: $name) {
      msg
      status
    }
  }
`;

export default function CreateAthor() {
  const [submit] = useMutation(CREATE_ATHORS);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const submitAthor = async () => {
    try {
      const {
        data: {
          createAuthor: { status, msg },
        },
      } = await submit({
        variables: { name: inputValue },
      });

      console.log(status);
      console.log(msg);
      if (msg == "ok") navigate("/AllAthors");
    } catch (error) {}
  };

  return (
    <div className="flex h-[80vh]">
      <div className="m-auto bg-slate-300 flex gap-5 rounded-lg flex-col p-5">
        <div>
          <label>Name:</label>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </div>

        <button
          className="bg-green-600 rounded-lg p-2"
          onClick={() => submitAthor()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
