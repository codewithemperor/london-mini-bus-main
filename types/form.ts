export type InquiryFormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export type QuoteFormState = {
  tripType?: "return" | "oneway";
  pickupTime: string;
  returnTime: string;
  pickupDate: string;
  pickupPostcode: string;
  dropoffPostcode: string;
  email?: string;
  distanceMiles: string;
  totalDuration: string;
  baseTotalCost?: string;
  totalCost: string;
};
