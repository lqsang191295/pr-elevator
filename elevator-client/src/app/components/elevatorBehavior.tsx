import BtnClose from "./btnClose";
import BtnOpen from "./btnOpen";

export default function ElevatorBehavior() {
  return (
    <div className="flex flex-col gap-1">
      <BtnClose />
      <BtnOpen />
    </div>
  );
}
