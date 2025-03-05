export enum UserRole {
  CUSTOMER = "customer",
  COMPANY = "company",
}

export enum OrderStatus {
  All = "All",
  Pending = "Pending",
  AwaitingPickup = "Awaiting Pickup",
  InTransit = "In transit",
  Complete = "Complete",
  Cancelled = "Cancelled",
  Unknown = "Unknown"
}
