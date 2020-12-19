/* Split function where a string is introduced and
divided into a list of substrings returned by third
parameter */
split([], _, [[]]) :-
    !.  

split([Div|T], Div, [[]|Rest]) :-
    split(T, Div, Rest), !.

split([H|T], Div, [[H|First]|Rest]) :-
    split(T, Div, [First|Rest]).
