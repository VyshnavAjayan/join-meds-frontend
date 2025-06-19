export function getTimeOfDay() {
  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  }
  return 'Good Evening';
}
