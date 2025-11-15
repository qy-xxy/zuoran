const canvas = document.querySelector('.canvas');
const liJiaoContainer = document.querySelector('.li-jiao-container');
// 随机形状
function getRandomShape() {
    const shapes = ['square', 'circle', 'rounded', 'triangle', 'parallelogram'];
    return shapes[Math.floor(Math.random() * shapes.length)];
}
// 随机颜色
function getRandomColor() {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22'];
    return colors[Math.floor(Math.random() * colors.length)];
}
// 随机大小
function getRandomSize() {
    return Math.floor(Math.random() * 60) + 20;
}
// 随机位置
function getRandomPosition(size) {
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    };
}
// 键盘按下事件
window.addEventListener('keydown', (e) => {
    // ESC键：清空画布（保留原功能）
    if (e.key === 'Escape') {
        canvas.querySelectorAll('.shape').forEach(shape => shape.remove());
        return;
    }
    // C键：弹出“李娇”提示框
    if (e.key.toLowerCase() === 'c') {
        // 先移除已存在的提示框（避免重复）
        const existingBox = document.querySelector('.li-jiao-box');
        if (existingBox) existingBox.remove();
        // 创建新的提示框
        const liJiaoBox = document.createElement('div');
        liJiaoBox.classList.add('li-jiao-box');
        liJiaoBox.textContent = '李娇';
        // 添加到容器并显示
        liJiaoContainer.appendChild(liJiaoBox);
        // 3秒后自动移除（配合CSS动画）
        setTimeout(() => {
            if (liJiaoBox.parentNode) liJiaoBox.remove();
        }, 3000);

        return;
    }
    // 其他任意键：生成形状（原功能不变）
    const shapeType = getRandomShape();
    const size = getRandomSize();
    const color = getRandomColor();
    const position = getRandomPosition(size);
    const keyText = e.key === ' ' ? 'Space' : e.key;

    const newShape = document.createElement('div');
    newShape.classList.add('shape', shapeType);
    if (shapeType === 'triangle') {
        newShape.style.borderColor = `transparent transparent ${color} transparent`;
        newShape.style.borderWidth = `0 ${size/2}px ${size}px ${size/2}px`;
        newShape.style.left = `${position.x}px`;
        newShape.style.top = `${position.y}px`;
    } else if (shapeType === 'parallelogram') {
        newShape.style.width = `${size}px`;
        newShape.style.height = `${size}px`;
        newShape.style.backgroundColor = color;
        newShape.style.left = `${position.x}px`;
        newShape.style.top = `${position.y}px`;
        newShape.style.transform = 'skew(-20deg)';
        newShape.innerHTML = `<span style="transform: skew(20deg);">${keyText}</span>`;
    } else {
        newShape.style.width = `${size}px`;
        newShape.style.height = `${size}px`;
        newShape.style.backgroundColor = color;
        newShape.style.left = `${position.x}px`;
        newShape.style.top = `${position.y}px`;
        newShape.textContent = keyText;
    }
    newShape.addEventListener('click', () => {
        newShape.classList.add('remove');
        setTimeout(() => newShape.remove(), 300);
    });
    canvas.appendChild(newShape);
});