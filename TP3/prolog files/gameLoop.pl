/* Starts the game between two players and saves 
the initial state as current state */
startGamePvP:- 
    initial(State), 
    assert(currentState(State)),
    assert(orcPlayer(human)),
    assert(goblinPlayer(human)),
    assert(currentPlayer(orc, human)),
    display_game(State, orc),
    makePlay.

/* Starts the game between an orc player and a goblin
AI and saves the initial state as current state */
startGamePovAg:- 
    initial(State), 
    assert(currentState(State)),
    assert(orcPlayer(human)),
    assert(goblinPlayer(randomai)),
    assert(currentPlayer(orc, human)),
    display_game(State, orc),
    makePlay.

/* Starts the game between a goblin player and an orc
AI and saves the initial state as current state */
startGamePgvAo:- 
    initial(State), 
    assert(currentState(State)),
    assert(orcPlayer(randomai)),
    assert(goblinPlayer(human)),
    assert(currentPlayer(orc, randomai)),
    display_game(State, orc),
    makePlay.

/* Starts the game between two AIs and saves 
the initial state as current state */
startGameAvA:- 
    initial(State), 
    assert(currentState(State)),
    assert(orcPlayer(randomai)),
    assert(goblinPlayer(randomai)),
    assert(currentPlayer(orc, randomai)),
    display_game(State, orc),
    makePlay.


/* Basic predicate for each turn a player takes */
makePlay:- currentPlayer(Player, human), currentState(State),
    write('It\'s the '), write(Player), write('\'s turn\n'),
    write('_________________________\n'),
    playerMovement(Player, State, [MoveType|Move]),
    move(State, [Player|[MoveType|Move]], NewState),
    /*changeGameState(State, NewState),*/
    updateGameState(State, NewState, Player),
    checkIfExtraMove(MoveType, Player, NewState),
    retractPieceIfNeeded,
    currentState(NewState2),
    checkZombieMove(Player, NewState2),
    nextMove.

/* Variation of makePlay for random AI */
makePlay:- currentPlayer(AI, randomai), currentState(State),
    write('It\'s the '), write(AI), write('\'s turn\n'),
    write('_________________________\n'),
    randomAIMovement(State, AI, MoveType, NewState),
    updateGameState(State, NewState, AI),
    checkRandomAIJump(MoveType, AI, NewState),
    retractPieceIfNeeded,
    currentState(NewState2),
    zombieMoveRandomAI(AI, NewState2),
    waitUntilInput,
    nextMove.


/* Asks the player to make a move and then checks if it's
valid and the type of move */
playerMovement(Player, State, [MoveType|Move]):-
    parseMovement(IntMove),
    checkMoveType(Player, State, IntMove, [MoveType|Move]).

/* Checks the type of move the player made and repeats 
the parsing of the movement if the move was invalid */
checkMoveType(Player, [Board|_], Move, [normal|Move]):-
    isValidMove(Player, Board, Move).

checkMoveType(Player, [Board|_], Move, [jump|Move]):-
    isValidJump(Player, Board, Move).

checkMoveType(Player, State, _WrongMove, Move):-
    write('The inserted move is invalid!\nMake a different move\n'),
    playerMovement(Player, State, Move).

/*Checks if the move made was a jump (which means that a piece was captured),
if yes, the player will be rewarded to make an extra jump if and only if there is a
next possible capture.*/
checkIfExtraMove(jump, Player, [Board|_]):-
    currentPiecePos(PiecePos),
    validConsecutiveJumps(Board, Player, PiecePos, []),
    write('No more consecutive jumps can be made \n').

checkIfExtraMove(jump, Player, State):-
    retract(currentPiecePos(PiecePos)),
    display_game(State, Player),
    write('Would like to make an extra jump (y/n)?: \n'), read(Input),
    parseChoice(Input, Choice),
    makeExtraMove(Choice, Player, State, PiecePos).

checkIfExtraMove(normal, _, _).

/*Parses the input made by user if it wants to make another jump*/
parseChoice(Input, reject):-
    Input = 'n';
    Input = 'N'.

parseChoice(Input, accept):-
    Input = 'y';
    Input = 'Y'.

/*In case the user wants to make a further jump, 
asks the user to input the position to make the further jump and
verifies that a jump was made, and then moves the piece to that position and 
updates the current game state, and checks if there is another jump that can be done*/
makeExtraMove(accept, Player, State, PiecePos):-
    conse_playerMovement(Player, State, PiecePos, Move),
    move(State, [Player|Move], NewState),
    updateGameState(State, NewState, Player),
    checkIfExtraMove(jump, Player, NewState).

makeExtraMove(reject, _, _, _).

/*Verifies that a jump is made, if not then the user needs to reenter the position*/
checkIfJump(Player, [Board|_], Move, [jump|Move]):-
    isValidJump(Player, Board, Move).

checkIfJump(Player, State, [PiecePos|_], Move):-
    write('The inserted jump is invalid!\n'),
    conse_playerMovement(Player, State, PiecePos, Move).

/*Asks the user to input the position to make the further jump and
verifies that a jump was made*/
conse_playerMovement(Player, State, PiecePos, [MoveType|Move]):-
    conse_parseMovement(MoveToRow,MoveToCol),
    checkIfJump(Player, State, [PiecePos|[[MoveToRow|MoveToCol]]], [MoveType|Move]).

/*Asks the user to input the position to make the further jump*/
conse_parseMovement(MoveToRow, MoveToCol):-
    write('Input Space position to jump over:\n'),
    write('Row Number '), read(MoveToRow), 
    write('Column Number '), read(MoveToCol).
    

/*ifJumpMakeJump(Player, State, [jump|Move]):-
    move(State, [Player|[jump|Move]], NewState),
    updateGameState(State, NewState, Player),
    checkIfExtraMove(jump, Player, NewState).

ifJumpMakeJump(Player, State, [normal|Move], NewState):-
    write('The inserted move is not a jump! \n'),
    checkIfExtraMove(jump, Player, State).*/
    
/*This function would be called after every move duration the execution of the game,
it checks if game end conditions are triggered and updates the game state*/
updateGameState(State, [Board|Rest], Player):-
    checkIfEndState(Board),!,
    changeGameState(State, [Board|Rest]),
    display_game([Board|Rest], Player),
    game_over([Board|Rest], _Winner).

updateGameState(State, [Board|Rest], _):-
    \+checkIfEndState(Board),
    changeGameState(State, [Board|Rest]).

/* Asks the player what move to make, reads their input
and returns the move to make */
parseMovement([[MoveFromRow|MoveFromCol]|[[MoveToRow|MoveToCol]]]):-
    write('Input piece position to move: \n'),
    write('Row Number '), read(MoveFromRow), 
    write('Column Number '), read(MoveFromCol),
    write('Input Space position to move to:\n'),
    write('Row Number '), read(MoveToRow), 
    write('Column Number '), read(MoveToCol).


/* Changes the current state from OldState to NewState 
in database*/
changeGameState(OldState, NewState):- 
    retract(currentState(OldState)), 
    assert(currentState(NewState)).

/* Checks if the current player has the GreenSkull and
lets them pick a move for the zombies if so */
checkZombieMove(Player, [Board|[GS|Rest]]):-  
    Player = GS,
    display_game([Board|[GS|Rest]], zombie),
    write('It\'s the zombie\'s turn\n'),
    playerMovement(zombie, [Board|[GS|Rest]], [MoveType|Move]), 
    /*parseMovement(IntMove),*/
    write('Zombie playerMovement ok\n'),
    move([Board|[GS|Rest]], [zombie|[MoveType|Move]], NewState),  
    write('Zombie move ok\n'),
    updateGameState([Board|[GS|Rest]], NewState, zombie),
    checkIfExtraMove(MoveType, zombie, NewState),
    retractPieceIfNeeded.

/* Checks if the current player has the GreenSkull and
lets them pick a move for the zombies if so */
checkZombieMove(Player, [_Board|[GS|_Rest]]):- 
    Player \= GS,
    write('No zombie\'s turn\n').

/* Displays board, changes the current player, 
checks if the game is in an end state and moves on 
to the next turn */
nextMove:- currentState([Board|Rest]), currentPlayer(Player, _),
    swapPlayer(Player, NextPlayer),
    display_game([Board|Rest], NextPlayer),
    makePlay.

/* Swaps the current player in database */
swapPlayer(orc, goblin):-
    retract(currentPlayer(orc, _)),
    goblinPlayer(Type),
    assert(currentPlayer(goblin, Type)).

swapPlayer(goblin, orc):-
    retract(currentPlayer(goblin, _)),
    orcPlayer(Type),
    assert(currentPlayer(orc, Type)).

/* If there's a currentPiecePos predicate that hasn't been 
retracted yet, this predicate retracts it and always suceeds*/
retractPieceIfNeeded:-
    retract(currentPiecePos(_, _)).

retractPieceIfNeeded.
