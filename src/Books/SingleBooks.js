import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_BOOK = gql`
  query Author($id: ID!) {
    getBook(_id: $id) {
      _id
      title
      authorId
      createdAt
    }
  }
`;

const EDIT_BOOK = gql`
  mutation EditBook($id: ID!, $title: String!) {
    editBook(_id: $id, title: $title) {
      msg
      status
    }
  }
`;

export default function SingleBooks() {
  const [editModal, setEditModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const params = useParams();

  const [editBook] = useMutation(EDIT_BOOK);

  const { loading, error, data, refetch } = useQuery(GET_BOOK, {
    variables: { id: params.authorId },
  });

  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;
  const bookData = data.getBook;

  const newBookData = async () => {
    try {
      const {
        data: {
          editBook: { msg, status },
        },
      } = await editBook({
        variables: { id: params.authorId, title: newTitle },
      });
      console.log(msg);
      console.log(status);

      if (msg == "ok") return refetch(), setEditModal(false);
    } catch (error) {}
  };

  console.log(params.authorId);
  // console.log(data.getBook);

  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;
  return (
    <div>
      <div className={`${editModal ? "opacity-50" : ""}`}>
        <div className=" m-10 flex flex-col gap-5">
          <h1 className="text-bol">Title:{bookData.title}</h1>
          <p className="text-sm opacity-50">Createt at:{bookData.createdAt}</p>
        </div>
        <button
          onClick={() => setEditModal(true)}
          className="bg-orange-500 p-2 rounded-lg m-10"
        >
          Edit
        </button>
      </div>
      {!editModal ? null : (
        <div className=" absolute w-full flex top-20  ">
          <div className="bg-slate-300  rounded-lg  m-auto ">
            <button
              onClick={() => setEditModal(false)}
              className=" bg-black text-[15px] text-white rounded-full w-[1.25em] h-[1.25em]"
            >
              X
            </button>
            <div className="gap-4 flex flex-col p-10">
              <input
                placeholder={`${bookData.title}`}
                type="text"
                className="p-2"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button
                onClick={() => newBookData()}
                className="bg-green-500 p-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
