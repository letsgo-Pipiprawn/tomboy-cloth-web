/** Business-day delivery window for in-stock AU orders. */
export function estimateDeliveryWindow(businessDaysMin = 8, businessDaysMax = 18): {
  from: string;
  to: string;
} {
  const addBusinessDays = (start: Date, days: number) => {
    const result = new Date(start);
    let added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      const dow = result.getDay();
      if (dow !== 0 && dow !== 6) added += 1;
    }
    return result;
  };

  const formatter = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
  });

  const from = addBusinessDays(new Date(), businessDaysMin);
  const to = addBusinessDays(new Date(), businessDaysMax);
  return { from: formatter.format(from), to: formatter.format(to) };
}
