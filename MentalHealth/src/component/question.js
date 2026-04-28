export const questions = [
  {
    id: 1,
    text: "In the past two weeks, how often have you felt sad, down, or hopeless?",
    type: "single",
    options: [
      { text: "Not at all", points: 0 },
      { text: "A few days", points: 1 },
      { text: "More than half the days", points: 2 },
      { text: "Almost every day", points: 3 },
    ],
  },
  {
    id: 2,
    text: "In the past two weeks, how often have you felt anxious, nervous, or on edge?",
    type: "single",
    options: [
      { text: "Not at all", points: 0 },
      { text: "A few days", points: 1 },
      { text: "More than half the days", points: 2 },
      { text: "Almost every day", points: 3 },
    ],
  },
  {
    id: 3,
    text: "Have you experienced any of the following recently? (Select all that apply)",
    type: "multi",
    options: [
      { text: "Trouble sleeping or insomnia", points: 1 },
      { text: "Loss of appetite or overeating", points: 1 },
      { text: "Feeling tired or low energy", points: 1 },
      { text: "None of these", points: 0, exclusive: true }, // exclusive
    ],
  },
  {
    id: 4,
    text: "How often do you have trouble focusing or making decisions?",
    type: "single",
    options: [
      { text: "Never", points: 0 },
      { text: "Sometimes", points: 1 },
      { text: "Often", points: 2 },
      { text: "Almost always", points: 3 },
    ],
  },
  {
    id: 5,
    text: "Do you often feel worthless or guilty about things you’ve done?",
    type: "single",
    options: [
      { text: "Not at all", points: 0 },
      { text: "A few days", points: 1 },
      { text: "More than half the days", points: 2 },
      { text: "Almost every day", points: 3 },
    ],
  },
  {
    id: 6,
    text: "Do you avoid social interactions or feel disconnected from people around you?",
    type: "single",
    options: [
      { text: "Never", points: 0 },
      { text: "Sometimes", points: 1 },
      { text: "Often", points: 2 },
      { text: "Almost always", points: 3 },
    ],
  },
  {
    id: 7,
    text: "Have you had thoughts of hurting yourself or someone else?",
    type: "single",
    options: [
      { text: "Never", points: 0 },
      { text: "Occasionally", points: 1 },
      { text: "Frequently", points: 2 },
      { text: "Constantly or acted on them", points: 3 },
    ],
  },
  {
    id: 8,
    text: "Have you felt that life isn’t worth living or thought about ending your life?",
    type: "single",
    options: [
      { text: "Never", points: 0 },
      { text: "Occasionally", points: 1 },
      { text: "Often", points: 2 },
      { text: "Constantly", points: 3 },
    ],
  },
];
