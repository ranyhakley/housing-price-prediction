import React from 'react';

interface SliderFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

const SliderField: React.FC<SliderFieldProps> = ({ label, name, value, onChange, min = 0, max = 100 }) => (
  <div>
    <label className="block font-bold">{label}: {value} km</label>
    <input
      type="range"
      name={name}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="w-full"
    />
  </div>
);

export default SliderField;
