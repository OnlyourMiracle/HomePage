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
   新增：生成背景跳动自定义文本的逻辑
========================================= */
// 你可以自定义想要在背景跳动的文本内容
const words =["OnlyourMiracle", "Love", "AI Bot", "Infinite", "知行合一思无邪", "少年", "Dream", "Possibilities", "历尽千帆仍少年", "决定我们过什么样生活的 从来不是哪一次的选择 而是我们一直以来的状态", "人生如梦 灵犀一动 不觉惊跃 如魇得醒", "万千智慧始于记忆", "穷人和中产阶级为钱而工作 富人让钱为他工作", "不容置疑的是 太阳升起时你正好在场 这才是最重要的", "我看万物像你 我看你像万物", "财富犹如海水 喝得越多越口渴", "人们常常不知道 哪一次分别是最后一次相见", "人需要有一段好的感情 一份好的工作 一个能自得其乐的爱好 三个占一个 生活就能有盼头"];

// 设置在屏幕上同时显示多少个跳动词汇
const textCount = 20; 
const container = document.getElementById('bg-text-container');

for (let i = 0; i < textCount; i++) {
  const span = document.createElement('span');
  span.className = 'bg-text';
  
  // 随机挑选一个词汇
  span.innerText = words[Math.floor(Math.random() * words.length)];
  
  // 随机位置 (限制在可见屏幕范围内)
  const posX = Math.random() * 90; // 0% - 90%
  const posY = Math.random() * 90; // 0% - 90%
  span.style.left = `${posX}vw`;
  span.style.top = `${posY}vh`;
  
  // 随机字体大小 (16px 到 36px 之间)
  const fontSize = Math.random() * 20 + 16;
  span.style.fontSize = `${fontSize}px`;
  
  // 随机动画持续时间和延迟时间，让它们跳动显得错落有致
  const duration = Math.random() * 4 + 4; // 4秒 - 8秒
  const delay = Math.random() * 5;        // 0秒 - 5秒
  span.style.animationDuration = `${duration}s`;
  span.style.animationDelay = `${delay}s`;
  
  // 将生成的元素加入到容器中
  container.appendChild(span);
}
