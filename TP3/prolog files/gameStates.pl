/*The parameter of the function receives the initial state of the board*/
initial([
[[empty],
[empty, empty],
[zombie, empty, zombie],
[zombie, empty, empty, zombie],
[empty, empty, zombie, empty, empty],
[empty, empty, zombie, zombie, empty, empty],
[goblin, empty, empty, zombie, empty, empty, orc],
[goblin, goblin, empty, empty, empty, empty, orc, orc],
[goblin, goblin, goblin, empty, empty, empty,orc, orc, orc],
[goblin, goblin, goblin, goblin, empty, empty, orc, orc, orc, orc]],
goblin,
[]
]).

/*Defines which piece is the first to move*/
initialPlayer(orc).

/*the parameter of the function receives the intermediate state of the board*/
intermediate([
[[empty],
[empty, empty],
[zombie, empty, empty],
[empty, empty, empty, empty],
[empty, zombie, zombie, empty, empty],
[empty, empty, zombie, zombie, empty, empty],
[goblin, empty, empty, zombie, empty, empty, orc],
[goblin, empty, empty, goblin, empty, empty, empty, orc],
[goblin, goblin, empty, empty, goblin, empty, empty, empty, orc],
[goblin, goblin, empty, empty, goblin, empty, empty, orc, orc, orc]],
orc,
[orc, goblin, orc, zombie, zombie, orc, orc]
]).

/*Defines which piece is going to move*/
intermediatePlayer(orc).

/*the parameter of the function receives the final state of the board*/
final([
[[empty],
[empty, empty],
[orc, empty, empty],
[empty, empty, empty, empty],
[empty, empty, empty, orc, empty],
[empty, empty, empty, empty, goblin, empty],
[empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, goblin, goblin, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, goblin, empty],
[empty, empty, empty, empty, zombie, empty, empty, empty, empty, empty]],
goblin,
[orc, goblin, orc, zombie, zombie, orc, orc, zombie, zombie, goblin, goblin, goblin, orc, orc, zombie, orc, goblin, zombie, orc, zombie, goblin]
]).

/*Defines which piece moved before gameOver*/
finalPlayer(goblin).

/* State for testing the game end */
almostFinal([
[[empty],
[empty, empty],
[orc, empty, empty],
[empty, zombie, empty, empty],
[empty, empty, empty, orc, empty],
[empty, empty, empty, empty, goblin, empty],
[empty, empty, empty, empty, empty, empty, empty],
[empty, empty, empty, goblin, goblin, empty, empty, empty],
[empty, empty, empty, empty, empty, empty, empty, goblin, empty],
[empty, empty, empty, empty, zombie, empty, empty, empty, empty, empty]],
goblin,
[orc, goblin, orc, zombie, zombie, orc, orc, zombie, zombie, goblin, goblin, goblin, orc, orc, zombie, orc, goblin, zombie, orc, zombie, goblin]
]).
