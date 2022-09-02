import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    getAuthor(_id: $id) {
      _id
      name
      createdAt
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation EditAuthor($id: ID!, $name: String!) {
    editAuthor(_id: $id, name: $name) {
      msg
      status
    }
  }
`;
export default function SingleAthor() {
  const params = useParams();
  const id = params._id;
  const [onEdit, SetOnEdit] = useState(false);
  const [newName, setNewName] = useState("");

  const [edit] = useMutation(EDIT_AUTHOR);

  const { loading, error, data, refetch } = useQuery(GET_AUTHOR, {
    variables: { id: id },
  });

  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;
  const athorData = data.getAuthor;
  console.log(data);
  const editAut = async () => {
    try {
      const {
        data: {
          editAuthor: { msg, status },
        },
      } = await edit({
        variables: { id: id, name: newName },
      });
      SetOnEdit(false);
      console.log(msg);
      if (msg == "ok") refetch();
      console.log(status);
    } catch (error) {}
  };
  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;

  return (
    <div className="mt-20 ">
      {onEdit ? (
        <div className="m-auto flex gap-5 p-5 rounded-sm flex-col w-[40%] bg-slate-300">
          <input
            placeholder={`${athorData.name}`}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            className="bg-green-500 m-auto p-1 rounded-sm w-[20%]"
            onClick={() => editAut()}
          >
            submit
          </button>
        </div>
      ) : (
        <div className="m-auto flex gap-5 p-5 rounded-sm flex-col w-[40%] bg-slate-300">
          <h1 className="text-bold">Name: {athorData.name}</h1>
          <p className="text-sm opacity-50">
            Created at: {athorData.createdAt}
          </p>
          <button
            className="bg-orange-500 p-1 rounded-sm w-[10vw]"
            onClick={() => SetOnEdit(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
