## Particles 

### Background and Overview

Particles is a molecular inspired animation that allows the user to interact with particles on a canvas and manipulate their relationships to other particles based on proximity.


### Functionality & MVP  

In Particles, users will be able to:

- [ ] Create new particles
- [ ] Hover over existing particles and manipulate their attachments to other particles

In addition, this project will include:

- [ ] An About modal describing the basic functionality

### Wireframes

![](https://preview.ibb.co/eytKed/New_Mockup_1.png)

This app will consist of a single screen with the simulation canvas, options for the hover effect (repulsion/grab), and nav links to the Github, my LinkedIn, and the About and Details modals.  

The hover effect options will be a switch that changes the functionality of hovering over the canvas.


### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,

In addition to the webpack entry file, there will be one other script involved in this project:

`particles.js`: This script will house the entire functionality of the particles.

### Implementation Timeline

**Over the weekend**:
- [x] Completed Canvas Tutorial

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 4 scripts outlined above.  Goals for the day:

- [x] Get `webpack` serving files and frame out index.html
- [x] Outline how to implement the functionality of the particles.
- [x] Set up the canvas

**Day 2**: Create the particle objects and allow them to float around the page. Goals for the day:

- [x] randomly generate particles and allow them to move around the page.

**Day 3**: Create the logic backend. Build out how the particles are going to be interacting.  Goals for the day:

- [x] Create lines that attach the particles based on the distance between the two particles.

**Day 4**: Install the option to change the hover effect. Goals for the day:

- [x] Implement the option to switch between grab and disperse.

### Bonus features

There are many directions in which this project could evolve.

- [ ] Alter speed of particles
- [ ] Adding more particles on click handler
