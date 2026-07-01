export type InquiryFormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export type QuoteFormState = {
  pickupTime: string;
  returnTime: string;
  pickupDate: string;
  pickupPostcode: string;
  dropoffPostcode: string;
  email?: string;
  distanceMiles: string;
  totalDuration: string;
  totalCost: string;
};
