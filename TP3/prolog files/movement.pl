/* Moves a piece of inserted player from the space in from variables
to the space in to variables */
move(State, [Player|[normal|Move]], NewState):-
    movePiece(Player, State, Move, NewState).

move(State, [Player|[jump|Move]], NewState):-
    makeJump(Player, State, Move, NewState).

/* Checks if the movement inserted is valid in the current board */
isValidMove(Player, GameBoard, [[FromRow|FromCol]|[[ToRow|ToCol]]]):-
    isValidSpace(FromRow, FromCol),
    isAdjacent(FromRow, FromCol, ToRow, ToCol),
    isValidSpace(ToRow, ToCol),
    isPlayerPiece(Player, GameBoard, FromRow, FromCol),
    isEmpty(GameBoard, ToRow, ToCol).

/* Checks if the movement inserted is a valid jump */
isValidJump(Player, GameBoard, [[FromRow|FromCol]|[[ToRow|ToCol]]]):-
    isValidSpace(FromRow, FromCol), isValidSpace(ToRow, ToCol),
    isPlayerPiece(Player, GameBoard, FromRow, FromCol),
    isAdjacent(FromRow, FromCol, ToRow, ToCol), 
    isPiece(GameBoard, ToRow, ToCol),
    canJumpOver(GameBoard, FromRow, FromCol, ToRow, ToCol).

/* Checks if the space after the space with the piece is empty
so the piece can jump over the piece to jump over */
canJumpOver(GameBoard, Row, Col, Row, CapCol):- 
    CapCol =:= Col + 1, JumpCol is Col + 2,
    isEmpty(GameBoard, Row, JumpCol).

canJumpOver(GameBoard, Row, Col, Row, CapCol):- 
    CapCol =:= Col - 1, JumpCol is Col - 2,
    isEmpty(GameBoard, Row, JumpCol).

canJumpOver(GameBoard, Row, Col, CapRow, Col):- 
    CapRow =:= Row + 1, JumpRow is Row + 2,
    isEmpty(GameBoard, JumpRow, Col).

canJumpOver(GameBoard, Row, Col, CapRow, Col):- 
    CapRow =:= Row - 1, JumpRow is Row - 2,
    isEmpty(GameBoard, JumpRow, Col).

canJumpOver(GameBoard, Row, Col, CapRow, CapCol):- 
    CapCol =:= Col + 1, JumpCol is Col + 2,
    CapRow =:= Row + 1, JumpRow is Row + 2,
    isEmpty(GameBoard, JumpRow, JumpCol).

canJumpOver(GameBoard, Row, Col, CapRow, CapCol):- 
    CapCol =:= Col - 1, JumpCol is Col - 2,
    CapRow =:= Row - 1, JumpRow is Row - 2,
    isEmpty(GameBoard, JumpRow, JumpCol).

/* Checks if the space inserted is on the board */
isValidSpace(Row, Col):- Row > 0, Col > 0, Row =< 10, Col =< Row.

/* Checks if the space to move from has a piece from the player who
makes the move */
isPlayerPiece(Player, [_|T] , Row, Col):- Row > 1, 
    NR is Row - 1,
    isPlayerPiece(Player, T, NR, Col).

isPlayerPiece(Player, [[_|T]|R], 1, Col):- Col > 1,
    NC is Col - 1,
    isPlayerPiece(Player, [T|R], 1, NC).

isPlayerPiece(E, [[E|_]|_], 1, 1).

/* Checks if both spaces are adjacent */
isAdjacent(FromRow, FromCol, ToRow, ToCol):-
    FromCol =:= ToCol,
    FromRow =:= ToRow + 1.

isAdjacent(FromRow, FromCol, ToRow, ToCol):-
    FromCol =:= ToCol,
    FromRow =:= ToRow -1.

isAdjacent(FromRow, FromCol, ToRow, ToCol):-
    FromRow =:= ToRow,
    FromCol =:= ToCol + 1.

isAdjacent(FromRow, FromCol, ToRow, ToCol):-
    FromRow =:= ToRow,
    FromCol =:= ToCol - 1.


isAdjacent(FromRow, FromCol, ToRow, ToCol):-
    FromRow =:= ToRow - 1,
    FromCol =:= ToCol - 1.

isAdjacent(FromRow, FromCol, ToRow, ToCol):-
    FromRow =:= ToRow + 1,
    FromCol =:= ToCol + 1.

/* Checks if the space to move to is empty */
isEmpty([_|T], Row, Col):- Row > 1,
    NR is Row - 1,
    isEmpty(T, NR, Col).

isEmpty([[_|T]|R], 1, Col):- Col > 1,
    NC is Col - 1,
    isEmpty([T|R], 1, NC).

isEmpty([[empty|_]|_], 1, 1).

/* Checks if the space to move to has a piece (for jumps) */
isPiece([_|T], Row, Col):- Row > 1,
    NR is Row - 1, isPiece(T, NR, Col).

isPiece([[_|T]|R], 1, Col):- Col > 1,
    NC is Col - 1, isPiece([T|R], 1, NC).

isPiece([[goblin|_]|_], 1, 1).

isPiece([[orc|_]|_], 1, 1).

isPiece([[zombie|_]|_], 1, 1).

/* Moves the piece after conditions have been checked */
movePiece(Player, [GameBoard|Rest], 
    [[FromRow|FromCol]|[[ToRow|ToCol]]], [NewGameBoard|Rest]):- 
    setSpace(GameBoard, IntGameBoard, FromRow, FromCol, empty), 
    setSpace(IntGameBoard, NewGameBoard, ToRow, ToCol, Player).

/* Makes a piece jump after conditions have been checked; 
this predicate varies a bit depending on the relative position
of the captured piece; altered from original work to remove 
errors since certain assertions are not made*/
makeJump(Player, [GameBoard|[GS|[Captured|_]]], 
    [[Row|Col]|[[Row|CapCol]]], 
    [NewGameBoard|[GS|[NewCaptured|_]]]):-
    CapCol =:= Col + 1, JumpCol is Col + 2,
    setSpace(GameBoard, IntGameBoard1, Row, Col, empty), 
    addCaptured(Captured, NewCaptured, GameBoard, Row, CapCol),
    setSpace(IntGameBoard1, IntGameBoard2, Row, CapCol, empty),
    setSpace(IntGameBoard2, NewGameBoard, Row, JumpCol, Player),
    assert(currentPiecePos([Row, JumpCol])).
%   checkGreenSkullSwap(GS, NGS).

makeJump(Player, [GameBoard|[GS|[Captured|_]]], 
    [[Row|Col]|[[Row|CapCol]]], 
    [NewGameBoard|[GS|[NewCaptured|_]]]):-
    CapCol =:= Col - 1, JumpCol is Col - 2,
    setSpace(GameBoard, IntGameBoard1, Row, Col, empty), 
    addCaptured(Captured, NewCaptured, GameBoard, Row, CapCol),
    setSpace(IntGameBoard1, IntGameBoard2, Row, CapCol, empty),
    setSpace(IntGameBoard2, NewGameBoard, Row, JumpCol, Player),
    assert(currentPiecePos([Row, JumpCol])).
%   checkGreenSkullSwap(GS, NGS).

makeJump(Player, [GameBoard|[GS|[Captured|_]]],
    [[Row|Col]|[[CapRow|Col]]], 
    [NewGameBoard|[GS|[NewCaptured|_]]]):-
    CapRow =:= Row + 1, JumpRow is Row + 2,
    setSpace(GameBoard, IntGameBoard1, Row, Col, empty), 
    addCaptured(Captured, NewCaptured, GameBoard, CapRow, Col),
    setSpace(IntGameBoard1, IntGameBoard2, CapRow, Col, empty),
    setSpace(IntGameBoard2, NewGameBoard, JumpRow, Col, Player),
    assert(currentPiecePos([JumpRow, Col])).
%   checkGreenSkullSwap(GS, NGS).

makeJump(Player, [GameBoard|[GS|[Captured|_]]],
    [[Row|Col]|[[CapRow|Col]]], 
    [NewGameBoard|[GS|[NewCaptured|_]]]):-
    CapRow =:= Row - 1, JumpRow is Row - 2,
    setSpace(GameBoard, IntGameBoard1, Row, Col, empty), 
    addCaptured(Captured, NewCaptured, GameBoard, CapRow, Col),
    setSpace(IntGameBoard1, IntGameBoard2, CapRow, Col, empty),
    setSpace(IntGameBoard2, NewGameBoard, JumpRow, Col, Player),
    assert(currentPiecePos([JumpRow, Col])).
%   checkGreenSkullSwap(GS, NGS).

makeJump(Player, [GameBoard|[GS|[Captured|_]]],
    [[Row|Col]|[[CapRow|CapCol]]], 
    [NewGameBoard|[GS|[NewCaptured|_]]]):-
    CapCol =:= Col + 1, JumpCol is Col + 2,
    CapRow =:= Row + 1, JumpRow is Row + 2,
    setSpace(GameBoard, IntGameBoard1, Row, Col, empty), 
    addCaptured(Captured, NewCaptured, GameBoard, CapRow, CapCol),
    setSpace(IntGameBoard1, IntGameBoard2, CapRow, CapCol, empty),
    setSpace(IntGameBoard2, NewGameBoard, JumpRow, JumpCol, Player),
    assert(currentPiecePos([JumpRow, JumpCol])).
%   checkGreenSkullSwap(GS, NGS).

makeJump(Player, [GameBoard|[GS|[Captured|_]]],
    [[Row|Col]|[[CapRow|CapCol]]], 
    [NewGameBoard|[GS|[NewCaptured|_]]]):-
    CapCol =:= Col - 1, JumpCol is Col - 2,
    CapRow =:= Row - 1, JumpRow is Row - 2,
    setSpace(GameBoard, IntGameBoard1, Row, Col, empty), 
    addCaptured(Captured, NewCaptured, GameBoard, CapRow, CapCol),
    setSpace(IntGameBoard1, IntGameBoard2, CapRow, CapCol, empty),
    setSpace(IntGameBoard2, NewGameBoard, JumpRow, JumpCol, Player),
    assert(currentPiecePos([JumpRow, JumpCol])).
%   checkGreenSkullSwap(GS, NGS).

/* Enters a board in first parameter and returns another board
in second parameter that's the first board but with the element
in coordinates (Row, Col) set to Element */
setSpace([OH|OT], [OH|NT], Row, Col, Element):-
    Row > 1, NR is Row - 1,
    setSpace(OT, NT, NR, Col, Element).

setSpace([[OH|OT]|R], [[OH|NT]|R], 1, Col, Element):-
    Col > 1, NC is Col - 1,
    setSpace([OT|R], [NT|R], 1, NC, Element).

setSpace([[_|OT]|R], [[Element|OT]|R], 1, 1, Element).

/* Enters a captured list in first parameter and returns a new
captured list with the element in position (Row, Col) of gameboard
added to it */
addCaptured(Captured, NewCaptured, [_|T], Row, Col):-
    Row > 1, NR is Row - 1,
    addCaptured(Captured, NewCaptured, T, NR, Col).

addCaptured(Captured, NewCaptured, [[_|T]|R], 1, Col):-
    Col > 1, NC is Col - 1,
    addCaptured(Captured, NewCaptured, [T|R], 1, NC).

addCaptured(Captured, [E|Captured], [[E|_]|_], 1, 1).

/* Checks if the green skull should be swapped by entering who
has the greenSkull, checking if they are the current player 
and returning the player who should have it after the jump */
checkGreenSkullSwap(orc, orc):- currentPlayer(goblin, _).

checkGreenSkullSwap(orc, goblin):- currentPlayer(orc, _).

checkGreenSkullSwap(goblin, orc):- currentPlayer(goblin, _).

checkGreenSkullSwap(goblin, goblin):- currentPlayer(orc, _).
