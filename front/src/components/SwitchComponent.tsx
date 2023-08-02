import { Fragment } from "react";
import { Switch } from "@headlessui/react";

interface switchProps {
  changeFunc: (checked: number) => void;
  index: number;
}

const SwitchTailwind = ({ changeFunc, index }: switchProps) => {
  return (
    <Switch
      onChange={() => {
        changeFunc(index);
      }}
      as={Fragment}
    >
      {({ checked }) => {
        /* Use the `checked` state to conditionally style the button. */
        return (
          <button className={`${checked ? "bg-blue-500" : "bg-red-500"} relative inline-flex h-5 w-11 items-center rounded-full`}>
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                checked ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </button>
        );
      }}
    </Switch>
  );
};

export default SwitchTailwind;
