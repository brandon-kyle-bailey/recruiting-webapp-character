import { Character } from "../../providers/session.provider";
import { AttributesComponent } from "../attributes/attributes.component";
import { ClassesComponent } from "../classes/classes.component";
import { SkillCheckComponent } from "../skills/skill-check.component";
import { SkillsComponent } from "../skills/skills.component";

export function CharacterComponent({ character }: { character: Character }) {
  return (
    <div className="rounded-lg bg-pink-200 p-4 flex flex-col justify-center gap-8">
      <p className="text-2xl font-bold">{character.id}</p>
      <SkillCheckComponent skills={character.skills} />
      <div className="flex bg-pink-400 rounded-lg justify-evenly p-2 gap-2">
        <AttributesComponent visible={true} attributes={character.attributes} />
        <ClassesComponent classes={character.classes} />
        <SkillsComponent skills={character.skills} />
      </div>
    </div>
  );
}
