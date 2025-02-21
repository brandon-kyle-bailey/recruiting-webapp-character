import { Skill } from "../../providers/session.provider";
import { ButtonComponent } from "../button.component";

export function SkillCheckComponent({ skills }: { skills: Skill[] }) {
  return (
    <div className="flex flex-col justify-evenly bg-green-200 rounded-lg p-2 gap-4">
      <p className="text-2xl font-bold">Skill Check</p>
      <div className="flex flex-row gap-4">
        <select className="bg-white rounded-lg p-2">
          {skills.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
        <input
          className="bg-white rounded-lg p-2"
          type="number"
          placeholder="Modifier"
        />
        <ButtonComponent
          handleOnClick={() => {
            console.log("roll");
          }}
        >
          Roll
        </ButtonComponent>
      </div>
    </div>
  );
}
