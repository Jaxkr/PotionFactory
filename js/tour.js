var tour = {
  id: "potionfactory-tour",
  steps: [
    {
      title: "Welcome to Potion Factory!",
      content: "This brief tour will show you around the game. Press next to continue.",
      target: "infobox",
      placement: "right"
    },
    {
      title: "My content",
      content: "Here is where I put my content.",
      target: 'turn-crank',
      placement: "bottom"
    }
  ]
};

// Start the tour!
hopscotch.startTour(tour);
