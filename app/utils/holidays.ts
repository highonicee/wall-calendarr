// app/utils/holidays.ts
// Indian + Global holidays mapped as { [month]: { [day]: string } }
// month is 0-indexed (0 = January, 11 = December)

export type HolidayMap = {
  [month: number]: {
    [day: number]: string; // holiday name
  };
};

export const HOLIDAYS: HolidayMap = {
  // january
  0: {
    1:  "New Year's Day",
    14: "Makar Sankranti",
    15: "Pongal",
    23: "Netaji Subhas Chandra Bose Jayanti",
    26: "Republic Day",
  },

  // february
  1: {
    14: "Valentine's Day",
    19: "Chhatrapati Shivaji Maharaj Jayanti",
    26: "Maha Shivaratri",  
  },

  // march
  2: {
    8:  "International Women's Day",
    14: "Holi (Holika Dahan)",
    15: "Holi",
    22: "Bihar Diwas",
    25: "Good Friday (approx)",
  },

  // april
  3: {
    1:  "April Fool's Day",
    5:  "Ram Navami",
    10: "Mahavir Jayanti",
    14: "Dr. Ambedkar Jayanti / Tamil New Year",
    18: "Good Friday",
    20: "Easter Sunday",
    22: "Earth Day",
  },

  //may
  4: {
    1:  "International Labour Day",
    9:  "Rabindranath Tagore Jayanti",
    11: "Mother's Day",
    12: "Buddha Purnima",
    23: "World Turtle Day",
  },

  // june
  5: {
    1:  "World Milk Day",
    5:  "World Environment Day",
    15: "Father's Day",
    21: "International Yoga Day / World Music Day",
    27: "Eid al-Adha (approx)",
  },

  // july
  6: {
    1:  "Doctor's Day (India)",
    4:  "Independence Day (USA)",
    6:  "Muharram (approx)",
    17: "World Emoji Day",
  },

  // august
  7: {
    5:  "Friendship Day",
    15: "Independence Day (India)",
    16: "Janmashtami (approx)",
    20: "Sadbhavna Diwas",
    29: "National Sports Day",
  },

  // september
  8: {
    2:  "Ganesh Chaturthi (approx)",
    5:  "Teachers' Day (India)",
    16: "Eid Milad-un-Nabi (approx)",
    21: "UN International Day of Peace",
    27: "World Tourism Day",
  },

  // october
  9: {
    2:  "Gandhi Jayanti / World Non-Violence Day",
    5:  "World Teachers' Day",
    10: "World Mental Health Day",
    12: "Dussehra (approx)",
    20: "World Statistics Day",
    24: "United Nations Day",
    31: "Halloween / Sardar Patel Jayanti",
  },

  // november
  10: {
    1:  "Diwali (approx)",
    2:  "Bhai Dooj (approx)",
    5:  "Guru Nanak Jayanti (approx)",
    14: "Children's Day (India) / Jawaharlal Nehru Birthday",
    19: "International Men's Day",
  },

  // dec
  11: {
    1:  "World AIDS Day",
    3:  "World Disability Day",
    10: "Human Rights Day",
    22: "National Mathematics Day",
    24: "Christmas Eve",
    25: "Christmas Day",
    31: "New Year's Eve",
  },
};

// Helper returns holiday name for a given month+day, or null
export function getHoliday(month: number, day: number): string | null {
  return HOLIDAYS[month]?.[day] ?? null;
}