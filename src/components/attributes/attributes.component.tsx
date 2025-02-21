import { useContext } from "react";
import {
  Attribute,
  SessionContext,
  SessionReducerActions,
} from "../../providers/session.provider";
import { AttributeComponent } from "./attribute.component";

export function AttributesComponent({
  visible,
  attributes,
}: {
  visible: boolean;
  attributes: Attribute[];
}) {
  const { dispatch } = useContext(SessionContext);

  const handleIncrement = (id: string) => {
    const totalAttributeValue = attributes.reduce(
      (sum, attr) => sum + attr.value,
      0,
    );

    if (totalAttributeValue >= 70) {
      alert("Total attribute points cannot exceed 70.");
    } else {
      dispatch({
        type: SessionReducerActions.ATTRIBUTE_INCREMENT,
        payload: { id },
      });
    }
  };
  const handleDecrement = (id: string) => {
    dispatch({
      type: SessionReducerActions.ATTRIBUTE_DECREMENT,
      payload: { id },
    });
  };
  return (
    <div className="flex flex-col justify-start items-center rounded-lg bg-green-200 gap-8 p-2 h-full w-full">
      <p className="text-2xl font-bold">Attributes</p>
      {attributes.map((attribute) => (
        <AttributeComponent
          visible={visible}
          handleIncrement={() => handleIncrement(attribute.id)}
          handleDecrement={() => handleDecrement(attribute.id)}
          key={attribute.id}
          attribute={attribute}
        />
      ))}
    </div>
  );
}
