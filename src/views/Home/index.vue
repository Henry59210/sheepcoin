
<template>
  <html lang="en">
    <body>
      <!-- 轮播 -->
      <el-carousel  :height="bannerH+'px'"  trigger="click" arrow="always">
        <el-carousel-item class="image" v-for="item in images" :key="item.id">
          <img :src="item.url" width="100%" height="100%" alt="无图片" />
        </el-carousel-item>
      </el-carousel>

  <!--  CONTERTAINr -->
  <div class="container marketing">

      <!-- 轮播下面的内容展示:marketing -->
       <div class="row">
        <div class="col-lg-4">
          <img class="bd-placeholder-img rounded-circle" width="300" height="300" x="50%" y="50%" dy=".3em" src="../../assets/img/home/Topping_up.svg" alt=""/>
          <h2 class="fw-normal">Topping up your account</h2>
          <p>Top up your cryptocurrency account to open cryptocurrency trading. </p>
        </div> <!-- col-lg-4 -->
        <div class="col-lg-4">
          <img class="bd-placeholder-img rounded-circle" width="300" height="300" x="50%" y="50%" dy=".3em" src="../../assets/img/home/Complete_authentication.svg" alt=""/>
          <h2 class="fw-normal">Complete authentication</h2>
          <p>Complete identity verification to ensure the security of personal accounts and transactions.</p>
          </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img class="bd-placeholder-img rounded-circle" width="300" height="300" x="50%" y="50%" dy=".3em" src="../../assets/img/home/Start_trading.svg" alt=""/>
          <h2 class="fw-normal">Start trading</h2>
          <p>And lastly this, the third column of representative placeholder content.</p>
        </div><!-- /.col-lg-4 -->

         <div style="text-align: center; padding: 20px"><el-button type="success" class="explore-button" @click="turnToSimpleTrade">Start Explore</el-button></div>
       </div>

  </div><!-- END THE CONTERTAINr -->


  <!-- CONTAINER2 -->
  <!-- 介绍素材 -->
  <div class="container2">
    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading fw-normal lh-1">Leading digital asset trading platform. <span class="text-muted">Quality digital assets.</span></h2>
        <p class="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
        <div class="col-md-7" >
<!--          <img class="bd-placeholder-img rounded-circle small_icon_left"  src="../../assets/img/home/1-1.svg" x="50%" y="50%" dy=".3em" alt="">-->
<!--          <img class="bd-placeholder-img rounded-circle small_icon_right"  src="../../assets/img/home/1-1.svg" x="50%" y="50%" dy=".3em" alt="">-->
        </div>
      </div>
      <div class="col-md-5">
        <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src="../../assets/img/home/01.svg" alt="" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading fw-normal lh-1">The world's top security risk control system. <span class="text-muted">Top-level security risk control.</span></h2>
        <p class="lead">Multi-factor encryption means, 7 days and 24 hours a day platform monitoring, all-round protection of user asset security.</p>
        <div class="col-md-7 order-md-2" >
<!--          <img class="bd-placeholder-img rounded-circle small_icon_left"  src="../../assets/img/home/1-1.svg" x="50%" y="50%" dy=".3em" alt="">-->
<!--          <img class="bd-placeholder-img rounded-circle small_icon_right"  src="../../assets/img/home/1-1.svg" x="50%" y="50%" dy=".3em" alt="">-->
        </div>

      </div>
      <div class="col-md-5 order-md-1">
        <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src="../../assets/img/home/02.svg" alt="" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading fw-normal lh-1">Millions of users trust the choice. <span class="text-muted">More than 200 countries are covered.</span></h2>
        <p class="lead">Localized transaction service centers have been set up in many countries and regions around the world to create a blockchain ecosystem integrating multiple business forms.</p>
        <div class="col-md-7 " >
<!--          <img class="bd-placeholder-img rounded-circle small_icon_left"  src="../../assets/img/home/1-1.svg" x="50%" y="50%" dy=".3em" alt="">-->
<!--          <img class="bd-placeholder-img rounded-circle small_icon_right"  src="../../assets/img/home/1-1.svg" x="50%" y="50%" dy=".3em" alt="">-->
        </div>
      </div>
      <div class="col-md-5">
        <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src="../../assets/img/home/03.svg" alt="" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading fw-normal lh-1">Start trading anytime, anywhere. <span class="text-muted">See for yourself.</span></h2>
        <p class="lead">Browse real-time Huobi data anytime and anywhere, and trade with simple operation. Freedom to buy and sell. Safe and reliable, simple operation.</p>
        <div class="col-md-7 order-md-2" >
<!--          <img class="bd-placeholder-img rounded-circle small_icon_left"  src="../../assets/img/home/1-1.svg" x="50%" y="50%" dy=".3em" alt="">-->
<!--          <img class="bd-placeholder-img rounded-circle small_icon_right"  src="../../assets/img/home/1-1.svg" x="50%" y="50%" dy=".3em" alt="">-->
        </div>
      </div>
      <div class="col-md-5 order-md-1">
        <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src="../../assets/img/home/04.svg" alt="" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false">
      </div>
    </div>

    <hr class="featurette-divider">

<!-- 素材结束 -->


    <!-- 底部 -->
    <footer class="container2">
      <p class="float-end"><a href="#">Back to top</a></p>
      <p>&copy; 2022-09 Company, Sheep&Sheep. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
    </footer>
  </div><!-- /END THE CONTAINER2 -->







    </body>
  </html>





</template>


<script>

  export default {
    name: "Carousel",
    data() {
      return {
        bannerH :450,
        images: [
          {id:1, url: require("../../assets/img/home/Carousel_1.jpg")},
          {id:2, url: require("../../assets/img/home/Carousel_2.jpg")},
          {id:3, url: require("../../assets/img/home/Carousel_3.jpg")},
          {id:4, url: require("../../assets/img/home/Carousel_4.jpg")},
          {id:5, url: require("../../assets/img/home/Carousel_5.jpg")}

        ],
      };
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.setBannerH()
      }, false);
    },
    methods:{
      //设置走马灯高度
      turnToSimpleTrade() {
        this.$router.push('/simpleTrade')
      },
      setBannerH() {
          this.bannerH = document.body.clientWidth / 4
      },
    }
  };
</script>

<style scoped>
  .el-carousel{
    overflow-x:hidden;
    overflow-y: hidden;
  }

   .image{
    height: 550px;
    }


  /* marketing
-------------------------------------------------- */


*, ::after, ::before {
    box-sizing: border-box;
}

body {
    padding-bottom: 3rem;
    color: #5a5a5a;
    margin: 0;
    font-family: var(--bs-body-font-family);
    font-size: var(--bs-body-font-size);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
    text-align: var(--bs-body-text-align);
    background-color: var(--bs-body-bg);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
}

.container{
  --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: calc(var(--bs-gutter-x) * .5);
    padding-left: calc(var(--bs-gutter-x) * .5);
    margin-right: auto;
    margin-left: auto;
}

.container2{
  --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: calc(var(--bs-gutter-x) * .5);
    padding-left: calc(var(--bs-gutter-x) * .5);
    margin-right: auto;
    margin-left: auto;
}

@media (min-width: 576px){
  .container {
    max-width: 540px;
}

}

@media (min-width: 992px){
  .container {
    max-width: 2000px;
}

}


@media (min-width: 992px){
  .container2 {
    max-width: 1200px;
}

}


.marketing .col-lg-4 {
  padding-top: 3rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
/* rtl:begin:ignore */


.marketing .col-lg-4 p {
  margin-right: .75rem;
  margin-left: .75rem;
}




.row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-right: calc(-.5 * var(--bs-gutter-x));
    margin-left: calc(-.5 * var(--bs-gutter-x));
}

.row>* {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(var(--bs-gutter-x) * .5);
    padding-left: calc(var(--bs-gutter-x) * .5);
    margin-top: var(--bs-gutter-y);
}

@media (min-width: 992px){
  .col-lg-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
}
}

@media (min-width: 768px){
  .col-md-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
}
}

@media (min-width: 768px){
  .col-md-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
}

}

@media (min-width: 768px){
  .order-md-2 {
    order: 2!important;
}
}

@media (min-width: 768px){
  .order-md-1 {
    order: 1!important;
}
}


.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

.rounded-circle {
    border-radius: 50%!important;
}

img, svg {
    vertical-align: middle;
}

.fw-normal {
    font-weight: 400!important;
}

.h2, h2 {
    font-size: calc(1.325rem + .9vw);
}

.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
}

p {
    margin-top: 0;
    margin-bottom: 1rem;
}

.explore-button {
  display: inline-block;
  height:50px;
  width: 200px
}

.btn {
    --bs-btn-padding-x: 0.75rem;
    --bs-btn-padding-y: 0.375rem;
    --bs-btn-font-family: ;
    --bs-btn-font-size: 1rem;
    --bs-btn-font-weight: 400;
    --bs-btn-line-height: 1.5;
    --bs-btn-color: #212529;
    --bs-btn-bg: transparent;
    --bs-btn-border-width: 1px;
    --bs-btn-border-color: transparent;
    --bs-btn-border-radius: 0.375rem;
    --bs-btn-hover-border-color: transparent;
    --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),0 1px 1px rgba(0, 0, 0, 0.075);
    --bs-btn-disabled-opacity: 0.65;
    --bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);
    display: inline-block;
    padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
    font-family: var(--bs-btn-font-family);
    font-size: var(--bs-btn-font-size);
    font-weight: var(--bs-btn-font-weight);
    line-height: var(--bs-btn-line-height);
    color: var(--bs-btn-color);
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
    border-radius: var(--bs-btn-border-radius);
    background-color: var(--bs-btn-bg);
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.btn-secondary {
    --bs-btn-color: #fff;
    --bs-btn-bg: #6c757d;
    --bs-btn-border-color: #6c757d;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #5c636a;
    --bs-btn-hover-border-color: #565e64;
    --bs-btn-focus-shadow-rgb: 130,138,145;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #565e64;
    --bs-btn-active-border-color: #51585e;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: #6c757d;
    --bs-btn-disabled-border-color: #6c757d;
}

/* feature */

.featurette-divider {
    margin: 5rem 0;
}

hr {
    margin: 1rem 0;
    color: inherit;
    border: 0;
    border-top: 1px solid;
    opacity: .25;
    display: block;
    unicode-bidi: isolate;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    overflow: hidden;
    border-style: inset;
    border-width: 1px;
}



.lh-1 {
    line-height: 1!important;
}

.featurette-heading {
    letter-spacing: -.05rem;
}

@media (min-width: 40em){
  .featurette-heading {
    font-size: 50px;
}
}

.text-muted {
    --bs-text-opacity: 1;
    color: #6c757d!important;
}


.lead {
    font-size: 1.25rem;
    font-weight: 300;
}

.img-fluid {
    max-width: 100%;
    height: auto;
}

.mx-auto {
    margin-right: auto!important;
    margin-left: auto!important;
}

.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}



.float-end {
    float: right!important;
}

a {
    color: #0d6efd;
    text-decoration: underline;
    background-color: transparent;
}


.small_icon_left {

  width:50px;
  height:50px ;
  margin-top: 3rem;
  margin-left: 1.5rem;
  float: left;

}

.small_icon_right {

width:50px;
height:50px ;
margin-top: 3rem;
float: right;

}


</style>

