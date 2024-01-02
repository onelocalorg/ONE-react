export function generateTicketOptions(boundary) {
  const options = [];
  for (let i = 1; i <= boundary; i++) {
    options.push({ value: i, label: `${i} Ticket${i > 1 ? "s" : ""}` });
  }
  return options;
}

// Example usage
//   const ticketOptions = generateTicketOptions(10);
//   console.log(ticketOptions);
