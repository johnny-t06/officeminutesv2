import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className="flex mt-1.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox h-4 w-4 text-blue-600 rounded-md border-gray-300"
      />
    </div>
  );
};

export default Checkbox;
