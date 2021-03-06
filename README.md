# Shape Invaders 👾

<p>Created by Khemi Ramyead</p>

https://khemi1998.github.io/SpaceInvaders/

![Screenshot 2021-12-27 at 20 13 32](https://user-images.githubusercontent.com/93138312/147504272-b6114ad4-4603-43d8-aa23-1e536ac969e8.png)

<h2>Introduction 🎮 </h2>

<p>ShapeInvaders is my rendition on SpaceInvaders which follows the same concept of shooting the invaders before they reach the entity.</p>

<h2>Technologies 🧠</h2>
<ul>
  <li>JavaScript</li>
  <li>CSS</li>
  <li>HTML</li>
</ul>

<h2>▫️◽️ Design ◽️▫️</h2>

<p>The game was initally intended to play on a desktop so I can learn and implent using the arrow keys into the code. I then decided to devlope the game further so buttons would appear on smaller devices. If was to redo this project I would begin with the mobile-design first approach to make it easier to scale to larger devices.</p>

<h2>◾️◼️ Psuedo-Code ◼️◾️</h2>

<p>The thought process is as follows:</p>
<ul>
<li>Set up a grid</li>
<li>Assign invader positions to the grid</li>
<li>Assign entity position to the grid</li>
<li>Make invaders move</li>
<li>Set up enitity movement with arrows</li>
<li>Set up enitity movement with buttons</li>
<li>Set up enitity laser movement</li>
<li>Stop laser when it hits an invader</li>
<li>Remove invader</li>
<li>if invader reaches entity user loses</li>
<li>if user hits all invaders before they reach the entity user wins</li>
</ul>

<h2>Problems I encountered ⚒️</h2>

<p>I used different methods to make both the laser and invaders move including manually choosing positions on the grid which was inefficient. The next idea was putting all the invaders into an array and looping through each invader and setting a time interval in order to create movement. The loop method worked however it was difficult to manage the collision between the invader and laser. The method I chose was to create a loop for each row and use callback functions instead of for-loops which reduced the amount of code written and made setting and clearing time intervals easier.</p>

<p>A bug with the 'boom' classlist meant that when the up arrow was pressed quickly some positions would be stuck with the classlist. Thus bug was solved by adjusting the boom function to make every position on the grid remove the 'boom' classlist instead of targeting just the collision position.</P>

<p>Further improvement would include condensing the code. I plan to re-visit this project to refactor the code further.</p>

<h2>Commits 📝</h2>
<p>iteration1: creating files and sorting out layout using html, CSS and SASS</p>
<p>iteration2: Layout completed</p>
<p>iteration3: added grid template, entity moves</p>
<p>iteration4: entity stays on bottom row and shoots</p>
<p>iteration5: activate game using play button</p>
<p>iteration6: invaders move</p>
<p>iteration7: function method instead of for loop for laser</p>
<p>iteration7.1: if invaders reach bottom you lose</p>
<p>iteration8: laser disappears when it reaches top of grid</p>
<p>iteration9: making sure everything is up to date</p>
<p>iteration10: using callback functions and including array for each row</p>
<p>iteration11: working version</p>
<p>iteration12: fixed bugs and user loses if entity crashes</p>
<p>iteration13: added reset function without reloading page</p>
<p>iteration14: reset function is functional</p>
<p>iteration15: added explosion when invader dies</p>
<p>iteration16: updated styling</p>
<p>iteration17: implenting control buttons</p>
<p>iteration18: buttons are functional on smaller screens</p>
<p>iteration19: scaling for smaller devices</p>
<p>iteration20: upload current version of README.md</p>
<p>iteration21: up to date version: variables fixed</p>
<p>iteration22: adjust background scaling</p>
<p>iteration22.1: adjust background scaling</p>
<p>iteration23: fixed bug with restarted game</p>
