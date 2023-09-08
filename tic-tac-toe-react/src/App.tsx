import {useEffect, useState} from "react";
import {Container, Navbar, Nav, Col, Row, Button} from "react-bootstrap";

function App() {
    const createBoard = (size: number) => {
        let newBoard = [] as Array<Array<string | undefined>>;
        for (let i = 0; i < size; i++) {
            newBoard.push([...Array(size)]);
        }
        return newBoard;
    };

    const increaseBoardSize = () => {
        setSize(prev => prev + 1);
    };

    const decreaseBoardSize = () => {
        setSize(prev => prev - 1);
    };

    const handleReset = () => {
        setBoard(createBoard(size));
        setGameWon(false);
        setPlayer("x");
    };

    const checkRowByRow = (board: Array<Array<string | undefined>>) => {
        for (let row = 0; row < board.length; row++) {
            let set = new Set(board[row]);
            if (set.size == 1 && !set.has(undefined)) {
                return true;
            }
        }
        return false;
    };

    const rotateArray = (board: Array<Array<string | undefined>>) => {
        let newBoard = createBoard(size);
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                newBoard[j][i] = board[i][j];
            }
        }
        return newBoard;
    };

    const getDiagonals = (board: Array<Array<string | undefined>>) => {
        let newBoard = [[...Array(size)], [...Array(size)]] as Array<Array<string | undefined>>;
        let i = 0;
        let j = board.length - 1;
        while (i < board.length) {
            newBoard[0][i] = board[i][i];
            newBoard[1][i] = board[j][i];
            j--;
            i++;
        }
        return newBoard;
    };

    const checkForWin = () => {
        if (checkRowByRow(board)) {
            setGameWon(true);
            return;
        }
        if (checkRowByRow(rotateArray(board))) {
            setGameWon(true);
            return;
        }
        if (checkRowByRow(getDiagonals(board))) {
            setGameWon(true);
            return;
        }
        setPlayer(player == "x" ? "y" : "x");
    };

    const [size, setSize] = useState(3);
    const [board, setBoard] = useState(createBoard(size));
    const [player, setPlayer] = useState("x");
    const [gameWon, setGameWon] = useState(false);

    const handleClickTile = (e: any, positionX: number, positionY: number) => {
        if (board[positionX][positionY] || gameWon) return;
        board[positionX][positionY] = player;
        setBoard(board);
        checkForWin();
    };

    useEffect(() => {
        setBoard(createBoard(size));
    }, [size]);

    return (
        <>
            <Navbar className="bg-primary shadow-lg mb-4 text-white">
                <Container>
                    <Nav className="me-auto">Tic Tac Toe</Nav>
                </Container>
            </Navbar>
            <Container>
                <Row style={{height: "80vh"}}>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <span className="pb-2 text-white fs-3">Board Size</span>
                        <div className="input-group mb-3">
                            <Button disabled={size == 3 ? true : false} onClick={decreaseBoardSize}>
                                -
                            </Button>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Board Size"
                                aria-label="Board Size"
                                aria-describedby="basic-addon2"
                                value={size}
                                disabled
                            ></input>
                            <Button
                                disabled={size == 10 ? true : false}
                                onClick={increaseBoardSize}
                            >
                                +
                            </Button>
                        </div>
                        <Button onClick={handleReset}>Reset</Button>
                    </Col>
                    <Col
                        xs={10}
                        className="d-flex flex-column justify-content-center align-items-center"
                    >
                        {gameWon ? (
                            <h1 className="text-white fs-5">Player {player.toUpperCase()} won!</h1>
                        ) : null}
                        {board.map((row, i) => {
                            return (
                                <Row
                                    key={`row${i}}`}
                                    className="d-flex justify-content-center align-items-center"
                                    md={size}
                                >
                                    {row.map((col, j) => {
                                        return (
                                            <Col
                                                key={`col${j}}`}
                                                onClick={e => {
                                                    handleClickTile(e, i, j);
                                                }}
                                                className="border border-light text-white fs-4 d-flex justify-content-center align-items-center"
                                                style={{
                                                    height: "60px",
                                                    width: "60px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {board[i][j]}
                                            </Col>
                                        );
                                    })}
                                </Row>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;
