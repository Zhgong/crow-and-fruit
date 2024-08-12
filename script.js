document.addEventListener('DOMContentLoaded', () => {
    const fruits = {
        'red-apple': 4,
        'pear': 4,
        'green-apple': 4,
        'plum': 4
    };
    const crowPosition = 5;
    let currentCrowPosition = crowPosition;

    const rollDiceButton = document.getElementById('roll-dice');
    const diceResultDisplay = document.getElementById('dice-result');
    const crowElement = document.getElementById('crow');
    const basketContent = document.getElementById('basket-content');

    const updateFruitCount = (fruitType) => {
        if (fruits[fruitType] > 0) {
            fruits[fruitType]--;
            document.getElementById(`${fruitType}-count`).textContent = fruits[fruitType];
            basketContent.textContent += `${fruitType} `;
        }
    };

    const moveCrow = () => {
        currentCrowPosition--;
        crowElement.style.marginLeft = `${(crowPosition - currentCrowPosition) * 20}px`;
        if (currentCrowPosition === 0) {
            alert('乌鸦进入果园，乌鸦胜利！');
            resetGame();
        }
    };

    const resetGame = () => {
        for (let fruitType in fruits) {
            fruits[fruitType] = 4;
            document.getElementById(`${fruitType}-count`).textContent = 4;
        }
        currentCrowPosition = crowPosition;
        crowElement.style.marginLeft = '0px';
        basketContent.textContent = '';
    };

    rollDiceButton.addEventListener('click', () => {
        const diceFaces = ['red-apple', 'pear', 'green-apple', 'plum', 'crow', 'basket'];
        const diceRoll = Math.floor(Math.random() * diceFaces.length);
        const result = diceFaces[diceRoll];
        diceResultDisplay.textContent = result;

        if (result === 'crow') {
            moveCrow();
        } else if (result === 'basket') {
            const availableFruits = Object.keys(fruits).filter(fruit => fruits[fruit] > 0);
            if (availableFruits.length > 0) {
                const randomFruit = availableFruits[Math.floor(Math.random() * availableFruits.length)];
                updateFruitCount(randomFruit);
            }
        } else {
            updateFruitCount(result);
        }

        if (Object.values(fruits).every(count => count === 0)) {
            alert('所有水果被摘完，玩家胜利！');
            resetGame();
        }
    });
});
