import React, { useRef, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
const ALL_ATHORS = gql`
  query GetAuthors {
    getAuthors {
      _id
      name
      books {
        createdAt
        authorId
        title
        _id
      }
      createdAt
    }
  }
`;
const CREATE_BOOK = gql`
  mutation Mutation($title: String!, $authorId: ID!) {
    createBook(title: $title, authorId: $authorId) {
      msg
      status
    }
  }
`;

export default function CreateBook() {
  const [authorId, setAuthorId] = useState();
  const [bookTitle, setBookTitle] = useState();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(ALL_ATHORS);
  const [create] = useMutation(CREATE_BOOK);
  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;
  const createBook = async () => {
    try {
      const {
        data: {
          createBook: { msg, status },
        },
      } = await create({
        variables: {
          title: bookTitle,
          authorId: authorId,
        },
      });
      console.log(msg);
      console.log(status);
      navigate("/AllBooks");
    } catch (error) {}
  };

  const allAuthors = JSON.parse([JSON.stringify(data.getAuthors)]);
  // console.log(allAuthors);
  console.log(authorId);
  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;
  return (
    <div className="bg-slate-200 flex gap-10 p-4 rounded-lg flex-col w-[60%] mx-auto mt-20">
      <input
        className="border-[2px] rounded-lg p-2"
        type={"text"}
        onChange={(e) => setBookTitle(e.target.value)}
      />

      <select
        className="w-[30%] rounded-lg"
        onChange={(e) => setAuthorId(e.target.value)}
      >
        <option>Select One...</option>
        {allAuthors.map((option, i) => {
          return (
            <option value={option._id} key={i}>
              {option.name}
            </option>
          );
        })}
      </select>
      <button
        className="bg-blue-500 p-3 rounded-lg w-[20%] mx-auto"
        onClick={() => createBook()}
      >
        Create
      </button>
    </div>
  );
}
