document.addEventListener('DOMContentLoaded', () => {
    const fruits = {
        '🍎': 4,
        '🍐': 4,
        '🍏': 4,
        '🍑': 4
    };
    const crowPosition = 5;
    let currentCrowPosition = crowPosition;

    const fruitContainers = {
        '🍎': document.getElementById('🍎-container'),
        '🍐': document.getElementById('🍐-container'),
        '🍏': document.getElementById('🍏-container'),
        '🍑': document.getElementById('🍑-container')
    };

    const rollDiceButton = document.getElementById('roll-dice');
    const diceResultDisplay = document.getElementById('dice-result');
    const crowElement = document.getElementById('crow');
    const basketContent = document.getElementById('basket-content');

    // 初始化每棵树上的水果emoji
    const initializeFruits = () => {
        for (let fruitType in fruits) {
            fruitContainers[fruitType].innerHTML = ''; // 清空容器
            for (let i = 0; i < fruits[fruitType]; i++) {
                fruitContainers[fruitType].innerHTML += fruitType;
            }
        }
    };

    const updateFruitCount = (fruitType) => {
        if (fruits[fruitType] > 0) {
            fruits[fruitType]--;
            fruitContainers[fruitType].innerHTML = fruitContainers[fruitType].innerHTML.slice(0, -2); // 移除一个水果emoji
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
        }
        currentCrowPosition = crowPosition;
        crowElement.textContent = '🐦‍⬛';
        basketContent.textContent = '';
        initializeFruits(); // 重置水果显示
    };

    rollDiceButton.addEventListener('click', () => {
        const diceFaces = ['🍎', '🍐', '🍏', '🍑', '🐦‍⬛', '🧺'];
        const diceRoll = Math.floor(Math.random() * diceFaces.length);
        const result = diceFaces[diceRoll];
        diceResultDisplay.textContent = result;

        if (result === '🐦‍⬛') {
            moveCrow();
        } else if (result === '🧺') {
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

    initializeFruits(); // 初始化游戏界面
});
