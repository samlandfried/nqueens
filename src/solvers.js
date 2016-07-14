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
      // TODO: Modify hasColConflict to only look up
      if ( !board.hasColConflictAt(c) ) {
        // No conflicts:
        if ( rooksRemaining === 0 && r < n ) {
          //// BASE CASE //// If this is the last rook, submit solution ////

          // console.log(board.rows()[0]); // Wtf is happening here? Look at difference between 38 and 39.
          // console.log(board.rows());
          // Because of above weirdness, I'm going to modify 'print' to return a copy of the board
          return solution = board.print();
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
  var emptyBoard = new Board({n: n});
  var rooksRemaining = n;
  var solutionCount = 0;

  // We don't need to check every column, because once a piece is placed on that column, it can never hold another. We can store the valid columns in an array, and only check those, removing the column when a piece is placed.
  // Every empty board will need its own array of eligible columns that should persist through every recursive step.
  var colsToCheck = _.range(n);

  // A recursive function will add one piece to a row, test it for conflicts, and either scrap the board or do it again on the next row.

  var addPiece = (board, r, colsToCheck) => {
    // For each column
    for ( var c = 0; c < colsToCheck.length; c ++ ) {
      // console.log('n:', n, '\n', 'c:', c, '\n', 'r:', r);
      // Add a piece
      board.togglePiece(r,colsToCheck[c]);
      rooksRemaining --;

      // Test for conflicts
      // TODO: Modify hasColConflict to only look up
      if ( !board.hasColConflictAtM(colsToCheck[c], r) ) {
        // No conflicts:
        if ( rooksRemaining === 0 && r < n ) {
          //// BASE CASE //// If this is the last rook, submit solution ////
          solutionCount ++;
        } else {
          // Remove the column from colsToCheck
          var reducedCols = colsToCheck.slice(0);
          reducedCols.splice(c,1);

          // addPiece to the next row
          addPiece(board, r + 1, reducedCols);
        }
      }
      // Remove the piece
      board.togglePiece(r,colsToCheck[c]);
      rooksRemaining ++;
    }
  }

  // Kick it off;
  addPiece(emptyBoard, 0, colsToCheck);

  console.log('Single solutionCount for ' + n + ' rooks:', JSON.stringify(solutionCount));
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
