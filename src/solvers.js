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
  var emptyBoard = new Board({n: n});
  var rooksRemaining = n;
  var solution = undefined;
  // A recursive function will add one piece to a row, test it for conflicts, and either scrap the board or do it again on the next row.

  var addPiece = (board, r) => {
    // For each column
    for ( var c = 0; c < n; c ++ ) {
      // console.log('n:', n, '\n', 'c:', c, '\n', 'r:', r);
      // Add a piece
      board.togglePiece(r,c);
      rooksRemaining --;

      // Test for conflicts
      if ( !board.hasAnyRooksConflicts() ) {
        // No conflicts:
        if ( rooksRemaining === 0 && r < n ) {
          //// BASE CASE //// If this is the last rook, submit solution ////
          board.print();
          console.log(board.rows()[0]); // Wtf is happening here? Look at difference between 38 and 39.
          console.log(board.rows());
          solution = board.rows(); 
        } else {
          // addPiece to the next row
          addPiece(board, r + 1);
        }
      }
      // Remove the piece
      board.togglePiece(r,c);
      rooksRemaining ++;
    }
  }

  // Kick it off;
  addPiece(emptyBoard, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
