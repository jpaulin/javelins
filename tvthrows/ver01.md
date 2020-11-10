# Needs for TV throw-away quality POC - In English: first game engine version

[ ] Write Part 1 of Making TV: Getting started with Win 10 3D
[ ] Install SDK of DirectX or OpenGL (if explicitly install needed)
[ ] Make a clean build of empty core project
[ ] Compile the first 01 Init app windows tutorial C++
[ ] Define DoD for game features in Excel: define a clear cut line of 'done'?
[ ] take a break and celebrate!


## Complex in-game machinics: Office Kitchen

### Pristine ClearWater AI 

A Dishwashing machine with sophisticated sensor fusion and 
a 'Pristine ClearWater AI': an embedded control program, 
that has a flag for keeping Things Simple. 

The flag keeps track of whether ALL dishes inside are clean,
or does the wash-cycle need to be initiated. The problem
has haunted humanity since 1960s. But it became ever more prevalent
with the advent of shared office spaces and co-working spaces,
where people of mixed dish-washing strategies mingle together.


[ ] Learn C++ tuts https://www.youtube.com/watch?v=o3yb7X_J9mw
    -> https://www.youtube.com/watch?v=o3yb7X_J9mw&t=8m04s
[ ] Make a first build of the tutorial game C++
[ ] git add, commit so far
[ ] Write document of project setup and what's done of things so far
[ ] write rotators matrix functions
[ ] add a "World struct" that is the "top dog" pointer to all object registrations
[ ] add Camera class
[ ] Make a 3D kerrostalo
[ ] Export 3D from blender to code
[ ] Position Camera towards midpoint of Kerrostalo
[ ] Render scene: in-game (software!)
[ ] take a break and celebrate!
[ ] Write story so far! Part 2

[ ] Clear goals for segment 3! "First perf builds"
[ ] Creation of 500 new objects - performance build and measure 
[ ] Creation of 50000 new objects - performance build and measure. Case leaves in autumn, for example

3D engine features v0.1
* All objects are visible - no specific culling algorithms
* rasterization happens on which level? GPU / DirectX / by hand

Kerrostalo 3D object
- design in excel 
- programmatic creation
- loader for objects
- use standard C++ lib for object loader (simple .obj Wavefront format)

## 3D fundamentals

Face culling 
https://learnopengl.com/Advanced-OpenGL/Face-culling

## C++ street lore to a game coder

About efficienct data structures

Use std::vector
Store directly the objects, do not "allocate" memory
swap-and-pop method
store discarded objects as ref
no hashing: hashes are slow
use index for finding objects
"Your game objects have an index in their main array."

### Example: make C++ Bullets fast

- store objects directly


## Instantiation of game state

var gs 

gstate 

