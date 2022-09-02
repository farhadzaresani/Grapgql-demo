import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

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

export default function AllAthors() {
  const { loading, error, data, refetch } = useQuery(ALL_ATHORS);

  refetch();
  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;

  const allData = JSON.parse([JSON.stringify(data.getAuthors)]);
  console.log(allData);

  return (
    <div className="flex flex-col ">
      <Link
        className=" bg-green-500 rounded-lg w-[9em] flex justify-center items-center py-2   m-10 mt-10"
        to="/CreateAthor"
      >
        Create Authors
      </Link>
      <div className="m-10 gap-3 flex flex-col">
        {allData.map((item, i) => {
          console.log(item.name);
          return (
            <Link
              className="bg-slate-300 rounded-lg p-3 hover:bg-slate-200"
              to={`/SingleAthor/${item._id}`}
              key={i}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
