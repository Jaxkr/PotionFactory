var tour = {
  id: "potionfactory-tour",
  steps: [
    {
      title: "Welcome to Potion Factory!",
      content: "This brief tour will show you around the game. Press \"next\" to continue.",
      target: "infobox",
      placement: "right"
    },
    {
      title: "This is your energy.",
      content: "In Potion Factory, all actions require energy to perform. Pay attention to this number so you don't run short! Press \"next\" to learn how to generate energy.",
      target: "energy-string",
      placement: "top"
    },
    {
      title: "Your energy crank.",
      content: "Click this button to generate energy. Give it 10-20 nice clicks.",
      target: 'turn-crank',
      placement: "bottom"
    },
    {
      title: "Research",
      content: "This is where you can spend energy to research new things. This allows you to generate more energy to power your factory!",
      target: 'researchbox',
      placement: "top"
    },
    {
      title: "Actions",
      content: "This is where you can command golems to gather ingredients for you! Get enough energy, then press \"Go\" to gather some water!",
      target: 'actions',
      placement: "right"
    },
    {
      title: "Golems",
      content: "Every action in Potion Factory is carried out by your loyal golems! This box shows all current golem actions, as well as any automated golem actions (but don't worry about that for now).",
      target: 'golembox',
      placement: "left"
    },
    {
      title: "Recipes",
      content: "When you discover a recipe it's added to your recipe box for easy crafting and automation in the future.<br>This concludes this tour! Have fun!",
      target: 'recipebox',
      placement: "left"
    },
  ]
};
