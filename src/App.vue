<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 flex flex-col p-4">
    <header class="w-full bg-red-600 p-4 relative overflow-hidden rounded-2xl mx-auto mt-4 max-w-7xl header-glow">
      <nav class="relative z-10 flex justify-between items-center">
        <router-link to="/" class="text-white font-semibold hover:text-red-200 transition-colors duration-300 flex items-center">
          <HomeIcon class="h-6 w-6 mr-2" />
          Domowe ognisko
        </router-link>
        <div>
          <a href="https://example.com/zjazdy" target="_blank" rel="noopener noreferrer" class="text-white font-semibold mr-6 hover:text-red-200 transition-colors duration-300">
            Zjazdy
          </a>
          <a href="https://example.com/plan-zajec" target="_blank" rel="noopener noreferrer" class="text-white font-semibold hover:text-red-200 transition-colors duration-300">
            Plan zajęć
          </a>
        </div>
      </nav>
    </header>
    <main class="flex-grow py-6 sm:py-12">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { HomeIcon } from '@heroicons/vue/24/solid'

export default {
  name: 'App',
  components: {
    HomeIcon
  }
}
</script>

<style>
body {
  @apply bg-gray-900;
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
