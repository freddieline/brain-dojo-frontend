export function getScore(percentageScore: number): number {
  switch (true) {
    case percentageScore >= 90:
      return 1;
    case percentageScore >= 80:
      return 2;
    case percentageScore >= 65:
      return 3;
    case percentageScore >= 50:
      return 4;
    case percentageScore >= 10:
      return 5;
    default:
      return 6;
  }
}

export function getEmoji(score: number): string {
  switch (score) {
    case 1:
      // double fire
      return "🔥🔥";
    case 2:
      // chilli pepper
      return "🌶️";
    case 3:
      // fire
      return "🔥";
    case 4:
      // Sun
      return "☀️";
    case 5:
      // Sun behind cloud
      return "🌤️";
    default:
      // ice cube
      return "🧊";
  }
}

export function getMotivation(score: number): string {
  switch (score) {
    case 1:
      // double fire
      return "Super hot!";
    case 2:
      // chilli pepper
      return "Spicy!";
    case 3:
      // fire
      return "Awesome!";
    case 4:
      // Sun
      return "Good work!";
    case 5:
      // Sun behind cloud
      return "Not bad.";
    default:
      // ice cube
      return "Oh no!";
  }
}
