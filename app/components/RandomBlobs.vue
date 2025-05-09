<template>
    <div class="background-custom"></div>
</template>
<style scoped>
.background-custom {
    background: linear-gradient(90deg, #faec69, #61ffb5, #60f2ff);
    background-size: 300% 300%;
    animation: gradient 5s alternate infinite;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    filter: opacity(0.5);
}

@keyframes gradient {
    0% {
        background-position: 0%;
    }
    100% {
        background-position: 100%;
    }
}

.dark .background-custom {
    background: linear-gradient(90deg, hsl(54 94% 30% / 1), hsl(152 100% 30% / 1), hsl(185 100% 30% / 1));
}

.gradient-container {
    --color-1: #FC466B;
    --color-2: #3F5EFB;
    --color-3: #f8ff00;
    --color-4: #3ad59f;
    --blur: blur(120px);
    width: 100vw;
    height: 100vh;
    display: flex;
    background: var(--color-2);
    flex-wrap: wrap;
    overflow: hidden;
    position: relative;
}

.gradient-color {
    width: 50%;
    height: 50%;
    display: flex;
    border-radius: 30% 80% 75% 40% / 40% 40% 70% 50%;
    animation-name: animate;
    animation-duration: 5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

@keyframes animate {
  0% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 60%;
    transform: scale(2) rotate(0deg) translate(10%, 10%);
  }
  100% {
    border-radius: 88% 10% 22% 58% / 73% 56% 34% 77%;
    transform: scale(2) rotate(180deg) translate(10%, -10%);
  }
}

.gradient-color:nth-child(1) {
    background-color: var(--color-1);
    animation-direction: backwards;
}

.gradient-color:nth-child(2) {
    background-color: var(--color-2);
}

.gradient-color:nth-child(3) {
    background-color: var(--color-3);
    animation-direction: backwards;
}

.gradient-color:nth-child(4) {
    background-color: var(--color-4);
}

.gradient-backdrop {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background: transparent;
    backdrop-filter: var(--blur);
}
</style>