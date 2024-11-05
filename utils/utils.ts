export const ValidateForm = (formData: any, selectedType: string): string | null => {
    if (!/^\d{4}$/.test(formData.Postcode)) return "Postcode must be exactly 4 digits.";
    if (!/^\d+$/.test(formData.Bedroom) || parseInt(formData.Bedroom) < 0) {
      return "Bedroom must be a non-negative integer.";
    }
    if (!/^\d+$/.test(formData.Bathroom) || parseInt(formData.Bathroom) < 0) {
      return "Bathroom must be a non-negative integer.";
    }
    if (!/^\d{4}$/.test(formData.YearBuilt)) return "Year Built must be a 4-digit year.";
    if (!/^\d{4}$/.test(formData.YearSold)) return "Year Sold must be a 4-digit year.";
    if (parseInt(formData.YearSold) < parseInt(formData.YearBuilt)) {
      return "Year Sold cannot be earlier than Year Built.";
    }
    if (parseInt(formData.YearSold) > 2023) {
      return "Year Sold cannot be later than 2023.";
    }
    if (selectedType === '') return "Please select a property type.";
    if (!/^\d+$/.test(formData.TotalRooms) || parseInt(formData.TotalRooms) < 0) {
      return "Total Rooms must be a non-negative integer.";
    }
    
    // Check if TotalRooms is less than Bedroom + Bathroom
    const totalRooms = parseInt(formData.TotalRooms);
    const bedrooms = parseInt(formData.Bedroom);
    const bathrooms = parseInt(formData.Bathroom);
  
    if (totalRooms < bedrooms + bathrooms) {
      return "Total Rooms cannot be less than the sum of Bedrooms and Bathrooms.";
    }
  
    return null;
  };
  
  export const validateString = (
    value: unknown,
    maxLength: number
  ): value is string => {
    if (!value || typeof value !== "string" || value.length > maxLength) {
      return false;
    }
  
    return true;
  };
  
  export const getErrorMessage = (error: unknown): string => {
    let message: string;
  
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
      message = String(error.message);
    } else if (typeof error === "string") {
      message = error;
    } else {
      message = "Something went wrong";
    }
  
    return message;
  };
  