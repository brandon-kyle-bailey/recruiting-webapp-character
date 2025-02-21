"use client";
import * as React from "react";
import { createContext, Dispatch, useReducer } from "react";
import { v4 } from "uuid";

export interface Attribute {
  id: string;
  name: string;
  value: number;
  multiplier: number;
}

export interface Class {
  id: string;
  name: string;
  attributes: Attribute[];
}

export interface Skill {
  id: string;
  name: string;
  value: number;
  attributeModifier: Attribute;
}

export interface Character {
  id: string;
  attributes: Attribute[];
  classes: Class[];
  skills: Skill[];
}

export interface State {
  characters: Character[];
}

export interface Action {
  type: string;
  payload?: unknown;
}

const ATTRIBUTES = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
];

const SKILLS = [
  "Acrobatics",
  "Animal Handling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "Sleight of Hand",
  "Stealth",
  "Survival",
];

const CLASSES = ["Barbarian", "Bard", "Wizard"];

CLASSES.map((className) => {
  return {
    id: v4(),
    name: className,
    attributes: ATTRIBUTES.map((name) => {
      return {
        id: v4(),
        name,
        value: 0,
        multiplier: 0,
      };
    }),
  };
});

const characters: Character[] = CLASSES.map((className) => {
  return {
    id: v4(),
    name: className,
    skills: SKILLS.map((name) => {
      return {
        id: v4(),
        name,
        value: 0,
        attributeModifier: {
          id: v4(),
          name,
          value: 0,
          multiplier: 0,
        },
      };
    }),
    classes: CLASSES.map((className) => {
      return {
        id: v4(),
        name: className,
        attributes: ATTRIBUTES.map((name) => {
          return {
            id: v4(),
            name,
            value: 0,
            multiplier: 0,
          };
        }),
      };
    }),
    attributes: ATTRIBUTES.map((name) => {
      return {
        id: v4(),
        name,
        value: 10,
        multiplier: 0,
      };
    }),
  };
});

const initialState: State = {
  characters,
};

export const SessionContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export enum SessionReducerActions {
  PERSIST_SESSION = "PERSIST_SESSION",
  ATTRIBUTE_INCREMENT = "ATTRIBUTE_INCREMENT",
  ATTRIBUTE_DECREMENT = "ATTRIBUTE_DECREMENT",
  SKILL_INCREMENT = "SKILL_INCREMENT",
  SKILL_DECREMENT = "SKILL_DECREMENT",
}

const sessionReducerActionsMap = new Map([
  [
    SessionReducerActions.ATTRIBUTE_INCREMENT,
    (state: State, action: Action) => ({
      ...state,
      characters: state.characters.map((character) => {
        const totalAttributeValue = character.attributes.reduce(
          (sum, attribute) => sum + attribute.value,
          0,
        );

        return {
          ...character,
          attributes: character.attributes.map((attribute) => {
            const isTargetAttribute =
              attribute.id === (action.payload as { id: string }).id;
            if (isTargetAttribute && totalAttributeValue < 70) {
              return { ...attribute, value: attribute.value + 1 };
            }
            return attribute;
          }),
        };
      }),
    }),
  ],
  [
    SessionReducerActions.ATTRIBUTE_DECREMENT,
    (state: State, action: Action) => ({
      ...state,
      characters: state.characters.map((character) => ({
        ...character,
        attributes: character.attributes.map((attribute) =>
          attribute.id === (action.payload as { id: string }).id
            ? { ...attribute, value: Math.max(0, attribute.value - 1) }
            : attribute,
        ),
      })),
    }),
  ],
  [
    SessionReducerActions.SKILL_INCREMENT,
    (state: State, action: Action) => ({
      ...state,
      characters: state.characters.map((character) => ({
        ...character,
        skills: character.skills.map((skill) =>
          skill.id === (action.payload as { id: string }).id
            ? { ...skill, value: skill.value + 1 }
            : skill,
        ),
      })),
    }),
  ],
  [
    SessionReducerActions.SKILL_DECREMENT,
    (state: State, action: Action) => ({
      ...state,
      characters: state.characters.map((character) => ({
        ...character,
        skills: character.skills.map((skill) =>
          skill.id === (action.payload as { id: string }).id
            ? { ...skill, value: Math.max(0, skill.value - 1) }
            : skill,
        ),
      })),
    }),
  ],
  [
    SessionReducerActions.PERSIST_SESSION,
    (state: State, action: Action) => {
      (async () => {
        try {
          console.log(action);
          await fetch(
            "https://recruiting.verylongdomaintotestwith.ca/api/brandon-kyle-bailey/character",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(state),
            },
          );
        } catch (error) {
          console.log(error);
        }
      })();
      return state;
    },
  ],
]);

const sessionReducer = (state: State, action: Action): State => {
  console.log("dispatched event:", state, action);
  if (sessionReducerActionsMap.has(action.type as SessionReducerActions)) {
    return sessionReducerActionsMap.get(action.type as SessionReducerActions)!(
      state,
      action,
    );
  }
  return state;
};

const createInitialState = (): State => {
  let state: State = {
    characters,
  };
  (async () => {
    try {
      const response = await fetch(
        "https://recruiting.verylongdomaintotestwith.ca/api/brandon-kyle-bailey/character",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      state = { characters: data.characters ?? characters };
    } catch (error) {
      console.log(error);
    }
  })();
  return state;
};

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    sessionReducer,
    null,
    createInitialState,
  );
  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
}
