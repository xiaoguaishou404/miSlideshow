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
    this.px = 0
    this.left = 0
    this.pxNow = 0
    this.mousedown = false
    this.clientX = 0
    this.SlideArr = new clockAlgorithm(imgs.length)
    this.drawDOM(this.imgs);
    this.bannerItemDOMs = this.bannerBoxDOM.querySelectorAll(".banner-item");
    // 初始化
    this.showCurrentBanner(this.SlideArr.arr)
    // 监听事件

    this.slideLeftBtnDOM.addEventListener("click", () => {
      this.bannerBoxDOM.innerHTML = `<div class="banner-item"><img src="${this.imgs[this.SlideArr.subtraction()[0]].imageName}"></div>` + this.bannerBoxDOM.innerHTML
      this.px -= 100
      let leftMove = () => {
        this.px += 2
        this.bannerBoxDOM.style.left = `${this.px}%`
        if (Math.abs(this.px % 100) !== 0) {
          requestAnimationFrame(leftMove)
        }
      }
      requestAnimationFrame(leftMove)
      this.showCurrentBanner(this.SlideArr.arr)
    });
    this.slideRightBtnDOM.addEventListener("click", () => {
      this.bannerBoxDOM.innerHTML += `<div class="banner-item"><img src="${this.imgs[this.SlideArr.addition()[0]].imageName}"></div>`
      let leftMove = () => {
        this.px -= 2
        this.bannerBoxDOM.style.left = `${this.px}%`
        if (Math.abs(this.px % 100) !== 0) {
          requestAnimationFrame(leftMove)
        }
      }
      requestAnimationFrame(leftMove)
      this.showCurrentBanner(this.SlideArr.arr)
    });
    this.bannerBoxDOM.addEventListener("mousedown", (e) => {
      this.mousedown = true
      this.clientX = e.clientX
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      this.bannerBoxDOM.innerHTML += `<div class="banner-item"><img src="${this.imgs[this.SlideArr.arr[1]].imageName}"></div>`
      this.bannerBoxDOM.innerHTML = `<div class="banner-item"><img src="${this.imgs[this.SlideArr.arr.at(-1)].imageName}"></div>` + this.bannerBoxDOM.innerHTML
      this.bannerBoxDOM.style.left = this.bannerBoxDOM.style.left ? parseInt(this.bannerBoxDOM.style.left.split("px")[0]) - window.screen.width + "px" : -window.screen.width + "px"
      this.left = this.bannerBoxDOM.style.left ? parseInt(this.bannerBoxDOM.style.left.split("px")[0]) : 0

    })
    this.bannerBoxDOM.addEventListener("mousemove", (e) => {
      if (this.mousedown) {
        this.bannerBoxDOM.style.left = `${this.left + e.clientX - this.clientX}px`
        // console.log(this.bannerBoxDOM.style.left);
      }
    })
    this.bannerBoxDOM.addEventListener("mouseup", (e) => {
      this.mousedown = false
      let movePx = e.clientX - this.clientX
      if (Math.abs(movePx) > window.screen.width * 0.4) {
        if (movePx < 0) {
          console.log(11);

          let num = parseInt(this.bannerBoxDOM.style.left.split("px")[0])
          let leftMove = () => {
            num -= window.screen.width - Math.abs(num) > 20 ? 20 : window.screen.width - Math.abs(num)
            this.bannerBoxDOM.style.left = `${num}px`
            if (Math.abs(num) % window.screen.width !== 0) {
              requestAnimationFrame(leftMove)
            }
          }
          requestAnimationFrame(leftMove)
          this.showCurrentBanner(this.SlideArr.arr)

        } else {
          let num = parseInt(this.bannerBoxDOM.style.left.split("px")[0])
          let leftMove = () => {
            num += window.screen.width - Math.abs(num) > 20 ? 20 : window.screen.width - Math.abs(num)
            this.bannerBoxDOM.style.left = `${num}px`
            if (Math.abs(num) % window.screen.width !== 0) {
              requestAnimationFrame(leftMove)
            }
          }
          requestAnimationFrame(leftMove)
          this.showCurrentBanner(this.SlideArr.arr)

        }
      } else {
        if (movePx < 0) {
          let num = parseInt(this.bannerBoxDOM.style.left.split("px")[0])
          let leftMove = () => {
            num += Math.abs(num) % window.screen.width > 20 ? 20 : Math.abs(num) % window.screen.width
            this.bannerBoxDOM.style.left = `${num}px`
            if (Math.abs(num) % window.screen.width !== 0) {
              requestAnimationFrame(leftMove)
            }
          }
          requestAnimationFrame(leftMove)
        } else {
          let num = parseInt(this.bannerBoxDOM.style.left.split("px")[0])
          let leftMove = () => {
            num -= Math.abs(num) % window.screen.width > 20 ? 20 : Math.abs(num) % window.screen.width
            this.bannerBoxDOM.style.left = `${num}px`
            if (Math.abs(num) % window.screen.width !== 0) {
              requestAnimationFrame(leftMove)
            }
          }
          requestAnimationFrame(leftMove)
        }
        this.bannerBoxDOM.children[0].remove()
        this.bannerBoxDOM.children[this.bannerBoxDOM.children.length - 1].remove()



      }
      this.clientX = 0
      // 定时器
      this.timer = null;
    })
  }
  // 显示当前横幅
  showCurrentBanner(arr) {
    Array.from(this.paginationBoxDOM.children).forEach((item, i) => {
      // item.onclick = null;
      item.classList.remove("chose");
    });
    // this.bannerItemDOMs[arr.at(-1)].classList.add("left");
    // this.bannerItemDOMs[arr[0]].classList.add("middle");
    // this.bannerItemDOMs[arr[1]].classList.add("right");
    // this.bannerBoxDOM.innerHTML = `<div class="banner-item"><img src="${this.imgs[arr.at(-1)].imageName}"></div>` + this.bannerBoxDOM.innerHTML;




    this.paginationBoxDOM.children[arr[0]].classList.add("chose");
    // this.bannerItemDOMs[arr.at(-1)].onclick = () => {
    //   this.showCurrentBanner(this.SlideArr.subtraction())
    // };
    // this.bannerItemDOMs[arr[1]].onclick = () => {
    //   this.showCurrentBanner(this.SlideArr.addition())
    // };
  }
  // 渲染 DOM
  drawDOM(imgs) {
    // this.bannerBoxDOM.innerHTML = imgs.reduce((bannerBoxDOMHtml, item) => {
    //   return bannerBoxDOMHtml + `<div class="banner-item"><img src="${item.imageName}"></div>`
    // }, "");

    this.bannerBoxDOM.innerHTML = `<div class="banner-item"><img src="${imgs[0].imageName}"></div>`
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
    // 这里用到了浏览器ui线程闲置，eventloop相关知识，当页面隐藏时，setTimeout并不会一直被递归调用
    let animation = () => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.slideRightBtnDOM.click()
          animation()
        }, 5000);
      })
    }
    animation()

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
