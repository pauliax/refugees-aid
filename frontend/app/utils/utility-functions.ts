export const secondsToDays = (seconds?: bigint | string): bigint => {
  if (!seconds) return BigInt(0);

  return BigInt(seconds) / BigInt(24 * 60 * 60); // 86400 seconds in a day
};

export const secondsToHours = (seconds?: bigint | string): bigint => {
  if (!seconds) return BigInt(0);

  return BigInt(seconds) / BigInt(60 * 60); // 3600 seconds in an hour
};

export const translateListingType = (listingType: number): string => {
  switch (listingType) {
    case 0:
      return "Ask";
    case 1:
      return "Offer";
    default:
      return "Unrecognized type";
  }
}

export const translateListingStatus = (status: number): string => {
  switch (status) {
    case 0:
      return "Non-existent";
    case 1:
      return "Active";
    case 2:
      return "Matched";
    case 3:
      return "Delivered";
    case 4:
      return "Cancelled";
    default:
      return "Unrecognized status";
  }
}
