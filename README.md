# gift-randomizer

To run:
ts-node randomizer.ts < names.txt

Where names.txt looks like:
One Person, Two Person 
Some Gentleman, Some Lady 
Lass, Lad 

For the gift assignment:
Create pairs of people: [A, B], [C, D], [E, F]
randomize within each pair and the pair order: [D, C], [E, F], [B, A]
As a circular linked list, for each pair: the left gives to prev.left and the right to next.right, so:
D -> B
C -> F
E -> D
F -> A
B -> E
A -> C

This means no one gives to their partner, and pairs aren't both giving to another pair
Does require even numbers though.
