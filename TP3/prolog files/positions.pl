/* Enumerates all possible positions in board */
loadSpace(1, 1).
loadSpace(2, 1).
loadSpace(2, 2).
loadSpace(3, 1).
loadSpace(3, 2).
loadSpace(3, 3).
loadSpace(4, 1).
loadSpace(4, 2).
loadSpace(4, 3).
loadSpace(4, 4).
loadSpace(5, 1).
loadSpace(5, 2).
loadSpace(5, 3).
loadSpace(5, 4).
loadSpace(5, 5).
loadSpace(6, 1).
loadSpace(6, 2).
loadSpace(6, 3).
loadSpace(6, 4).
loadSpace(6, 5).
loadSpace(6, 6).
loadSpace(7, 1).
loadSpace(7, 2).
loadSpace(7, 3).
loadSpace(7, 4).
loadSpace(7, 5).
loadSpace(7, 6).
loadSpace(7, 7).
loadSpace(8, 1).
loadSpace(8, 2).
loadSpace(8, 3).
loadSpace(8, 4).
loadSpace(8, 5).
loadSpace(8, 6).
loadSpace(8, 7).
loadSpace(8, 8).
loadSpace(9, 1).
loadSpace(9, 2).
loadSpace(9, 3).
loadSpace(9, 4).
loadSpace(9, 5).
loadSpace(9, 6).
loadSpace(9, 7).
loadSpace(9, 8).
loadSpace(9, 9).
loadSpace(10, 1).
loadSpace(10, 2).
loadSpace(10, 3).
loadSpace(10, 4).
loadSpace(10, 5).
loadSpace(10, 6).
loadSpace(10, 7).
loadSpace(10, 8).
loadSpace(10, 9).
loadSpace(10, 10).

/* Makes an adjacent space to first space */
adjacent(Row, Col, AdjRow, Col):- 
    AdjRow is Row + 1.

adjacent(Row, Col, AdjRow, Col):- 
    AdjRow is Row - 1.

adjacent(Row, Col, Row, AdjCol):- 
    AdjCol is Col + 1.

adjacent(Row, Col, Row, AdjCol):- 
    AdjCol is Col - 1.

adjacent(Row, Col, AdjRow, AdjCol):- 
    AdjRow is Row + 1, AdjCol is Col + 1.

adjacent(Row, Col, AdjRow, AdjCol):- 
    AdjRow is Row - 1, AdjCol is Col - 1.
