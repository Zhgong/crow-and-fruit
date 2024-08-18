"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

type FruitType = '🍎' | '🍐' | '🍏' | '🍑';

const initialFruits: Record<FruitType, number> = {
    '🍎': 4,
    '🍐': 4,
    '🍏': 4,
    '🍑': 4
};

export default function Home() {
    const [fruits, setFruits] = useState<Record<FruitType, number>>(initialFruits);
    const [crowPosition, setCrowPosition] = useState(5);
    const [diceResult, setDiceResult] = useState<FruitType | '🐦‍⬛' | '🧺' | ''>('');
    const [basket, setBasket] = useState<FruitType[]>([]);

    const initializeFruits = () => {
        setFruits(initialFruits);
        setBasket([]);
        setCrowPosition(5);
        setDiceResult('');
    };

    const updateFruitCount = (fruitType: FruitType) => {
        if (fruits[fruitType] > 0) {
            setFruits(prevFruits => ({
                ...prevFruits,
                [fruitType]: prevFruits[fruitType] - 1,
            }));
            setBasket(prevBasket => [...prevBasket, fruitType]);
        }
    };

    const moveCrow = () => {
        setCrowPosition(prev => prev - 1);
        if (crowPosition - 1 === 0) {
            setTimeout(() => {
                alert('乌鸦进入果园，乌鸦胜利！');
                initializeFruits();
            }, 500);
        }
    };

    const rollDice = () => {
        const diceFaces = ['🍎', '🍐', '🍏', '🍑', '🐦‍⬛', '🧺'] as const;
        const roll = diceFaces[Math.floor(Math.random() * diceFaces.length)];
        setDiceResult(roll);

        if (roll === '🐦‍⬛') {
            moveCrow();
        } else if (roll === '🧺') {
            const availableFruits: FruitType[] = Object.keys(fruits)
                .filter((fruit): fruit is FruitType => fruits[fruit as FruitType] > 0);
            if (availableFruits.length > 0) {
                const randomFruit = availableFruits[Math.floor(Math.random() * availableFruits.length)];
                updateFruitCount(randomFruit);
            }
        } else {
            updateFruitCount(roll as FruitType);
        }

        if (Object.values(fruits).every(count => count === 0)) {
            setTimeout(() => {
                alert('所有水果被摘完，玩家胜利！');
                initializeFruits();
            }, 500);
        }
    };

    return (
        <main className={styles.container}>
            <h1>乌鸦与果园</h1>
            <div id="game-board">
                <div id="trees">
                    {Object.keys(fruits).map((fruit, index) => (
                        <div key={index} className="tree">
                            <h3>{fruit}</h3>
                            <div className="fruit-container">
                                {Array(fruits[fruit as FruitType]).fill(fruit).map((fruitEmoji, i) => (
                                    <span key={i} className="fruit">{fruitEmoji}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div id="crow-path">
                    <div className={styles.crow} style={{ transform: `translateX(${(5 - crowPosition) * 60}px)` }}>
                        🐦‍⬛
                    </div>
                </div>

                <button onClick={rollDice}>🎲</button>
                <div>{diceResult}</div>

                <div id="basket">
                    <h3>🧺 篮子</h3>
                    <div>
                        {basket.map((fruit, i) => (
                            <span key={i} className="fruit">{fruit}</span>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
