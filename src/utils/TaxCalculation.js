export const calculateTotalTicketPrice = (ticketPrice) => {
  const serviceFee = 1.44; // Service fee in dollars
  const orgTaxPercentage = 3.3; // Organization tax as a percentage
  const stripeFee = 0.33; // Stripe fee in dollars
  const additionalTaxPercentage = 3.3; // Additional tax as a percentage

  let totalCost = ticketPrice + serviceFee;
  let orgTax = (totalCost * orgTaxPercentage) / 100;
  totalCost += orgTax;

  let finalTotalCost = totalCost + stripeFee;
  let additionalTax = (finalTotalCost * additionalTaxPercentage) / 100;
  finalTotalCost += additionalTax;

  // Rounding off to 3 decimal places
  return parseFloat(finalTotalCost.toFixed(3));
};
