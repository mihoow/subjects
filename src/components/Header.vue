<template>
  <header class="bg-red-600 p-4 relative overflow-hidden rounded-2xl header-glow w-[60%] min-w-[400px]">
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
</template>

<script>
import { HomeIcon } from '@heroicons/vue/24/solid'

export default {
  name: 'MainHeader',
  components: {
    HomeIcon,
  },
}
</script>
