/*Verifies if all pieces of one element are gone, to trigger game over */
checkIfEndState(Board):- checkGoblinEndState(Board). 
checkIfEndState(Board):- checkOrcEndState(Board).
checkIfEndState(Board):- checkZombieEndState(Board).

/*Checks if all goblins are captured from the board*/
checkGoblinEndState([H|T]):- \+ checkIfGoblinInLine(H), checkGoblinEndState(T).
checkGoblinEndState(L):- L = [].

/*Checks if theres any goblin left on the row specified by the parameter */
checkIfGoblinInLine([H|T]):- H = goblin, T \= [].
checkIfGoblinInLine([_|T]):- T \= [],!, checkIfGoblinInLine(T).

/*Checks if all orcs are captured from the board*/
checkOrcEndState([[_|L]|T]):- \+ checkIfOrcInLine(L), checkOrcEndState(T).
checkOrcEndState(L):- L = [].

/*Checks if theres any orc left on the row specified by the parameter */
checkIfOrcInLine([H|_]):- H = orc.
checkIfOrcInLine([_|T]):- T \= [],!, checkIfOrcInLine(T).

/*Checks if all zombies are captured from the board*/
checkZombieEndState([H|T]):- \+ checkIfZombieInLine(H), checkZombieEndState(T), T \= [].
checkZombieEndState([_|T]):- T = [].

/*Checks if theres any zombie left on the row specified by the parameter */
checkIfZombieInLine([H|_]):- H = zombie.
checkIfZombieInLine([_|T]):- T \= [],!, checkIfZombieInLine(T).

/*Checks the goblin pieces on the board that are touching 
the edge of their colour, and adds the score*/
checkGoblinBoardScore([H|T], S):- T \= [],
	checkGoblinLineScore(H, S1),
	checkGoblinBoardScore(T, S2), S is S1 + S2. 

checkGoblinBoardScore([H|[]], S):- checkGoblinLineScore(H, S).

/*Loops through a row, and checks if any goblin piece on the 
last position of the row, returning 2 points if so.*/
checkGoblinLineScore([_|T], S):- T \= [],
	checkGoblinLineScore(T, S).

checkGoblinLineScore([goblin|[]], 2).

checkGoblinLineScore([H|[]], 0):- H \= goblin.

/*Checks the orc pieces on the board that are touching 
the edge of their colour, and adds the score*/
checkOrcBoardScore([H|T], S):- T \= [],
	checkOrcLineScore(H, S1),
	checkOrcBoardScore(T, S2), S is S1 + S2.

checkOrcBoardScore([H|[]], S):- checkOrcLineScore(H, S).

/*Loops through a row, and checks if any orc piece on the 
first position of the row, returning 2 points if so.*/
checkOrcLineScore([orc|_], 2). 
checkOrcLineScore([H|_], 0):- H \= orc.

/*Checks the zombie pieces on the board that are touching 
the edge of their colour, and adds the score*/
checkZombieBoardScore([_|T], S):- T \= [],
	checkZombieBoardScore(T, S).

checkZombieBoardScore([H|[]], S):- checkZombieLineScore(H, S).

/*Loops through the last row, and checks if the number of
zombie pieces on the this row, adding 2 points for each zombie piece.*/
checkZombieLineScore([zombie|T], S):- T \= [],
	checkZombieLineScore(T, S1), S is S1 + 2. 

checkZombieLineScore([H|T], S):- T \= [], H \= zombie,
	checkZombieLineScore(T, S).

checkZombieLineScore([zombie|[]], 2).

checkZombieLineScore([H|[]], 0):- H \= zombie.

/*Calculates the Captured score of each element*/
checkCapturedScore([H|T], E, S):- E \= H, T \= [], 	checkCapturedScore(T, E, S1), S is S1 + 1.

checkCapturedScore([H|T], E, S):- E == H, T \= [], 	checkCapturedScore(T, E, S).

checkCapturedScore([H|[]], E, 1):- E \= H.

checkCapturedScore([H|[]], E, 0):- E == H.

checkCapturedScore([], _, 0).

/* Calculates the score of player in second argument in the
game state in first argument */
value([Board|[_|[Captured|[]]]], goblin, Value):-
	checkGoblinBoardScore(Board, Value1), 
	checkCapturedScore(Captured, goblin, Value2),
	Value is Value1 + Value2.

value([Board|[_|[Captured|[]]]], orc, Value):-
	checkOrcBoardScore(Board, Value1), 
	checkCapturedScore(Captured, orc, Value2),
	Value is Value1 + Value2.

value([Board|[_|[Captured|[]]]], zombie, Value):-
	checkZombieBoardScore(Board, Value1), 
	checkCapturedScore(Captured, zombie, Value2),
	Value is Value1 + Value2. 

/* Predicate that signals the end of the game, calling the
predicate that displays scores and winners, and retracting
temporary statements */
game_over([Board|Rest], Winner):-
	displayGameEndInfo([Board|Rest], Winner),
	retract(currentState(_)),
	retract(orcPlayer(_)),
	retract(goblinPlayer(_)),
	retract(currentPlayer(_, _)), 
	abort.
