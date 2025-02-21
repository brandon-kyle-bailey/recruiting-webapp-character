import { useContext } from "react";
import {
  SessionContext,
  SessionReducerActions,
  Skill,
} from "../../providers/session.provider";
import { SkillComponent } from "./skill.component";

export function SkillsComponent({ skills }: { skills: Skill[] }) {
  const { dispatch } = useContext(SessionContext);

  const handleIncrement = (id: string) => {
    dispatch({
      type: SessionReducerActions.SKILL_INCREMENT,
      payload: { id },
    });
  };
  const handleDecrement = (id: string) => {
    dispatch({
      type: SessionReducerActions.SKILL_DECREMENT,
      payload: { id },
    });
  };
  return (
    <div className="flex flex-col justify-start items-center rounded-lg bg-red-200 gap-8 p-2 h-full w-full">
      <p className="text-2xl font-bold">Skills</p>
      <p>Total skill points available: 10</p>
      {skills.map((skill) => (
        <SkillComponent
          handleSkillIncrement={() => handleIncrement(skill.id)}
          handleSkillDecrement={() => handleDecrement(skill.id)}
          key={skill.id}
          skill={skill}
        />
      ))}
    </div>
  );
}
