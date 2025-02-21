import { Attribute } from "../../providers/session.provider";
import { ButtonComponent } from "../button.component";

export function AttributeComponent({
  visible,
  attribute,
  handleIncrement,
  handleDecrement,
}: {
  visible: boolean;
  attribute: Attribute;
  handleIncrement: () => void;
  handleDecrement: () => void;
}) {
  return (
    <div className="flex gap-2 justify-start w-full">
      <p className="font-bold">{attribute.name}</p>
      <p>{attribute.value}</p>
      <p>{attribute.multiplier}</p>
      <div hidden={!visible} className="flex gap-2 w-full">
        <ButtonComponent handleOnClick={handleIncrement}>+</ButtonComponent>
        <ButtonComponent handleOnClick={handleDecrement}>-</ButtonComponent>
      </div>
    </div>
  );
}
