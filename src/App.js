import { useQuery, gql, useMutation } from "@apollo/client";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import AllBooks from "./Books/AllBoks";
import SingleBook from "./Books/SingleBooks";
import CreateBook from "./Books/CreateBook";
import EditBook from "./Books/EditBook";
import AllAthors from "./Athors/AllAthors";
import CreateAthor from "./Athors/CreateAthor";
import SingleAthor from "./Athors/SingleAthor";
import Home from "./Home";
import HomePage from "./Components/HomePage";

const GET_AUTHORS = gql`
  query Query {
    hello
    anotherQuery
  }
`;

const MY_MUTATION = gql`
  mutation Mutation {
    myMutation
  }
`;

function App() {
  const [submit] = useMutation(MY_MUTATION);
  const { loading, error, data, refetch } = useQuery(GET_AUTHORS);

  // console.log(data);

  const onclick = async () => {
    try {
      const {
        data: { myMutation },
      } = await submit();

      console.log(myMutation);
      if (myMutation == "success") refetch();
    } catch (error) {}
  };

  if (loading) return <div>loading</div>;
  if (error) return <div> error </div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path="/"
            element={<HomePage data={data} onclick={onclick} />}
          />
          <Route path="CreateAthor" element={<CreateAthor />} />
          <Route path="AllBooks" element={<AllBooks />} />
          <Route path="SingleBook/:authorId" element={<SingleBook />} />
          <Route path="EditBook" element={<EditBook />} />
          <Route path="CreateBook" element={<CreateBook />} />
          <Route path="AllAthors" element={<AllAthors />} />
          <Route path="SingleAthor/:_id" element={<SingleAthor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
