# javelins

A simple 'blog' if you will. Access the blog by pointing your browser to

http://localhost:3000/

javelins requires you to install 'express' library to the
working folder.

SO, all requirements for running:
* NodeJS
* 'express' (you can install by `npm install`)

## NPM and the libraries... what?!

Node is the JavaScript runtime, "npm" is its package manager, and
'express' is one of the most useful packages of code. express
is used by javelins.

So javelins uses code in express. Javelins is being run by using
NodeJS as runtime platform.

## Which port does javelins listen to?

This server will create a listener on port 3000 (you can choose the port,
in code).

## Changing the port (from default 3000)

You can change the variable:
```
    const port = 3000
``` 
to a number where you want the server to listen.

If for example you've set port=2999, then open your web browser:
http://localhost:2999/

to see content.

## Running the server

node ./index.js

Soon a text should appear on your console:
'Javelins server listening at http://localhost:3000'
(or similar)
