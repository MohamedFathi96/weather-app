type Props = {
  checked: boolean;
  name: string;
  updateStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToggleButton = ({ checked, name, updateStatus }: Props) => {
  return (
    <label className="inline-flex rotate-90 cursor-pointer items-center">
      <input
        type="checkbox"
        value=""
        className="peer sr-only"
        checked={checked}
      />
      <div
        onClick={() => updateStatus(!checked)}
        className="peer-checked:bg-blue-400-600 peer relative h-6 w-11 rounded-full bg-sky-500 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"
      ></div>
      <span className="ms-3 text-sm font-medium dark:text-gray-300">
        {name}
      </span>
    </label>
  );
};

export default ToggleButton;
