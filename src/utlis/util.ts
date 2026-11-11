export const isExpired = (date: Date): boolean => {
  const tokenMS = date.getTime()
  return Date.now() >= tokenMS;
}

export const minute = (minute: number) => {
  if (minute === 0) return new Date();
  const now = new Date();

  return new Date(now.getTime() + (minute * 60 * 1000))
}
