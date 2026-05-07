import axios from "axios";

export interface BookingDetails {
  packageName: string;
  date: string;
  time: string;
  guests: number;
  totalCost: number;
  address: string;
}

export const sendBookingEmail = async (email: string, details: BookingDetails) => {
  try {
    const response = await axios.post("/api/send-confirmation", {
      email,
      bookingDetails: details
    });
    return response.data;
  } catch (error) {
    console.error("Failed to send booking email:", error);
    return { success: false, error };
  }
};
