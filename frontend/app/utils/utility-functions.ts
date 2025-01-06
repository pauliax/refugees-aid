export function translateListingType(listingType: number): string {
  switch (listingType) {
    case 0:
      return "Ask";
    case 1:
      return "Offer";
    default:
      return "Unrecognized type";
  }
}

export function translateListingStatus(status: number): string {
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
