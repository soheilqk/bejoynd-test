import { Provider } from "mobx-react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStore } from "../../store";
import Favorites from "../favorites";
import Poem from "../poem";
import PoemList from "../poem_list";

const App = () => {
  const store = useStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PoemList />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/:poemTitle" element={<Poem />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
