/*Calls the predicate to draw the main menu screen, reads
the user input and parses the input*/
mainMenu:-
    drawMenuDisplay,
    read(Option),
    parseInput(Option).

/*Parses the input of the user and displays different Scenes 
according to the input, if an invalid input is inserted, will loop
until a valid option is given*/
parseInput(1):-
    startGamePvP. 

parseInput(2):-
    startGamePovAg. 

parseInput(3):-
    startGamePgvAo. 

parseInput(4):-
    startGameAvA. 

parseInput(_InvalidOption):-
    write('Invalid Option, please choose option in range 1 to 4\n'),
    write('Please insert you option (with .)\n>'),
    read(Option),
    parseInput(Option).


/*Displays the main menu screen*/
drawMenuDisplay:-
    write('\n\n'),
    write('______________________________________________________________\n'),
    write('|                                                            |\n'),
    write('|                                                            |\n'),
    write('|                        Green                               |\n'),
    write('|                              Skull                         |\n'),
    write('|                                                            |\n'),
    write('|                                                            |\n'),
    write('|                                                            |\n'),
    write('|                                                            |\n'),
    write('|                                                            |\n'),
    write('|                                                            |\n'),
    write('|                                                            |\n'),
    write('|                                                            |\n'),
    write('|                                                            |\n'),
    write('|            Choose:                                         |\n'),
    write('|                 1) Player vs Player                        |\n'),
    write('|                 2) Player (Orc) vs Computer (Goblin)       |\n'),
    write('|                 3) Player (Goblin) vs Computer (Orc)       |\n'),
    write('|                 4) Computer vs Computer                    |\n'),
    write('|____________________________________________________________|\n'),
    write('\n\nPlease insert you option (with .)\n>').
    
