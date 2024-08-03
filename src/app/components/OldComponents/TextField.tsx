import React from "react";

interface TextFieldProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <div className="mt-2.5">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        required
      />
    </div>
  );
};

export default TextField;
