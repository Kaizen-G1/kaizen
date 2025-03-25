export enum UserRole {
  CUSTOMER = "customer",
  COMPANY = "company",
}

export enum OrderStatus {
  Pending = "Pending",
  AwaitingPickup = "Awaiting Pickup",
  InTransit = "In transit",
  Complete = "Complete",
  Cancelled = "Cancelled",
  Unknown = "Unknown",
}
