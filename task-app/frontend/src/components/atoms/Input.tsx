import React from "react";

type InputComponentProps = {
  placeholder?: string;
  value: string; // Ahora el valor es controlado desde el padre
  onChange: (value: string) => void; // Es obligatorio para manejar cambios
  onEnter?: () => void;
};

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder = "Create a new todo ...",
  value,
  onChange,
  onEnter,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value} // Ahora el valor lo controla el padre
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      style={{
        background: "transparent",
        border: "none",
        outline: "none",
        fontSize: "16px",
        padding: "10px",
        width: "100%",
      }}
    />
  );
};

export default InputComponent;
