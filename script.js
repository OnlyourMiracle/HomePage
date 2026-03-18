var swiper = new Swiper('.blog-slider', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },
      // autoHeight: true,
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
      }
    });
/* =========================================
   新增：防重叠 & 避让卡片的背景文本生成逻辑
========================================= */
// 确保页面及卡片DOM完全加载后，再计算实际占据的像素位置
window.addEventListener('load', function() {
  const words =["OnlyourMiracle", "Love", "AI Bot", "Infinite", "知行合一思无邪", "少年", "Dream", "Possibilities", "历尽千帆仍少年", "决定我们过什么样生活的 从来不是哪一次的选择 而是我们一直以来的状态", "人生如梦 灵犀一动 不觉惊跃 如魇得醒", "万千智慧始于记忆", "穷人和中产阶级为钱而工作 富人让钱为他工作", "不容置疑的是 太阳升起时你正好在场 这才是最重要的", "我看万物像你 我看你像万物", "财富犹如海水 喝得越多越口渴", "人们常常不知道 哪一次分别是最后一次相见", "人需要有一段好的感情 一份好的工作 一个能自得其乐的爱好 三个占一个 生活就能有盼头"];
  const textCount = 15; // 期望生成的文本数量
  const container = document.getElementById('bg-text-container');
  const slider = document.querySelector('.blog-slider');

  // 数组：存储所有“不可侵犯”的矩形区域 {left, right, top, bottom}
  const occupiedBoxes =[];

  // 1. 获取中心卡片的实际位置大小，并加入“不可侵犯区域”
  // 这能保证跳动文本绝对不会生成在卡片背后或前面被阻挡
  const sliderRect = slider.getBoundingClientRect();
  occupiedBoxes.push({
    left: sliderRect.left - 40,   // 左右增加40px安全距离
    right: sliderRect.right + 40,
    top: sliderRect.top - 60,     // 上下增加60px安全距离(预留给跳动动画的空间)
    bottom: sliderRect.bottom + 60
  });

  // 2. 循环生成文本并寻找空位
  for (let i = 0; i < textCount; i++) {
    const span = document.createElement('span');
    span.className = 'bg-text';
    span.innerText = words[Math.floor(Math.random() * words.length)];
    
    // 随机字体大小 (16px 到 36px 之间)
    const fontSize = Math.random() * 20 + 16;
    span.style.fontSize = `${fontSize}px`;
    
    // 关键：先将其设为不可见并放进容器，才能获取到浏览器渲染后真实的文字长宽
    span.style.visibility = 'hidden';
    container.appendChild(span);
    
    // 获取当前这段文字占据的实际宽高
    const rect = span.getBoundingClientRect();
    const width = rect.width + 30; // 宽度增加安全距离
    const height = rect.height + 60; // 高度增加安全距离，以容纳上下跳动的位移

    let isPlaced = false;
    let attempts = 0;
    const maxAttempts = 200; // 每个词最多尝试找200次空位

    // 碰撞检测核心逻辑：一直随机找位置，直到不和任何已有区域重合
    while (!isPlaced && attempts < maxAttempts) {
      // 在可视屏幕的像素范围内随机坐标
      const x = Math.random() * (window.innerWidth - width);
      const y = Math.random() * (window.innerHeight - height);

      // 当前测试的新位置边界
      const newBox = {
        left: x,
        right: x + width,
        top: y,
        bottom: y + height
      };

      let hasCollision = false;
      
      // 与所有已占用的区域进行比对
      for (const box of occupiedBoxes) {
        // 判断两个矩形是否相交的数学公式
        if (
          newBox.left < box.right &&
          newBox.right > box.left &&
          newBox.top < box.bottom &&
          newBox.bottom > box.top
        ) {
          hasCollision = true; // 发生重叠，停止检查该盒子
          break;
        }
      }

      // 如果没有发生任何重叠，那就是好位置！
      if (!hasCollision) {
        // 正式放置文字
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        span.style.visibility = 'visible'; // 恢复可见
        
        // 随机动画参数
        const duration = Math.random() * 4 + 4;
        const delay = Math.random() * 5;
        span.style.animationDuration = `${duration}s`;
        span.style.animationDelay = `${delay}s`;
        
        // 将这个新文本占据的区域也加入“不可侵犯区域”列表
        occupiedBoxes.push(newBox);
        isPlaced = true;
      }
      attempts++;
    }

    // 如果尝试了 200 次还是找不到空位（屏幕满了），就把它删掉，宁缺毋滥
    if (!isPlaced) {
      container.removeChild(span);
    }
  }
});
