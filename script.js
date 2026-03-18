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
const words =["OnlyourMiracle", "Love", "AI Bot", "Infinite", "知行合一", "少年", "Dream", "Possibilities"];

// 设置在屏幕上同时显示多少个跳动词汇
const textCount = 15; 
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
