# Cellular Automaton - Social Influence Simulation

This project is a simple cellular automaton that simulates the spread of influence or ideas in a community. Each cell in a grid represents an individual or a group, with its color symbolizing a particular idea, opinion, or cultural trait. The automaton follows one basic rule: each cell adopts the opinion (color) of a randomly selected neighbor based on probability. Over time, this leads to the diffusion of ideas and the potential formation of consensus or dominant cultures.

This project was inspired by a Reddit post on r/cellular_automata by user AlexanderDudarev, who presented a similar automaton simulating "war" between cells. You can view the original post [here](https://www.reddit.com/r/cellular_automata/comments/1bmicq6/a_simple_cellular_automaton_that_simulates_war/).

## How It Works

- **Grid Initialization**: The grid starts with each cell assigned a random color, representing a different idea, opinion or cultural trait.
- **Update Rule**: During each iteration, every cell selects a random neighbor and based on probability adopts that neighbor’s color, simulating the spread of influence through interaction.
- **Neighborhoods**: Each cell considers its immediate neighbors (up, down, left, right and diagonals) when choosing which idea to adopt.
- **Visualization**: The grid is rendered on an HTML canvas, with each cell displayed as a colored square, representing the diversity of ideas and their diffusion over time.