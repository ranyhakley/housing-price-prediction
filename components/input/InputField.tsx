import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block font-bold">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded p-2 w-full text-black"
      required
    />
  </div>
);

export default InputField;
