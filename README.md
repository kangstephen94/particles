# Particles
[See it Live!](https://kangstephen94.github.io/particles/)

### Background and Overview

Particles is a molecular inspired animation that allows the user to interact with particles on a canvas and manipulate their relationships to other particles based on proximity to each other and to the user's mouse.

### Technologies

* Javascript
* HTML5 Canvas

### Key Features

* Full screen immersion
* Various mouse interactions 
  * Mouse click adds one particle
  * Mouse hover: repulsion, attract, grab, bubble
* Responsive design
  * Canvas readjusts to any window size

### Challenges

* One of the most difficult and exciting things about this project was the implementation of the repulsion effect. The important thing to understand about repulsion was taking into account the angle of each particle relative to the mouse, and the particle's quadrant. Arctan2 was utilized as opposed to arctan because for a positive y you get an angle between 0 and π, and for negative y the result is between −π and 0. This was implemented to ensure that the change in x and y of each particle had the correct signs to push the particle to the correct final position, outside the effectDistance. 

```javascript
if (distance(mouse, this) < effectDistance) {
            var dx = this.x - mouse.x;
            var dy = this.y - mouse.y;
            var angle = Math.atan2(dy, dx);
            var distancetoRadius = effectDistance - (distance(mouse, this));
            var newXchange = Math.cos(angle) * distancetoRadius;
            var newYchange = Math.sin(angle) * distancetoRadius;
            this.x += newXchange;
            this.y += newYchange;
        }
```


