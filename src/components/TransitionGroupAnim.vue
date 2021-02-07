<template>
  <transition-group name="list" mode="out-in">
    <slot></slot>
  </transition-group>
</template>

<style>

.list-enter-active{
  transition: all .3s ease-in;
}
.list-leave-active {
  transition: all .2s ease;
}
.list-enter-from,
.list-leave-to{
  opacity: 0;
  transform: scale(.5);
}

</style>