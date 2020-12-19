/*Displays the initial state of the board and 
also defines which piece is about to make a move*/
displayInitial:- initial(S), initialPlayer(P),
			display_game(S, P).

/*Displays the intermediate state of the board and 
also defines which piece is about to make a move*/
displayIntermediate:- intermediate(S), intermediatePlayer(P),
				display_game(S, P).

/*Displays the final state of the board and 
also defines which piece is about to make a move*/
displayFinal:- final(S), finalPlayer(P), 
		    display_game(S, P).

/*Receives the initial state of the board and displays it,
this will be the main predicate called for the 
final delivery*/
initGame:-
	initialState(InitialBoard),
	display_game(InitialBoard, goblin).
	
/*Receives the current state of the game (game board, which player
has the green Skull and captured pieces), as well as the next player
to make a move, then checks if the game ended, and draws the game*/
display_game([Board|[GreenSkull|[Captured|[]]]], Player):-
	drawBoard(Board),
	displayGameInfo(GreenSkull, Player, Captured).

/*Displays the game information of the current play,
this includes which player has the green skull, which 
player turn, pieces captured and score of each element*/
displayGameInfo(GreenSkull, Player, Captured):-
	write('\n_________________________\n'),
	write('        Game Info:         \n\n'),
	drawGreenSkull(GreenSkull),
	drawNextPlayer(Player),
	drawCaptured(Captured),
	write('_________________________\n').

/*Draws the board defined by GameBoard*/
drawBoard(GameBoard):- write('\n'), drawLine(GameBoard, 1).

/*Recursive loop which draws the board received as parameter
line by line*/
drawLine([H|T], X):- X < 10, H \= [], N is 10 - X, Y is X + 1,
	drawBlank(N), write('   '), drawSpaceTop(X), 
	drawBlank(N), write(X), drawBlank(1), drawList(H),
	drawLine(T, Y).	

drawLine([H|[]], 10):- H \= [], 
	write('   '), drawSpaceTop(10),
	write('10 '), drawList(H),
	write('   '), drawSpaceBottom(10),
	drawBottomCol.

/*Recursive loop which draws the elements, the received parameter
is a row of the board*/
drawList([Element|Tail]):- Tail \= [], write('| '), 
					 selectElement(Element),
				      drawList(Tail). 

drawList([Element|[]]):-  write('| '), selectElement(Element), 				     
	write('|\n').

/*Defines and displays the symbol of which element on the board*/
selectElement(goblin):- write('G ').
selectElement(orc):- write('O ').
selectElement(zombie):- write('Z ').
selectElement(empty):- write('  ').

/*Defines and displays the symbol of which element on the board*/
drawBlank(X):- X > 1, write('  '), N is X - 1, drawBlank(N).
drawBlank(1):- write('  ').

/*Recursive loop that draws the empty spaces on the side of board
to the triangle*/
drawSpaceTop(X):- X > 1, write(' / \\'), 
			 N is X - 1, drawSpaceTop(N).

drawSpaceTop(1):- write(' / \\\n').

/*Recursive loop to draw the top corners of the hexagon*/
drawSpaceBottom(X):- X > 1, write(' \\ /'),
			    N is X - 1, drawSpaceBottom(N).

drawSpaceBottom(1):- write(' \\ /\n').

drawBottomCol:- drawBlank(2),
	write(' 1   2   3   4   5   6   7   8   9   10\n').

/*Displays which player has the green skull*/
drawGreenSkull(GS):- write('Green Skull: '), write(GS), 
	write('\n').

/*Displays which player to make the next move*/
drawNextPlayer(P):- write('Next move: '), write(P),
	write('\n').

/*Displays the pieces that were captured*/
drawCaptured(C):- write('Captured pieces: '), 						 
	drawCapturedPieces(C), write('\n').

/*Recursive loop to display all the pieces captured, piece by piece,
'none' is displayed if no piece is captured */
drawCapturedPieces([Piece|Tail]):- Tail \= [], 
	selectElement(Piece), write(', '), 
	drawCapturedPieces(Tail).

drawCapturedPieces([Piece|[]]):- selectElement(Piece).

drawCapturedPieces([]):- write('none').

/*Displays when game end is reached, showing the score of each
element and the winner*/
displayGameEndInfo(GameState, Winner):- write('Game over\n'),
	write('Goblin Score: '), 
	value(GameState, goblin, GoblinScore), write(GoblinScore),
	write('\nOrc Score: '),
	value(GameState, orc, OrcScore), write(OrcScore),
	write('\nZombie Score: '), 
	value(GameState, zombie, ZombieScore), write(ZombieScore),
	displayWinner(GoblinScore, OrcScore, ZombieScore, Winner),
	write('_________________________\n').

/*Compares the scores of each element, and
displays the winner*/
displayWinner(GS, OS, ZS, goblin):- GS > OS, GS > ZS,
	write('\nThe goblins win!\n').

displayWinner(GS, OS, ZS, orc):- OS > GS, OS > ZS,
	write('\nThe orcs win!\n').

displayWinner(GS, OS, ZS, zombie):- ZS > GS, ZS > OS,
	write('\nThe zombies win!\n').

displayWinner(GS, OS, ZS, [goblin, orc]):- GS = OS, GS > ZS,
	write('\nThe goblins and orcs tied!\n').

displayWinner(GS, OS, ZS, [goblin, zombie]):- GS = ZS, GS > OS,
	write('\nThe goblins and zombies tied!\n').

displayWinner(GS, OS, ZS, [orc, zombie]):- OS = ZS, OS > GS,
	write('\nThe orcs and zombies tied!\n').

displayWinner(GS, OS, ZS, [goblin, orc, zombie]):- GS = OS, GS = ZS,
	write('\nEveryone tied!\n').
