
const app = document.querySelector(".app");
app.querySelector(" #playgame").addEventListener("click", function () {
    backgroundmusic.play();
    homemusic.pause();
    app.querySelector(".gamescreen").classList.remove("active");
    app.querySelector(".homescreen").classList.add("active");
    app.querySelector(".body").classList.add("gamebg-overbg");
});
app.querySelector(" #exit").addEventListener("click", function () {
    gameover.pause();
    homemusic.play();
    app.querySelector(".gameoverscreen").classList.add("active");
    app.querySelector(".body").classList.remove("bg");
    app.querySelector(".body").classList.add("animation");
    app.querySelector(".home").classList.add("box");
    app.querySelector(".homescreen").classList.remove("active");
    app.querySelector(".snake3").classList.remove("active");
    app.querySelector(".snake4").classList.remove("active");
    app.querySelector(".body").classList.remove("gamebg-overbg");
    setTimeout(() => {
        app.querySelector(".snake3").classList.add("active");
        app.querySelector(".snake4").classList.add("active");
        app.querySelector(".body").classList.remove("animation");
        app.querySelector(".body").classList.add("bg");
        app.querySelector(".home").classList.remove("box");
    },24000);
});
app.querySelector(" #playagain").addEventListener("click", function () {
    gameover.pause();
    backgroundmusic.play();
    app.querySelector(".gamescreen").classList.remove("active");
    app.querySelector(".gameoverscreen").classList.add("active");
});

