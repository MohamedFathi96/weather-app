type Props = {
  checked: boolean;
  name: string;
  updateStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToggleButton = ({ checked, name, updateStatus }: Props) => {
  return (
    <label className="me-5 inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        value=""
        className="peer sr-only"
        checked={checked}
      />
      <div
        onClick={() => updateStatus(!checked)}
        className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"
      ></div>
      <span className="ms-3 text-sm font-medium dark:text-gray-300">
        {name}
      </span>
    </label>
  );
};

export default ToggleButton;
