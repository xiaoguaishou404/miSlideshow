import clockAlgorithm from "./clockAlgorithm.js"

// 轮播图类
class SlideShow {
  constructor(dom, imgs) {
    this.dom = dom;
    this.slideBoxDOM = dom.querySelector(".slide-box");
    this.slideLeftBtnDOM = this.slideBoxDOM.querySelector(".slide-left-btn");
    this.slideRightBtnDOM = this.slideBoxDOM.querySelector(".slide-right-btn ");
    this.bannerBoxDOM = this.slideBoxDOM.querySelector(".banner-box");
    this.paginationBoxDOM = this.slideBoxDOM.querySelector(".pagination-box");
    this.bannerItemDOMs = null;
    this.imgs = imgs
    this.SlideArr = new clockAlgorithm(imgs.length)
    this.drawDOM(this.imgs);
    this.bannerItemDOMs = this.bannerBoxDOM.querySelectorAll(".banner-item");
    // 初始化
    this.showCurrentBanner(this.SlideArr.arr)
    // 监听事件

    this.slideLeftBtnDOM.addEventListener("click", () => {
      this.showCurrentBanner(this.SlideArr.subtraction())
    });
    this.slideRightBtnDOM.addEventListener("click", () => {
      this.showCurrentBanner(this.SlideArr.addition())
    });

    // 定时器
    this.timer = null;
  }
  // 显示当前横幅
  showCurrentBanner(arr) {
    Object.values(this.bannerItemDOMs).forEach((item, i) => {
      item.classList.remove("left", "middle", "right");
      item.onclick = null;
      this.paginationBoxDOM.children[i].classList.remove("chose");
    });
    this.bannerItemDOMs[arr.at(-1)].classList.add("left");
    this.bannerItemDOMs[arr[0]].classList.add("middle");
    this.bannerItemDOMs[arr[1]].classList.add("right");
    this.paginationBoxDOM.children[arr[0]].classList.add("chose");
    this.bannerItemDOMs[arr.at(-1)].onclick = () => {
      this.showCurrentBanner(this.SlideArr.subtraction())
    };
    this.bannerItemDOMs[arr[1]].onclick = () => {
      this.showCurrentBanner(this.SlideArr.addition())
    };
  }
  // 渲染 DOM
  drawDOM(imgs) {
    this.bannerBoxDOM.innerHTML = imgs.reduce((bannerBoxDOMHtml, item) => {
      return bannerBoxDOMHtml + `<div class="banner-item"><img src="${item.imageName}"></div>`
    }, "");
    imgs.forEach((item, i) => {
      const span = document.createElement("span");
      span.addEventListener("mouseover", () => {
        this.showCurrentBanner(this.SlideArr.turn(i))
      });
      this.paginationBoxDOM.append(span);
    });
  }
  // 启动定时器
  openTimer() {
    this.timer = setInterval(() => {
      this.showCurrentBanner(this.SlideArr.addition())
    }, 3000);
  }

  // 清除定时器
  stopTimer() {
    clearInterval(this.timer);
  }

  init() {
    // 自动轮播
    this.openTimer();
    this.slideBoxDOM.addEventListener("mouseover", () => {
      this.stopTimer();
    });
    this.slideBoxDOM.addEventListener("mouseout", () => {
      this.openTimer();
    });
  }
}
export default SlideShow;
