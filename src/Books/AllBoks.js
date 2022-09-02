import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";

const ALL_BOOKS = gql`
  query GetBooks {
    getBooks {
      _id
      title
      authorId
      author {
        _id
        name
        createdAt
      }
      createdAt
    }
  }
`;

export default function AllBoks() {
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS);
  refetch();
  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;
  const books = data.getBooks;
  console.log(data.getBooks);
  return (
    <div className="h-[100vh]">
      <div className="m-10">
        <Link className="bg-orange-400   p-2 rounded-lg " to="/CreateBook">
          Create
        </Link>
        <div className="mt-10 flex flex-col gap-5 ">
          {books.map((book, i) => {
            return (
              <Link
                className="bg-slate-200 p-5 rounded-lg"
                to={`/SingleBook/${book._id}`}
                key={i}
              >
                <h1>Title: {book.title}</h1>
                <p className="text-[.5em]">Create at: {book.createdAt}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
