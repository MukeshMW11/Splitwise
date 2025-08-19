import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),

  description: z.string().min(1, "Description is required"),

  amount: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().positive("Amount must be a positive number")
  ),

  split_type: z.enum(["equally", "unequally", "percentage"] as const, {
    message: "Split type is required",
  }),

  participants: z
    .array(z.string())
    .min(1, "At least one participant is required"),

  payers_data: z
    .array(
      z.object({
        user_id: z.string().min(1, "Payer is required"),

        paid_amount: z.preprocess(
          (val) => (typeof val === "string" ? parseFloat(val) : val),
          z.number().nonnegative("Paid amount must be non-negative")
        ),

        actual_amount: z.preprocess(
          (val) => (typeof val === "string" ? parseFloat(val) : val),
          z.number().nonnegative("Actual amount must be non-negative")
        ),
      })
    )
    .min(1, "At least one payer is required"),
}).refine((data) => {
  // Validation: For unequal splits, ensure all participants are in payers_data
  if (data.split_type === "unequally") {
    const participantIds = new Set(data.participants);
    const payerIds = new Set(data.payers_data.map(p => p.user_id));
    
    // Check if all participants are represented in payers_data
    for (const participantId of participantIds) {
      if (!payerIds.has(participantId)) {
        return false;
      }
    }
    
    // Check if actual_amounts sum to total amount
    const totalActualAmount = data.payers_data.reduce((sum, payer) => sum + payer.actual_amount, 0);
    const tolerance = 0.01; // Allow small rounding differences
    if (Math.abs(totalActualAmount - data.amount) > tolerance) {
      return false;
    }
  }
  
  // Validation: paid_amounts should sum to total amount
  const totalPaidAmount = data.payers_data.reduce((sum, payer) => sum + payer.paid_amount, 0);
  const tolerance = 0.01;
  return Math.abs(totalPaidAmount - data.amount) <= tolerance;
}, {
  message: "For unequal splits, all participants must be in payers_data with actual_amounts that sum to the total amount. Paid amounts must also sum to the total amount.",
});