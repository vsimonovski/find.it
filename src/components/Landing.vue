<template>
    <section class="landing">
        <div class="landing__wrap">
            <h1 class="landing__title">find.iT</h1>
            <div class="btnWrap">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="goo">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>

                <span class="button--bubble__container">
            <a href="#find" class="button button--bubble">
                now
            </a>
            <span class="button--bubble__effect-container">
                <span class="circle top-left"></span>
                <span class="circle top-left"></span>
                <span class="circle top-left"></span>

                <span class="button effect-button"></span>

                <span class="circle bottom-right"></span>
                <span class="circle bottom-right"></span>
                <span class="circle bottom-right"></span>
                </span>
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'hello',
  data () {
    return {}
  },
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/scss/__variables.scss';
@import '../assets/scss/__general.scss';
@import '../assets/scss/__button.scss';

.landing {
    background: #6E44FF;
    height: 100%;
    &__wrap {
        display: flex;
        height: 100%;
        justify-content: center;
        flex-direction: column;
        margin: 0 auto;
        width: 50%;
        width: 50%;
    }
    &__title {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        color: #FFF;
        font-size: 10rem;
        text-align: center;
    }
}

</style>
