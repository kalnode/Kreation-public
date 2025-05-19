<template>
    <div class="twocolumn flex-col md:flex-row ">
        <div class="col justify-center md:justify-start left">
            <slot name="left"></slot>
        </div>
        <div class="col justify-center md:justify-start right">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<style scoped>
.twocolumn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.col {
    flex: 1;
    justify-items: center;
}
</style>