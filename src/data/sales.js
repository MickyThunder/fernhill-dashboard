const AMOUNTS = [620, 540, 710, 480, 830, 910, 760, 690, 1020, 870, 640, 950, 1110, 980];

// One entry per day, Sep 11 to Sep 24.
export const DAILY_SALES = AMOUNTS.map((amount, index) => ({
  date: `2026-09-${String(11 + index).padStart(2, '0')}`,
  amount,
}));

export const PREVIOUS_PERIOD_TOTAL = 9920;
