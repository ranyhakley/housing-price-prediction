// PropertyTypeSelector.tsx
import React, { ChangeEvent } from 'react';

interface PropertyTypeSelectorProps {
  selectedType: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({ selectedType, onChange }) => (
  <div>
    <label className="block font-bold">Type:</label>
    <div className="flex space-x-4">
      {["House", "Unit", "Townhouse"].map((type) => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="radio"
            name="Type"
            value={type}
            checked={selectedType === type}
            onChange={onChange}  // Pass the event to the onChange handler
            className="form-radio"
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  </div>
);

export default PropertyTypeSelector;
