/* Predicate that searches all valid moves that Player could 
do in the gameboard Board, returning it in ListOfMoves */
valid_moves(Board, Player, ListOfMoves):-
    findall([MoveType|[[FromRow|FromCol]|[[ToRow|ToCol]]]],
        (loadSpace(FromRow, FromCol), 
        adjacent(FromRow, FromCol, ToRow, ToCol),
        checkValidMoveAI(Board, Player, [[FromRow|FromCol]|[[ToRow|ToCol]]], MoveType)),
        ListOfMoves).

/* Auxiliar predicate for valid_moves that checks if a move is valid 
and returns if it's a normal move or a jump in the last parameter */
checkValidMoveAI(Board, Player, 
    [[FromRow|FromCol]|[[ToRow|ToCol]]], normal):-
    isValidMove(Player, Board, [[FromRow|FromCol]|[[ToRow|ToCol]]]).

checkValidMoveAI(Board, Player, 
    [[FromRow|FromCol]|[[ToRow|ToCol]]], jump):-
    isValidJump(Player, Board, [[FromRow|FromCol]|[[ToRow|ToCol]]]).

/* Predicate that searches all valid jumps a player can make after
jumping once with a piece */
validConsecutiveJumps(Board, Player, [FromRow, FromCol], ListOfJumps):-
    findall([jump|[[FromRow, FromCol]|[[ToRow|ToCol]]]],
        (loadSpace(ToRow, ToCol),
        isValidJump(Player, Board, [[FromRow|FromCol]|[[ToRow|ToCol]]])),
        ListOfJumps).

/* Generates a random move for random AI */
randomAIMovement([Board|Rest], AI, MoveType, NewState):-
    valid_moves(Board, AI, ListOfMoves),
    random_member([MoveType|Move], ListOfMoves),
    move([Board|Rest], [AI|[MoveType|Move]], NewState).

/* Checks if random AI can make extra jumps, and makes
it if it can */
checkRandomAIJump(jump, AI, [Board|_]):-
    currentPiecePos(PiecePos),
    validConsecutiveJumps(Board, AI, PiecePos, []),
    write('No more consecutive jumps can be made \n').

checkRandomAIJump(jump, AI, [Board|Rest]):-
    retract(currentPiecePos(PiecePos)),
    waitUntilInput,
    display_game([Board|Rest], AI),
    validConsecutiveJumps(Board, AI, PiecePos, ListOfJumps),
    random_member([MoveType|Move], ListOfJumps),
    move([Board|Rest], [AI|[MoveType|Move]], NewState),
    updateGameState([Board|Rest], NewState, AI),
    checkRandomAIJump(MoveType, AI, NewState).

checkRandomAIJump(normal, _, _).

/* Checks if random AI has the greenSkull and moves 
zombie if so */
zombieMoveRandomAI(AI, [Board|[GS|Rest]]):-
    AI = GS,
    waitUntilInput,
    display_game([Board|[GS|Rest]], zombie),
    write('It\'s the zombie\'s turn\n'),
    randomAIMovement([Board|[GS|Rest]], zombie, MoveType, NewState),
    updateGameState([Board|[GS|Rest]], NewState, AI),
    checkRandomAIJump(MoveType, zombie, [Board|[GS|Rest]]),
    retractPieceIfNeeded.

zombieMoveRandomAI(AI, [_Board|[GS|_Rest]]):-
    AI \= GS.

/* Function to wait after AI makes a move so it doesn't
make all of the moves in a row */
waitUntilInput:-
    write('Press a character, . and enter to proceed\n'),
    read(_).
    
