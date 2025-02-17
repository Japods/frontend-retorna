import iconCheck from "../../assets/icon-check.svg";

type CheckboxComponentProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  checked,
  onChange,
}) => {
  const toggleCheckbox = () => {
    onChange(!checked);
  };

  return (
    <div
      className={`cursor-pointer flex items-center justify-center w-7 h-7 rounded-full transition-all border ${
        checked ? "" : "border-gray-300 hover:border-transparent"
      }`}
      style={{
        background: checked ? "var(--check-background)" : "",
        borderColor: !checked ? "var(--check-background)" : "",
      }}
      onClick={toggleCheckbox}
    >
      {checked && <img src={iconCheck} alt="Checked" className="w-3 h-3" />}
    </div>
  );
};

export default CheckboxComponent;
