/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var emptyBoard = new Board({ n: n });
  var rooksRemaining = n;
  var solution = undefined;
  // A recursive function will add one piece to a row, test it for conflicts, and either scrap the board or do it again on the next row.

  // We don't need to check every column, because once a piece is placed on that column, it can never hold another. We can store the valid columns in an array, and only check those, removing the column when a piece is placed.
  // Every empty board will need its own array of eligible columns that should persist through recursion.
  var eligibleCols = _.range(n);

  // A recursive function will add one piece to a row, test it for conflicts, and either scrap the board or do it again on the next row.

  var addPiece = (board, r, eligibleCols) => {
    // For each column
    for (var c = 0; c < eligibleCols.length; c++) {
      // If we've passed the last row
      if (r === n) {
        console.log('You passed the last row!');
        return;
      }

      // Add a piece
      board.togglePiece(r, eligibleCols[c]);
      rooksRemaining--;

      // Remove the column from eligibleCols
      var reducedCols = eligibleCols.slice(0);
      reducedCols.splice(c, 1);

      if (rooksRemaining === 0) {
        //// BASE CASE ////
        // If this is the last rook, submit solution
        solution = board.print();
        return;
      } else {
        // addPiece to the next row and stop adding rooks to this row
        return addPiece(board, r + 1, reducedCols);
      }

      // Remove the piece
      board.togglePiece(r, eligibleCols[c]);
      rooksRemaining++;
    }
  }

  // Kick it off;
  addPiece(emptyBoard, 0, eligibleCols, rooksRemaining);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var emptyBoard = new Board({ n: n });
  var rooksRemaining = n;
  var solutionCount = 0;

  // We don't need to check every column, because once a piece is placed on that column, it can never hold another. We can store the valid columns in an array, and only check those, removing the column when a piece is placed.
  // Every empty board will need its own array of eligible columns that should persist through every recursive step.
  var eligibleCols = _.range(n);

  // A recursive function will add one piece to a row, test it for conflicts, and either scrap the board or do it again on the next row.

  var addPiece = (board, r, eligibleCols) => {
    // For each column
    for (var c = 0; c < eligibleCols.length; c++) {
      // console.log('n:', n, '\n', 'c:', c, '\n', 'r:', r);
      // Add a piece
      board.togglePiece(r, eligibleCols[c]);
      rooksRemaining--;

      // If we've passed the last row
      if (r === n) {
        console.log('You\'ve passed the last row!');
        return;
      } else if (rooksRemaining === 0) {
        //// BASE CASE //// 
        // Increment solution
        solutionCount++;
      } else {
        // Remove the column from eligibleCols
        var reducedCols = eligibleCols.slice(0);
        reducedCols.splice(c, 1);

        // addPiece to the next row
        addPiece(board, r + 1, reducedCols);
      }

      // Remove the piece
      board.togglePiece(r, eligibleCols[c]);
      rooksRemaining++;
    }
  }

  // Kick it off;
  addPiece(emptyBoard, 0, eligibleCols);

  console.log('Single solutionCount for ' + n + ' rooks:', JSON.stringify(solutionCount));
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // We want to do this with a recursive function that will add a piece to the row, check if there are conflicts, recurse if not, then remove the piece and try the next column position

  // We need an empty board and an array of the columns that are still in play. We also need to track how many queens have been placed.
  var newBoard = new Board({ n: n });
  var eligibleCols = _.range(n);
  var solution = undefined;


  var addPiece = function(board, r, eligibleCols, queensRemaining) {
    // If r === n, we've reached the end of the board

    for (var c = 0; c < eligibleCols.length; c++) {
      // Add a piece to the board and decrement queensRemaining
      board.togglePiece(r, eligibleCols[c]);
      queensRemaining --;

      // Check for conflicts.
      if (!board.hasAnyQueenConflictsOn(r, eligibleCols[c])) {
        // If no, check queensRemaining
        if (queensRemaining === 0) {
          // If 0, return solution.
          solution = board.print();
          console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
        } else {
          // If more than 0, remove col and recurse.
          var reducedCols = eligibleCols.slice(0);
          reducedCols.splice(c, 1);

          addPiece(board, r + 1, reducedCols, queensRemaining);            
        }
      }
      // Remove the piece and increment queensRemaining
      board.togglePiece(r, eligibleCols[c]);
      queensRemaining++;
    }
  };

  if ( n === 0 ) {
    solution = newBoard.print();
    return solution;
  } else {
    // debugger;
    addPiece(newBoard, 0, eligibleCols, n);   
    return solution;
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
