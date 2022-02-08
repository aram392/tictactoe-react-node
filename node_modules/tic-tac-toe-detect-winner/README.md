
The library contains a function which detects a winner in tic-tac-toe game.  

The function takes two parameters:  

1. The field in the form of two-dimensional array with length equal to the number of rows & columns in the field. The  symbol representing a cross or a zero can be any user-defined token or a string. An empty cell in the field should   be represented by an empty array element or an empty string.  

2. A number defining the quantity of symbols in succession to be considered as a win.    

The function returns an object with the following properties:

* **winnerDetected**, boolean, which is false in case of draw game;  
    
* **winnerSymbol**, number or string;    
    
* **location**, two-dimensional array where each element is an array with a row & column number of the cell   containing one of the symbols in winning combination;
    
* **lastPoint**, an array with the number of the row & column of the last symbol in wininng combination;    
    
* **type**, string ('row', 'column', 'diagonal-up-right', 'diagonal-up-left' and 'draw game').
