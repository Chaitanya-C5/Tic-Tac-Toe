let board = [["@","@","@"],["@","@","@"],["@","@","@"]];
let system = "X";
let user = "O";
let curr = user;

$(".box").on("click", function(e) {

    if(curr == user)
    {
        player(this.id);
        var res1 = checkWin(board);
        if(res1 == null)
        {
            cpu();
            var res2 = checkWin(board);
            if(res2 != null)
            {
                $(".res").text(res2+" wins !!!");
            }
            
        }
        else if(res1 == "tie")
        {
            $(".res").text("Tie");
        }
        else
        {
            $(".res").text(res1+" wins !!!");
        }
    }

});

function equals(x,y,z)
{
    return x == y && y == z && x != "@";
}

function checkWin(board)
{
    let winner = null;

    // rows

    for(var i=0;i<3;i++)
    {
        if(equals(board[i][0],board[i][1],board[i][2])) 
        {
            winner = board[i][0];
            
        }
    }

    // columns

    for(var i=0;i<3;i++)
    {
        if(equals(board[0][i],board[1][i],board[2][i])) 
        {
            winner = board[0][i];
            
        }
    }

    // Both diagonals

    if(equals(board[0][0],board[1][1],board[2][2]))
    {
        winner = board[0][0];
        
    }
    
    
    if(equals(board[0][2],board[1][1],board[2][0]))
    {
        winner = board[0][2];
        
    }

    let spaces = 0;
    for(let i=0;i<3;i++)
    {
        for(let j=0;j<3;j++)
        {
            if(board[i][j] == "@") spaces ++;
        }
    }

    if(winner == null && spaces == 0) return "tie";

    return winner;
}

function player(val)
{
    $("#"+val).text(user);
    $("#"+val).addClass("press");
    var row = Math.floor((parseInt(val[1]) - 1) / 3);
    var col = (parseInt(val[1]) - 1) % 3;
    board[row][col] = user;
    curr = system;
}

function cpu()
{
    let bestScore = -Infinity;
    let bestMove;

    for(let i=0;i<3;i++)
    {
        for(let j=0;j<3;j++)
        {
            if(board[i][j] == "@")
            {
                board[i][j] = system;
                let score = minimax(board, 0, false);
                board[i][j] = "@";

                if(score > bestScore)
                {
                    bestScore = score;
                    bestMove = {i, j};
                }
            }
        }
    }
    board[bestMove.i][bestMove.j] = system;
    let val = (bestMove.i * 3) + bestMove.j + 1;
    $("#b"+val).text(system);
    $("#b"+val).addClass("cpress");  
    curr = user;
}

let scores = {
    X : 1,
    O : -1,
    tie : 0
};

function minimax(board, depth, isMaximizing)
{
    let result = checkWin(board);

    if(result !== null)
    {
        console.log(scores[result]);
        return scores[result];
    }

    if(depth === 9 || result === "tie")
    {
        return scores["tie"];
    }
    
    if(!isMaximizing)
    {
        let bestScore = Infinity;

        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(board[i][j] == "@")
                {
                    board[i][j] = user;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = "@";
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
    else
    {
        let bestScore = -Infinity;

        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(board[i][j] == "@")
                {
                    board[i][j] = system;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = "@";
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    }


}

