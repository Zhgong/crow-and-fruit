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
                const fruitElement = document.createElement('span');
                fruitElement.textContent = fruitType;
                fruitElement.classList.add('fruit'); // 给每个水果元素添加一个类
                fruitContainers[fruitType].appendChild(fruitElement);
            }
        }
    };
    

    const updateFruitCount = (fruitType) => {
        if (fruits[fruitType] > 0) {
            fruits[fruitType]--;
            const fruitElement = fruitContainers[fruitType].lastElementChild;
            fruitElement.classList.add('fly-to-basket'); // 添加飞行动画
            setTimeout(() => {
                fruitContainers[fruitType].removeChild(fruitElement); // 动画完成后移除水果
                basketContent.textContent += `${fruitType} `;
            }, 500); // 等待动画完成后移除元素
        }
    };
    
    

    const moveCrow = () => {
        currentCrowPosition--;
        crowElement.style.transform = `translateX(${(crowPosition - currentCrowPosition) * 60}px)`; // 使用translateX进行平滑移动
        if (currentCrowPosition === 0) {
            setTimeout(() => {
                alert('乌鸦进入果园，乌鸦胜利！');
                resetGame();
            }, 500); // 延迟提示，等待动画完成
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
