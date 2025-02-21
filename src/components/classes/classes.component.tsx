import { Class } from "../../providers/session.provider";
import { ClassComponent } from "./class.component";

export function ClassesComponent({ classes }: { classes: Class[] }) {
  return (
    <div className="flex flex-col justify-start items-center rounded-lg bg-blue-200 gap-8 p-2 h-full w-full">
      <p className="text-2xl font-bold">Classes</p>
      {classes.map((ele) => (
        <ClassComponent key={ele.id} ele={ele} />
      ))}
    </div>
  );
}
