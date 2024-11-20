<template>
  <Box transparent>
    <div class="mx-auto w-2/3 flex flex-col items-center gap-5">
      <Box customClass="relative w-full flex items-center justify-between">
        <h1 class="text-3xl font-bold text-center text-green-500">Plan zajęć</h1>

        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <button
            @click="previousWeek"
            class="p-2"
            :class="{ 'opacity-50 cursor-not-allowed': isPreviousWeekDisabled }"
            :disabled="isPreviousWeekDisabled"
          >
            <ArrowLeftIcon class="h-6 w-6 text-white" />
          </button>

          <span class="mx-4 min-w-[100px] text-white text-center">{{ formattedWeekRange }}</span>

          <button
            @click="nextWeek"
            class="p-2"
            :class="{ 'opacity-50 cursor-not-allowed': isNextWeekDisabled }"
            :disabled="isNextWeekDisabled"
          >
            <ArrowRightIcon class="h-6 w-6 text-white" />
          </button>
        </div>
        <button
          @click="fetchEvents"
          class="p-2 bg-blue-500 text-white rounded"
        >
          Odśwież
        </button>
      </Box>

      <div
        v-if="!isFreeWeek"
        class="w-full flex gap-10"
      >
        <Box
          v-for="{ date, dayOfWeek, events } in weekClasses"
          :key="date"
          customClass="flex-grow min-h-[572px]"
        >
          <h2 class="text-xl text-green-500 mb-4">{{ dayOfWeek }}</h2>
          <ul v-if="events.length > 0">
            <li
              v-for="event in events"
              :key="event.startDate"
              class="bg-gray-600 mb-4 p-4 rounded text-white"
            >
              <span class="font-bold">
                <span :class="getEventTypeClass(event.subject)">{{ getEventTypeFullName(event.subject) }}</span> -
                {{ event.subject.slice(2) }}
              </span>
              <span class="block mt-2 text-sm"
                >{{ formatTime(event.startDate) }} do {{ formatTime(event.endDate) }}</span
              >
              <span class="block mt-1 text-sm">Sala: {{ event.room }}</span>
            </li>
          </ul>
          <div
            v-else
            class="flex justify-center items-center h-full"
          >
            <span class="text-white">Brak danych</span>
          </div>
        </Box>
      </div>

      <Box
        v-else
        customClass="w-1/2 flex flex-col items-center"
      >
        <span class="text-white">Masz wolny tydzień</span>
        <FireIcon class="h-12 w-12 text-yellow-500 animate-bounce mt-4" />
      </Box>
    </div>
  </Box>
</template>

<script>
import { ArrowLeftIcon, ArrowRightIcon, FireIcon } from '@heroicons/vue/24/solid';
import ICAL from 'ical.js';
import Box from '../components/Box.vue';

const schoolDays = [
  '2024-10-12',
  '2024-10-13',
  '2024-10-19',
  '2024-10-20',
  '2024-10-26',
  '2024-10-27',
  '2024-11-09',
  '2024-11-10',
  '2024-11-16',
  '2024-11-17',
  '2024-11-23',
  '2024-11-24',
  '2024-12-07',
  '2024-12-08',
  '2024-12-14',
  '2024-12-15',
  '2024-12-21',
  '2024-12-22',
  '2025-01-11',
  '2025-01-12',
  '2025-01-25',
  '2025-01-26',
  '2025-02-01',
  '2025-02-02',
];

export default {
  name: 'SchedulePage',
  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
    FireIcon,
    Box,
  },
  data() {
    return {
      allClasses: [],
    };
  },
  computed: {
    selectedWeek() {
      const { week } = this.$route.query;

      if (week) return week;

      const currentDate = new Date();
      const dayOfWeek = currentDate.getDay();
      const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

      const startOfWeek = new Date(currentDate.getTime() - daysSinceMonday * 24 * 60 * 60 * 1000);
      const lastMonday = startOfWeek.toISOString().split('T')[0];

      return lastMonday;
    },
    formattedWeekRange() {
      const startOfWeek = new Date(this.selectedWeek);
      const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);

      const options = { month: 'short', day: 'numeric' };

      return `${new Intl.DateTimeFormat('pl-PL', options).format(startOfWeek)} - ${new Intl.DateTimeFormat(
        'pl-PL',
        options
      ).format(endOfWeek)}`;
    },
    schoolDaysInWeek() {
      return schoolDays.filter((dateStr) => {
        const date = new Date(dateStr);
        const dayOfWeek = date.getDay();

        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const mondayDate = new Date(date.getTime() - daysToMonday * 24 * 60 * 60 * 1000);

        return this.selectedWeek === mondayDate.toISOString().split('T')[0];
      });
    },
    isFreeWeek() {
      return this.schoolDaysInWeek.length === 0;
    },
    weekClasses() {
      if (this.allClasses.length === 0) return [];

      const startOfWeek = new Date(this.selectedWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59);

      const startOfWeekString = startOfWeek.toISOString().split('T')[0];
      const endOfWeekString = endOfWeek.toISOString().split('T')[0];

      const weekClassesObj = this.schoolDaysInWeek.reduce(
        (acc, date) => ({
          ...acc,
          [date]: [],
        }),
        {}
      );

      this.allClasses.forEach((event) => {
        const eventDate = new Date(event.startDate);
        const eventDateString = eventDate.toISOString().split('T')[0];

        if (eventDateString >= startOfWeekString && eventDateString <= endOfWeekString) {
          if (!weekClassesObj[eventDateString]) {
            weekClassesObj[eventDateString] = [];
          }

          weekClassesObj[eventDateString].push(event);
        }
      });

      const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

      return Object.entries(weekClassesObj).reduce((acc, [date, events]) => {
        return [
          ...acc,
          {
            date: date,
            dayOfWeek: days[new Date(date).getDay()],
            events: events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
          },
        ];
      }, []);
    },
    isPreviousWeekDisabled() {
      const currentWeekDate = new Date(this.selectedWeek);
      const firstSchoolDay = new Date(schoolDays[0]);
      const firstMonday = new Date(firstSchoolDay);
      firstMonday.setDate(firstMonday.getDate() - (firstMonday.getDay() === 0 ? 6 : firstMonday.getDay() - 1));

      return currentWeekDate <= firstMonday;
    },
    isNextWeekDisabled() {
      const currentWeekDate = new Date(this.selectedWeek);

      const lastSchoolDay = new Date(schoolDays[schoolDays.length - 1]);
      const lastMonday = new Date(lastSchoolDay);
      lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay() === 0 ? 6 : lastMonday.getDay() - 1));

      const nextWeekMonday = new Date(currentWeekDate);
      nextWeekMonday.setDate(nextWeekMonday.getDate() + 7);

      return nextWeekMonday > lastMonday;
    },
  },
  methods: {
    updateQueryParams(date) {
      this.$router.replace({ query: { ...this.$route.query, week: date.toISOString().split('T')[0] } });
    },
    formatTime(dateString) {
      const options = { hour: '2-digit', minute: '2-digit' };

      return new Intl.DateTimeFormat('pl-PL', options).format(new Date(dateString));
    },
    previousWeek() {
      if (this.isPreviousWeekDisabled) return;

      const currentWeekDate = new Date(this.selectedWeek);
      const dayOfWeek = currentWeekDate.getDay();
      const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

      currentWeekDate.setDate(currentWeekDate.getDate() - daysSinceMonday - 7);

      this.updateQueryParams(currentWeekDate);
    },
    nextWeek() {
      if (this.isNextWeekDisabled) return;

      const currentWeekDate = new Date(this.selectedWeek);
      const dayOfWeek = currentWeekDate.getDay();
      const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

      currentWeekDate.setDate(currentWeekDate.getDate() - daysSinceMonday + 7);

      this.updateQueryParams(currentWeekDate);
    },
    async fetchEvents() {
      const res = await fetch(
        'https://usosapps.uni.lodz.pl/services/tt/upcoming_ical?lang=pl&user_id=222199&key=NaGLpgMAUrxdaVmvhnPX'
      );

      const icsData = await res.text();

      const jcalData = ICAL.parse(icsData);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');

      const events = vevents.map((vevent) => {
        const event = new ICAL.Event(vevent);

        const { summary, startDate, endDate, description } = event;

        const [roomPart] = description.split('/n');
        const roomMatch = roomPart.match(/Sala:\s*(.+)/);
        const room = roomMatch ? roomMatch[1].trim() : '';

        return {
          subject: summary,
          startDate: startDate.toString(),
          endDate: endDate.toString(),
          room,
          dayOfWeek: startDate.toJSDate().getDay(),
        };
      });

      localStorage.setItem('events', JSON.stringify(events));
      localStorage.setItem('eventsTimestamp', new Date().toISOString());

      return events;
    },
    getEventTypeFullName(subject) {
      const type = subject.split(' ')[0];
      const typeMap = {
        K: 'Konwersatorium',
        W: 'Wykład',
        LI: 'Ćwiczenia',
      };

      return typeMap[type] || type;
    },
    getEventTypeClass(subject) {
      const type = subject.split(' ')[0];
      const classMap = {
        K: 'text-yellow-500',
        W: 'text-red-500',
        LI: 'text-yellow-500',
      };

      return classMap[type] || 'text-white';
    },
  },
  async mounted() {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const eventsTimestamp = localStorage.getItem('eventsTimestamp');
    const oneDayOld = new Date(eventsTimestamp).getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;

    if (!storedEvents.length || oneDayOld) {
      this.allClasses = await this.fetchEvents();
    } else {
      this.allClasses = storedEvents;
    }
  },
};
</script>

<style scoped>
/* No additional styles needed */
</style>
