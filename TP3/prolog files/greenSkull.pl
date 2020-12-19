:- consult('gameStates.pl').
:- consult('display.pl').
:- consult('menu.pl').
:- consult('gameEnd.pl').
:- consult('gameLoop.pl').
:- consult('movement.pl').
:- consult('utils.pl').
:- consult('AI.pl').
:- consult('positions.pl').
:- consult('test.pl').
:- consult('server.pl').

:- use_module(library(random)).

/*Main predicate that starts the game*/
play:- mainMenu.
