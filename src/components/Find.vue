<template>
    <section class="find">
        <div class="navbar">
            <div class="navbar__logo">
                find.iT
            </div>
        </div>
        <div class="find__wrap">
            <input v-on:change="submit()" v-model="query" class="find__input" type="text" placeholder="What are you looking for?">
            <div  class="card__wrap" style="width:60%; padding-bottom:80px; padding-left: 80px; display: inline-block;">
                <div v-on:click="selectUser()" class="card" v-for="user in users" v-bind:key="user.id">
                    <!-- Face 1 -->
                    <div class="card-face face-1">
                        <!-- Avatar -->
                        <div class="card-face__avatar">
                            <!-- User avatar -->
                            <img :src="user.image" width="110" height="110" draggable="false" />
                        </div>
                        <!-- Name -->
                        <h2 class="card-face__name">{{user.name}}</h2>
                        <!-- Title --><span class="card-face__title">{{user.bio || '-'}}</span>
                        <!-- Cart Footer -->
                        <div class="card-face-footer">
                            <a :href="user.link" target="_blank" class="card-face__social">
                                <img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" width="36" height="36" draggable="false"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="textarea__wrap">
                <textarea class='autoExpand' rows='3' data-min-rows='3' placeholder='Auto-Expanding Textarea' style="height: 210px"></textarea>
                <div class="wrapper">
                  <a  class="button btn_send">Send!</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import $ from 'jquery';
    export default {
        name: 'find',
        data() {
            return {
                isActive: false,
                query: null,
                users: []
            }
        },
        mounted() {
            // Applied globally on all textareas with the "autoExpand" class
            $(document)
                .one('focus.autoExpand', 'textarea.autoExpand', function () {
                    var savedValue = this.value;
                    this.value = '';
                    this.baseScrollHeight = this.scrollHeight;
                    this.value = savedValue;
                })
                .on('input.autoExpand', 'textarea.autoExpand', function () {
                    var minRows = this.getAttribute('data-min-rows') | 0,
                        rows;
                    this.rows = minRows;
                    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
                    this.rows = minRows + rows;
                });

                $('.btn_send').on('click', function() {
                    $(this).html('🎉  🎉  🎉');
                });
        },
        methods: {
            submit() {
                this.$http.get(`http://localhost:7070/find?q=${this.query}`).then((response) => {
                    let tmpUsers = response.body.slice(0, 6);
                    console.log(tmpUsers);
                    this.users = tmpUsers;
                    $('.textarea__wrap').css('display', 'inline-block');

                }, response => {
                    // error callback
                });
                this.$http.get(`http://localhost:7070/params?q=${this.query}`).then(response => {
                    const params = JSON.parse(response.bodyText);
                $('textarea').val(`Hey there! I'm looking for talented ${params.language} Developer from ${params.location}.\n\nWe invite you to become member of great team at <COMPANY NAME HERE>.\n\nWe offer: <OFFER HERE> \n\nMight you or anyone in your network be interested?\n\nBest <SIGNATURE HERE>
                    `);
                }, response => {
                    //error callback
                });
            },
            selectUser() {
                if($(event.currentTarget).hasClass('active')) {
                    $(event.currentTarget).removeClass('active');
                } else {
                    $(event.currentTarget).addClass('active');
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/scss/__variables.scss';
@import '../assets/scss/__general.scss';
textarea:focus,
input:focus {
    outline: none;
}

.textarea__wrap {
    width: 30%;
    display: none;
    // display: inline-block;
    height: 100%;
    textarea {
        display: block;
        box-sizing: padding-box;
        overflow: hidden;
        padding: 10px;
        width: 500px;
        font-size: 14px;
        margin: 15px auto;
        border-radius: 6px;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, .3);
        border: 0;
    }

}


.navbar {
    position: absolute;
    width: 100%;
    height: 50px;
    top: 0;
    background: #6E44FF;
    &__logo {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        color: #FFF;
        text-align: left;
        font-size: 2.5rem;
        padding: 1rem;
    }
}

.find {
    background: white;
    height: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    &__input {
        margin: 0 auto;
        margin-top: 150px;
        display: block;
        width: 800px;
        border-left: 0;
        border-right: 0;
        border-top: 0;
        border-bottom: 2px solid #d3d3d3;
        height: 4rem;
        font-size: 4rem;
        padding-bottom: 10px;
        &::placeholder {
            color: lighten(#6E44FF, 20);
        }
    }
    &__wrap {

    }
}

// crvena kartica
@import url(https://fonts.googleapis.com/css?family=Roboto:400,300);
// Widget style
// ---------------------------------------------------------------------
// card block

.active {
    border: 2px solid #1abc9c;
    transition: border 200ms;
}

.card {
    display: inline-block;
    background-color: #FFF;
    position: relative;
    overflow: hidden;
    margin-right: 50px;
    width: 300px;
    height: 385px;
    min-height: 405px;
    // transition: all 300ms;
    font-family: 'Montserrat', sans-serif;
    user-select: none;
    box-shadow: 0px 5px 43px rgba( 0, 0, 0, 0.18);
    animation-timing-function: cubic-bezier(0.230, 1.000, 0.320, 1.000);
    margin-top: 60px;
} // card face block
.card-face {
    width: 300px;
    height: 385px;
    position: absolute;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // transition: all 400ms cubic-bezier(0.215, 0.610, 0.355, 1.000);
    flex-direction: column;
} // notification bullet
.card-face__bullet {
    background-color: #f44336;
    color: #FFF;
    display: block;
    padding: 4px 0;
    border-radius: 50%;
    width: 23px;
    height: 23px;
    box-sizing: border-box;
    line-height: 1.2;
    text-align: center;
    font-size: 12px;
    position: absolute;
    top: 10px;
    right: 0;
    box-shadow: 0px 1px 5px rgba( 0, 0, 0, 0.27);
    animation: bullet 500ms;
    animation-fill-mode: both;
    animation-delay: 1.5s;
    animation-timing-function: cubic-bezier(0.230, 1.000, 0.320, 1.000);
    font-weight: bold;
} // specific face-1
.card-face.face-1 {
    transform: translateX(0);
    .show-menu & {
        transform: translateX(-100%);
    }
} // specific face-2
.card-face.face-2 {
    justify-content: center;
    transform: translateX(100%);
    .show-menu & {
        transform: translateX(0);
    }
} // menu button element
.card-face__menu-button {
    position: absolute;
    top: 10px;
    right: 5px;
    background: transparent;
    border: none;
    outline: none;
    padding: 5px 15px;
    transform: translateX( 150%);
    animation: menu 2s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.230, 1.000, 0.320, 1.000);
    img {
        pointer-events: none;
    }
} // back arrow button
.card-face__back-button {
    position: absolute;
    top: 10px;
    left: 0px;
    background: transparent;
    border: none;
    outline: none;
    padding: 5px 15px;
    img {
        pointer-events: none;
    }
} // Settings button
.card-face__settings-button {
    position: absolute;
    bottom: 0px;
    right: 0px;
    background: transparent;
    border: none;
    outline: none;
    padding: 10px;
} // user avatar element
.card-face__avatar {
    display: block;
    width: 110px;
    height: 110px;
    position: relative;
    margin-top: 40px;
    margin-bottom: 40px;
    transform: scale(1.2, 1.2);
    opacity: 0;
    animation: avatar 1.5s;
    animation-delay: 200ms;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.230, 1.000, 0.320, 1.000);
    img {
        border-radius: 50%;
    }
} // card user name element
.card-face__name {
    font-size: 24px;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    padding: 0 20px;
    text-align: center;
    width: 100%;
    color: #263238;
    animation: fadedown 1s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.230, 1.000, 0.320, 1.000);
    font-family: 'Montserrat', sans-serif;
} // card user title element
.card-face__title {
    font-size: 18px;
    color: #90a4ae;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    box-sizing: border-box;
    font-weight: 300;
    animation: fadedown 1s;
    animation-fill-mode: both;
    animation-delay: 100ms;
    animation-timing-function: cubic-bezier(0.230, 1.000, 0.320, 1.000); // divider
    &:after {
        content: "";
        background-color: #E3EBEE;
        width: 70px;
        height: 1px;
        margin: 20px auto 0 auto;
        display: block;
    }
} // card footer section
.card-face-footer {
    left: 0;
    right: 0;
    position: absolute;
    text-align: center;
    bottom: 20px;
} // social icon element
.card-face__social {
    display: inline-block;
    margin: 0 7px;
    width: 36px;
    height: 36px;
    animation: socials 1.5s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.230, 1.000, 0.320, 1.000);
} // Specific social
.card-face__social:nth-child(1) {
    animation-delay: 200ms;
} // Specific social
.card-face__social:nth-child(2) {
    animation-delay: 400ms;
} // Specific social
.card-face__social:nth-child(3) {
    animation-delay: 600ms;
} // User stats
.card-face__stats {
    display: block;
    margin: 10px 0;
    .show-menu & {
        animation: stats 1s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.230, 1.000, 0.320, 1.000);
    }
} // Specific stats
.card-face__stats:nth-of-type(1) {
    animation-delay: 0;
} // Specific Stats
.card-face__stats:nth-of-type(2) {
    animation-delay: 100ms;
} // Specific Stats
.card-face__stats:nth-of-type(3) {
    animation-delay: 200ms;
}

// Animations
// ----------------------------------------------------------------------
@keyframes avatar {
    from {
        transform: scale(1.2, 1.2);
        opacity: 0;
    }
    to {
        transform: scale(1, 1);
        opacity: 1;
    }
}

@keyframes menu {
    from {
        transform: translateX( 150%);
    }
    to {
        transform: translateX( 0);
    }
}

@keyframes fadedown {
    from {
        transform: translateY( -50%);
        opacity: 0;
    }
    to {
        transform: translateY( 0);
        opacity: 1;
    }
}

@keyframes socials {
    from {
        transform: translateY( 300%);
    }
    to {
        transform: translateY( 0%);
    }
}

@keyframes stats {
    from {
        transform: translateX( 300%);
    }
    to {
        transform: translateX( 0%);
    }
}

@keyframes bullet {
    0%,
    20%,
    40%,
    60%,
    80%,
    100% {
        transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
        opacity: 0;
        transform: scale3d(.3, .3, .3);
    }
    20% {
        transform: scale3d(1.1, 1.1, 1.1);
    }
    40% {
        transform: scale3d(.9, .9, .9);
    }
    60% {
        opacity: 1;
        transform: scale3d(1.03, 1.03, 1.03);
    }
    80% {
        transform: scale3d(.97, .97, .97);
    }
    100% {
        opacity: 1;
        transform: scale3d(1, 1, 1);
    }
}

//shiney
.textarea__wrap {
$color: #2194E0;

@keyframes sheen {
  0% {
    transform: skewY(-45deg) translateX(0);
  }
  100% {
    transform: skewY(-45deg) translateX(12.5em);
  }
}

.wrapper {
  display: block;
  text-align: center;
  transform: translate(-50%, -50%);
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  height: 100px;
}
.button {
    right: -45px;
    top: 60px;
  padding: 0.75em 2em;
  text-align: center;
  text-decoration: none;
  color: $color;
  border: 2px solid $color;
  font-size: 16px;
  display: inline-block;
  border-radius: 0.3em;
  transition: all 0.2s ease-in-out;
  position: absolute;
  margin: 0 auto;
  overflow: hidden;
  &:before {
    content: "";
    background-color: rgba(255,255,255,0.5);
    height: 100%;
    width: 3em;
    display: block;
    position: absolute;
    top: 0;
    left: -4.5em;
    transform: skewX(-45deg) translateX(0);
    transition: none;
  }
  &:hover {
    background-color: $color;
    color: #fff;
    border-bottom: 4px solid darken($color, 10%);
    &:before {
      transform: skewX(-45deg) translateX(13.5em);
     transition: all 0.5s ease-in-out;
    }
  }
}
}
</style>
