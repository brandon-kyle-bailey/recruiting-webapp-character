import { Class } from "../../providers/session.provider";
import { AttributesComponent } from "../attributes/attributes.component";

export function ClassComponent({ ele }: { ele: Class }) {
  return (
    <div className="flex gap-2 justify-start w-full">
      <p className="text-xl font-bold">{ele.name}</p>
      <div hidden>
        <AttributesComponent visible={false} attributes={ele.attributes} />
      </div>
    </div>
  );
}
