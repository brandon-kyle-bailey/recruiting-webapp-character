"use client";
import { useContext } from "react";
import "./App_out.css";
import { ButtonComponent } from "./components/button.component";
import { CharacterComponent } from "./components/characters/character.component";
import {
  SessionContext,
  SessionReducerActions,
} from "./providers/session.provider";

function App() {
  const { state, dispatch } = useContext(SessionContext);
  function handleOnClick() {
    dispatch({
      type: SessionReducerActions.PERSIST_SESSION,
    });
  }
  return (
    <div className="App p-2 flex flex-row justify-center text-center items-center gap-8">
      <h1 className="text-4xl font-bold">Class sheet</h1>
      <ButtonComponent handleOnClick={handleOnClick}>Save</ButtonComponent>
      <div className="flex flex-col justify-center gap-8 w-full">
        {state.characters.map((character) => (
          <CharacterComponent key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

export default App;
