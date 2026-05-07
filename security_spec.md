# Dastarrkhwan Security Specification

## Data Invariants
1. **User Identity**: Users can only manage their own profile and bookings.
2. **Booking Ownership**: `bookings/{id}.userId` must match `request.auth.uid`.
3. **Immutability**: `createdAt` and `userId` in bookings cannot be changed after creation.
4. **Status Control**: Users can create bookings with 'pending' status. Only system/admin (or future caterer flow) can update status to 'confirmed'.
5. **Caterer Visibility**: Caterers and Packages are readable by everyone, but writable only by admins.

## The Dirty Dozen Payloads (Negative Tests)
1. **Identity Spoofing**: Attempt to create a booking with someone else's `userId`.
2. **Price Manipulation**: Attempt to set a custom `totalCost` that doesn't match the package/guest logic (though rules can't calculate perfectly, we can check basic bounds).
3. **Status Escalation**: User attempting to set `status: 'confirmed'` during creation.
4. **Junk IDs**: Attempt to use 1KB strings as `catererId`.
5. **Shadow Updates**: Attempt to update a booking and add an `isVerified: true` field.
6. **Privilege Escalation**: User attempting to update their own `role` to 'admin'.
7. **PII Leak**: Attempt to read another user's private profile.
8. **Orphaned Booking**: Create a booking for a non-existent `catererId`.
9. **Backdated Booking**: Attempt to set `createdAt` to a date in the past.
10. **Excessive List Size**: Attempt to add 1000 items to a package's items list.
11. **Guest Count Poisoning**: Set `guests: -1` or `guests: 1000000`.
12. **Unauthorized Caterer Edit**: Non-admin attempting to change a caterer's rating.

## Verification
I will implement `firestore.rules` to block all these.
