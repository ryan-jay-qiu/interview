// // 设置 rem 函数
function setRem() {
    const scale = document.documentElement.clientWidth / 100; // 当前屏幕宽度与设计稿
    if (scale <= 15) return;
    document.documentElement.style.fontSize = scale + "px";
  }
  
  // 在页面加载和窗口大小变化时调用 setRem 函数
  window.addEventListener("DOMContentLoaded", setRem);
  window.addEventListener("resize", setRem);