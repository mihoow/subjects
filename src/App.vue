<template>
  <MatrixRain>
    <div class="h-full flex flex-col">
      <nav class="w-full px-2 py-4 flex items-center lg:justify-center gap-4 lg:gap-16 overflow-x-auto">
        <Link
          v-for="{ to, icon, label } in internalLinks"
          :key="to"
          variant="internal"
          :to="to"
          :icon="icon"
          :label="label"
          customClass="hover:scale-110 transform transition-transform duration-300"
        />
      </nav>
      <div class="w-full flex-1 flex max-h-[calc(100vh-88px)]">
        <main class="flex-grow lg:ml-[112px] lg:mb-12">
          <router-view />
        </main>
        <aside class="hidden lg:flex flex-col gap-8 px-6">
          <Link
            v-for="{ to, icon } in externalLinks"
            :key="to"
            variant="external"
            :to="to"
            :icon="icon"
            customClass="hover:scale-110 transform transition-transform duration-300"
          />
        </aside>
      </div>
    </div>
  </MatrixRain>
</template>

<script>
import MatrixRain from './components/MatrixRain.vue';
import Link from './components/Link.vue';
import { AcademicCapIcon, ClockIcon } from '@heroicons/vue/24/outline';
import HookIcon from './components/icons/HookIcon.vue';
import UniversityLogo from './components/icons/UniversityLogo.vue';
import MessengerIcon from './components/icons/MessengerIcon.vue';
import OutlookIcon from './components/icons/OutlookIcon.vue';
import MsTeamsIcon from './components/icons/MsTeamsIcon.vue';

export default {
  name: 'App',
  components: {
    MatrixRain,
    Link,
  },
  data() {
    return {
      internalLinks: [
        {
          to: '/subjects',
          icon: AcademicCapIcon,
          label: 'Przedmioty',
        },
        {
          to: '/contract',
          icon: ClockIcon,
          label: 'Contract',
        },
        {
          to: '/unhooking',
          icon: HookIcon,
          label: 'Unhooking',
        },
      ],
      externalLinks: [
        {
          to: 'https://usosweb.uni.lodz.pl/kontroler.php?_action=home/index',
          icon: UniversityLogo,
          label: 'UOS',
        },
        {
          to: 'https://www.facebook.com/messages/t/8755826891116189',
          icon: MessengerIcon,
          label: 'Messenger',
        },
        {
          to: 'https://outlook.office.com/mail',
          icon: OutlookIcon,
          label: 'Outlook',
        },
        {
          to: 'https://teams.microsoft.com',
          icon: MsTeamsIcon,
          label: 'Teams',
        },
      ],
    };
  },
  onMounted() {
    console.log('App mounted', AcademicCapIcon);
  },
};
</script>

<style>
/* Add any additional styles here if needed */
</style>
