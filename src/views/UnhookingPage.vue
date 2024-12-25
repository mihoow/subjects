<template>
  <Box
    customClass="w-full h-full flex flex-col-reverse lg:flex-row !p-0"
  >
    <aside class="basis-[420px] bg-gray-700 text-white overflow-y-auto">
      <ul class="w-full my-2 px-2 space-y-1">
        <li
          v-for="({ title, source }, index) in audio"
          :key="index"
        >
          <button
            @click="selectAudio(title, source)"
            class="w-full px-2 py-4 rounded-md flex items-center justify-between gap-4 hover:bg-blue-500/50 transition-colors"
            :class="{
              'bg-blue-500/50': currentAudioTitle === title,
            }"
          >
            <h3 class="font-bold">{{ title }}</h3>
            <p class="text-sm italic">
              {{ formatDurations(source) }}
            </p>
          </button>
        </li>
      </ul>
    </aside>

    <div class="w-full">
      <div class="px-6 p-4 w-full bg-blue-500/50">
        <h2 class="mb-4 text-white text-2xl font-bold truncate max-w-[calc(100vw-32px)]">
          {{ currentAudioTitle }}
        </h2>

        <div class="mb-8 flex space-x-2">
          <button
            v-for="(option, index) in Array.isArray(currentSource) ? currentSource : [currentSource]"
            :key="index"
            @click="selectAudio(currentAudioTitle, currentSource, index)"
            :class="{
              'bg-blue-500 text-white': option.audioSrc === currentAudioSrc,
              'bg-gray-300 text-black': option.audioSrc !== currentAudioSrc,
            }"
            class="px-4 py-2 rounded-full transition-colors"
          >
            {{ formatDurations(option) }}
          </button>
        </div>

        <audio
          controls
          :src="currentAudioSrc"
          class="w-full max-w-[500px]"
        />
      </div>

      <!-- Future cards will go here -->
    </div>
  </Box>
</template>

<script>
import { defineComponent } from 'vue';
import Box from '@/components/Box.vue';

export default defineComponent({
  name: 'UnhookingPage',

  data() {
    return {
      currentAudioSrc: '',
      currentAudioTitle: '',
      currentSource: null,
      currentSourceIndex: 0,
      audio: [
        {
          title: 'Dropping Anchor',
          source: [
            { audioSrc: require('@/assets/unhooking/dropping-anchor-4min.mp3'), durationMs: 240000 },
            { audioSrc: require('@/assets/unhooking/dropping-anchor-8min.mp3'), durationMs: 480000 },
            { audioSrc: require('@/assets/unhooking/dropping-anchor-11min.mp3'), durationMs: 660000 },
          ],
        },
        {
          title: 'Mindful breathing',
          source: { audioSrc: require('@/assets/unhooking/mindful-breathing.mp3'), durationMs: 900000 },
        },
        {
          title: 'Physicalising emotions',
          source: {
            audioSrc: require('@/assets/unhooking/physicalising-emotions.mp3'),
            durationMs: 960000,
          },
        },
        {
          title: 'Kind self-touch',
          source: {
            audioSrc: require('@/assets/unhooking/kind-hand.mp3'),
            durationMs: 360000,
          },
        },
        {
          title: 'Body scan',
          source: [
            {
              audioSrc: require('@/assets/unhooking/body-scan-5.mp3'),
              durationMs: 300000,
            },
            {
              audioSrc: require('@/assets/unhooking/body-scan-13.mp3'),
              durationMs: 780000,
            },
            {
              audioSrc: require('@/assets/unhooking/body-scan-33.mp3'),
              durationMs: 1980000,
            },
          ],
        },
        {
          title: 'Dipping in and out of the stream',
          source: {
            audioSrc: require('@/assets/unhooking/dipping-in-out-stream.mp3'),
            durationMs: 720000,
          },
        },
        {
          title: 'Watching your thoughts',
          source: {
            audioSrc: require('@/assets/unhooking/watching-your-thoughts.mp3'),
            durationMs: 780000,
          },
        },
        {
          title: 'Compassion for the younger you',
          source: {
            audioSrc: require('@/assets/unhooking/compassion-for-younger-you.mp3'),
            durationMs: 540000,
          },
        },
        {
          title: 'Appreciating your hand',
          source: {
            audioSrc: require('@/assets/unhooking/appreciating-your-hand.mp3'),
            durationMs: 600000,
          },
        },
        {
          title: 'Handling setbacks',
          source: {
            audioSrc: require('@/assets/unhooking/handling-setbacks.mp3'),
            durationMs: 840000,
          },
        },
      ],
    };
  },

  created() {
    const { audio } = this;

    if (audio.length > 0) {
      const firstSource = audio[0].source;

      this.currentAudioSrc = Array.isArray(firstSource) ? firstSource[0].audioSrc : firstSource.audioSrc;
      this.currentAudioTitle = audio[0].title;
      this.currentSource = firstSource;
    }
  },

  methods: {
    formatDuration(durationMs) {
      const minutes = Math.floor((durationMs % 3600000) / 60000);
      return `${minutes}`;
    },

    formatDurations(source) {
      const durations = Array.isArray(source)
        ? source.map((item) => this.formatDuration(item.durationMs)).join(' / ')
        : this.formatDuration(source.durationMs);

      return `${durations} min`;
    },

    selectAudio(title, source, sourceIndex = 0) {
      this.currentAudioSrc = Array.isArray(source) ? source[sourceIndex].audioSrc : source.audioSrc;
      this.currentAudioTitle = title;
      this.currentSource = source;
      this.currentSourceIndex = sourceIndex;
    },
  },

  components: {
    Box,
  },
});
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
