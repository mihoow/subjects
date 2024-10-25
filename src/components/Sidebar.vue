<template>
  <aside class="fixed left-10 top-10 bottom-10 w-64 bg-blue-600 text-white overflow-y-auto rounded-2xl sidebar-glow flex flex-col">
    <nav class="p-4 flex-grow">
      <ul>
        <li v-for="(item, index) in sidebarItems" :key="index" class="mb-2">
          <a :href="item.link" class="block py-2 px-4 hover:bg-blue-700 rounded transition-colors duration-200">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'MainSidebar',
  data() {
    return {
      sidebarItems: [
        { name: 'Dashboard', link: '#dashboard' },
        { name: 'Profile', link: '#profile' },
        { name: 'Settings', link: '#settings' },
        { name: 'Messages', link: '#messages' },
        { name: 'Tasks', link: '#tasks' },
        { name: 'Calendar', link: '#calendar' },
        { name: 'Documents', link: '#documents' },
        { name: 'Analytics', link: '#analytics' },
        { name: 'Reports', link: '#reports' },
        { name: 'Help & Support', link: '#help' },
      ]
    }
  }
}
</script>

<style scoped>
.sidebar-glow {
  box-shadow: 
    0 0 10px rgba(59, 130, 246, 0.3),
    0 0 20px rgba(59, 130, 246, 0.3),
    0 0 30px rgba(59, 130, 246, 0.3),
    0 0 40px rgba(59, 130, 246, 0.3),
    0 0 70px rgba(59, 130, 246, 0.3);
}
</style>
