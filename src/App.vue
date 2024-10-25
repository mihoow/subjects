<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 flex p-10 relative">
    <Sidebar class="z-20" />
    <div
      ref="mainContent"
      class="flex-1 flex flex-col ml-56 relative overflow-hidden"
    >
      <div class="flex justify-end mb-6 relative z-30">
        <Header />
      </div>
      <main class="flex-grow bg-gray-800 rounded-2xl p-6 pl-16 text-gray-100 shadow-lg relative z-10 overflow-y-auto" style="max-height: calc(100vh - 180px);">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Header
  },
}
</script>

<style>
body {
  @apply bg-gray-900 overflow-hidden;
}

.header-glow {
  box-shadow: 
    0 0 10px rgba(255, 0, 0, 0.3),
    0 0 20px rgba(255, 0, 0, 0.3),
    0 0 30px rgba(255, 0, 0, 0.3),
    0 0 40px rgba(255, 0, 0, 0.3),
    0 0 70px rgba(255, 0, 0, 0.3);
}
</style>
