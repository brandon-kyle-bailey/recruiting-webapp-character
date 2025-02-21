import { useContext } from "react";
import {
  SessionContext,
  SessionReducerActions,
  Skill,
} from "../../providers/session.provider";
import { AttributeComponent } from "../attributes/attribute.component";
import { ButtonComponent } from "../button.component";

export function SkillComponent({
  skill,
  handleSkillIncrement,
  handleSkillDecrement,
}: {
  skill: Skill;
  handleSkillIncrement: () => void;
  handleSkillDecrement: () => void;
}) {
  const { dispatch } = useContext(SessionContext);

  const handleIncrement = (id: string) => {
    dispatch({
      type: SessionReducerActions.ATTRIBUTE_INCREMENT,
      payload: { id },
    });
  };
  const handleDecrement = (id: string) => {
    dispatch({
      type: SessionReducerActions.ATTRIBUTE_DECREMENT,
      payload: { id },
    });
  };
  return (
    <div className="flex gap-2 justify-start w-full">
      <div className="w-full flex gap-2">
        <p className="font-bold">{skill.name}</p>
        <p>{skill.value}</p>
        <div className="flex gap-2 w-full">
          <ButtonComponent handleOnClick={handleSkillIncrement}>
            +
          </ButtonComponent>
          <ButtonComponent handleOnClick={handleSkillDecrement}>
            -
          </ButtonComponent>
        </div>
      </div>
      <AttributeComponent
        visible={true}
        handleIncrement={() => handleIncrement(skill.attributeModifier.id)}
        handleDecrement={() => handleDecrement(skill.attributeModifier.id)}
        key={skill.attributeModifier.id}
        attribute={skill.attributeModifier}
      />
    </div>
  );
}
