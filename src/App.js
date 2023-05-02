import React, { useState, useEffect } from 'react'
import Footer from "./Footer";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
function Square({ className, onClick, value }) {
    return (
        <button className={`flex items-center border border-zinc-100 justify-center h-32 w-32 hover:bg-zinc-50 active:scale-90 active:shadow-2xl transition-all rounded-xl ${className}`} onClick={onClick}>
            {value === "X" ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-14 h-14 fill-sky-600">
                    <path d="M393.4 41.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L269.3 256 438.6 425.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 301.3 54.6 470.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0L224 210.7 393.4 41.4z"/>
                </svg>
                ) : value === 'O' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-14 h-14 fill-cyan-500">
                        <path d="M224 96C135.6 96 64 167.6 64 256s71.6 160 160 160s160-71.6 160-160s-71.6-160-160-160zM0 256C0 132.3 100.3 32 224 32s224 100.3 224 224s-100.3 224-224 224S0 379.7 0 256z"/>
                    </svg>
                ) : null
            }
        </button>
    )
}
const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [isXNext, setIsXNext] = useState(true)
    const [winningSquares, setWinningSquares] = useState(null)
    const [xWins, setXWins] = useState(0)
    const [oWins, setOWins] = useState(0)
    const [draws, setDraws] = useState(0)
    const handleClick = i => {
        if (winningSquares || squares[i]) {
            return
        }
        setSquares(prevSquares => {
            const newSquares = [...prevSquares]
            newSquares[i] = isXNext ? "X" : "O"
            return newSquares
        })
        setIsXNext(prevIsXNext => !prevIsXNext)
    }
    useEffect(() => {
        let winner = null
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i]
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                winner = squares[a]
                setWinningSquares(winningCombinations[i]);
                break
            }
        }
        if (!winner && squares.every(square => square !== null)) {
            winner = "Draw"
        }
        if (winner === "X") {
            setXWins(prevXWins => prevXWins + 1);
        } else if (winner === "O") {
            setOWins(prevOWins => prevOWins + 1);
        } else if (winner === "Draw") {
            setDraws(prevDraws => prevDraws + 1);
        }
    }, [squares])

    function handleRestart() {
        setSquares(Array(9).fill(null))
        setIsXNext(true)
        setWinningSquares(null)
    }

    function renderSquare(i) {
        const isWinningSquare = winningSquares && winningSquares.includes(i);
        return (
            <Square
                value={squares[i]}
                onClick={() => handleClick(i)}
                className={`${isWinningSquare ? "bg-zinc-100" : ""}`}
            />
        )
    }

    return (
        <>
            <div>
                <div className="max-w-7xl mx-auto px-3 py-8">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 h-screen relative">
                        <div className="flex justify-start items-center w-full">
                            <span className="md:w-5/6 w-full text-5xl md:text-8xl font-bold text-zinc-700 ">Let's play the tic-tac-toe Game!</span>
                        </div>
                        <div className="flex flex-col gap-y-12 items-center justify-center mt-12">
                            <div className="flex flex-row gap-x-16">
                                <div className="flex flex-col items-center justify-center gap-y-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-sky-600">
                                        <path d="M393.4 41.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L269.3 256 438.6 425.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 301.3 54.6 470.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0L224 210.7 393.4 41.4z"/>
                                    </svg>
                                    <span className="font-extrabold text-sky-600">{xWins} wins</span>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-y-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-cyan-500">
                                        <path d="M224 96C135.6 96 64 167.6 64 256s71.6 160 160 160s160-71.6 160-160s-71.6-160-160-160zM0 256C0 132.3 100.3 32 224 32s224 100.3 224 224s-100.3 224-224 224S0 379.7 0 256z"/>
                                    </svg>
                                    <span className="font-extrabold text-cyan-600">{oWins} wins</span>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-y-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-zinc-600">
                                        <path d="M48 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48zm0 192c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48z"/>
                                    </svg>
                                    <div className="font-extrabold text-zinc-600">draws: {draws}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 shadow-2xl rounded-xl relative overflow-hidden">
                                {renderSquare(0)}
                                {renderSquare(1)}
                                {renderSquare(2)}
                                {renderSquare(3)}
                                {renderSquare(4)}
                                {renderSquare(5)}
                                {renderSquare(6)}
                                {renderSquare(7)}
                                {renderSquare(8)}
                            </div>

                            <div className="flex flex-row items-center gap-x-20">
                                {winningSquares ? (
                                    <div className="flex flex-row gap-x-6 items-center">
                                        <span className="text-4xl">🎉</span>
                                        <div className="flex items-center">
                                            <span className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                                {squares[winningSquares[0]]}
                                            </span>
                                            <span className="ml-2 text-2xl">Win!</span>
                                        </div>
                                    </div>
                                ) : squares.includes(null) ? (
                                    <div className={`transition-all p-3 rounded-full w-12 h-12 flex items-center justify-center ${isXNext ? "bg-sky-600" : "bg-cyan-500 text-sky-50 scale-125"}`}>
                                        {isXNext ?
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 fill-sky-50">
                                                <path d="M393.4 41.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L269.3 256 438.6 425.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 301.3 54.6 470.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0L224 210.7 393.4 41.4z"/>
                                            </svg>
                                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 fill-cyan-50">
                                                <path d="M224 96C135.6 96 64 167.6 64 256s71.6 160 160 160s160-71.6 160-160s-71.6-160-160-160zM0 256C0 132.3 100.3 32 224 32s224 100.3 224 224s-100.3 224-224 224S0 379.7 0 256z"/>
                                            </svg>
                                        }
                                    </div>
                                ) : (
                                    <div className="draw text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-12 h-12 mb-2 fill-zinc-400">
                                            <path d="M312.5 148.7l102.8-102.8l61.12-10.37l-10.37 61.12l-102.8 102.8c-6.246 6.246-6.246 16.38 0 22.62c6.246 6.246 16.37 6.246 22.62 0l110.1-110.1l15.87-93.75c1.625-11.25-8.25-19.5-18.12-18.13l-93.74 15.88l-110.1 110.1c-6.248 6.246-6.248 16.38 0 22.62C296.2 154.1 306.3 154.1 312.5 148.7zM288.6 362c6.246-6.246 6.246-16.37 0-22.62L45.89 96.68l-10.37-61.12l61.12 10.37l242.7 242.7c6.246 6.25 16.37 6.25 22.62 0c6.246-6.246 6.246-16.37 0-22.62l-249.9-249.1l-93.74-15.88C7.027-1.459-1.222 8.416 .1531 18.29l15.87 93.75l249.9 249.1C272.2 368.3 282.3 368.3 288.6 362zM211.3 403.3l7.978-7.976c6.25-6.25 6.25-16.37 0-22.62c-6.25-6.25-16.37-6.25-22.62 0L188.7 380.7l-57.37-57.37l7.978-7.977c6.25-6.25 6.25-16.37 0-22.62c-6.25-6.25-16.37-6.25-22.62 0L108.7 300.7L84.7 276.7C81.59 273.5 77.53 271.1 73.47 271.1c-4.074 0-8.148 1.559-11.25 4.672L27.74 311.3c-5.336 5.336-6.205 13.77-1.986 19.98l34.38 57.09l-50.82 50.88c-12.4 12.39-12.41 32.5-.0332 44.91l18.52 18.57C33.97 508.9 42.13 512 50.29 512c8.139 0 16.28-3.09 22.46-9.269l50.79-50.86l57.21 34.37c2.641 1.797 5.686 2.668 8.723 2.668c4.102 0 8.191-1.59 11.26-4.656l34.62-34.5c6.188-6.168 6.197-16.27 .0195-22.44L211.3 403.3zM187.1 452.7l-68.48-41.15l-68.13 68.54l-18.5-18.27l68.49-68.57l-41.14-68.32l14.19-14.24l127.8 127.8L187.1 452.7zM502.7 439.3l-50.86-50.8l34.37-57.21c1.797-2.641 2.668-5.684 2.668-8.723c0-4.102-1.59-8.191-4.656-11.25l-34.5-34.62c-6.168-6.187-16.27-6.195-22.44-.0234l-150.7 150.7c-3.102 3.102-4.652 7.168-4.652 11.23c0 4.07 1.559 8.144 4.672 11.25l34.61 34.48c5.336 5.336 13.77 6.207 19.98 1.984l57.09-34.37l50.88 50.82c12.39 12.4 32.5 12.41 44.91 .0313l18.57-18.52c6.203-6.18 9.305-14.34 9.305-22.49C511.1 453.6 508.9 445.4 502.7 439.3zM461.8 480.1l-68.57-68.49l-68.32 41.14l-14.24-14.19l127.8-127.8l14.2 14.25l-41.15 68.48l68.54 68.13L461.8 480.1z"/>
                                        </svg>
                                        <span className="text-zinc-400 font-bold">draw</span>
                                    </div>
                                )}
                            </div>

                            {winningSquares || !squares.includes(null) ? (
                                <button onClick={handleRestart} className="bg-zinc-300 hover:bg-zinc-400 transition-all p-3 rounded-full w-20 h-20 mb-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white p-2">
                                        <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                                    </svg>
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Board
