<template>
  <Box
    customClass="max-h-full flex flex-col gap-4"
    scrollable
  >
    <SubjectCard
      v-for="subject in subjects"
      :key="subject.id"
      :subject="subject"
    />
  </Box>
</template>

<script>
import { defineComponent } from 'vue';
import Box from '@/components/Box.vue';
import SubjectCard from '@/components/SubjectCard.vue';

export default defineComponent({
  name: 'SubjectsPage',
  components: {
    Box,
    SubjectCard,
  },
  data() {
    return {
      subjects: [
        {
          id: '1500-ZIIAM1',
          name: 'Analiza matematyczna I',
          classes: [
            {
              type: 'wykład',
              pass: 'egzamin',
              deadline: null,
            },
            {
              type: 'konwersatorium',
              pass: 'kolokwium',
              deadline: null,
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZIIAI1',
          name: 'Aplikacje internetowe',
          classes: [
            {
              type: 'ćwiczenia informatyczne',
              pass: 'projekt (2048)',
              deadline: null,
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZII2AR',
          name: 'Architektura systemów komputerowych',
          classes: [
            {
              type: 'wykład',
              pass: 'egzamin',
              deadline: null,
              note: 'Opcjonalnie (dzięki uzyskaniu 4.5 z kolokwium)',
            },
            {
              type: 'ćwiczenia informatyczne',
              pass: 'kolokwium',
              deadline: '08/12',
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZIIFZ1',
          name: 'Fizyka',
          classes: [
            {
              type: 'wykład',
              pass: 'egzamin',
              deadline: null,
            },
            {
              type: 'konwersatorium',
              pass: 'kolokwium',
              deadline: '25/01 16:15',
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZII1IU',
          name: 'Interfejsy użytkownika',
          classes: [
            {
              type: 'ćwiczenia informatyczne',
              pass: 'projekt (kawomat)',
              deadline: '23/02',
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZZI1JP',
          name: 'Języki programowania I',
          classes: [
            {
              type: 'wykład',
              pass: 'egzamin',
              deadline: null,
            },
            {
              type: 'ćwiczenia informatyczne',
              pass: 'projekty',
              deadline: '26/01 16:15',
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZW1KJP',
          name: 'Kultura języka polskiego',
          classes: [
            {
              type: 'wykład',
              pass: 'zaliczenie na ocenę',
              deadline: null,
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZII1LI',
          name: 'Logika w informatyce',
          classes: [
            {
              type: 'wykład',
              pass: 'egzamin',
              deadline: null,
            },
            {
              type: 'konwersatorium',
              pass: 'kolokwium',
              deadline: null,
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZII2MD',
          name: 'Matematyka dyskretna',
          classes: [
            {
              type: 'wykład',
              pass: 'egzamin',
              deadline: null,
            },
            {
              type: 'konwersatorium',
              pass: 'kolokwium',
              deadline: null,
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZII1PI',
          name: 'Podstawy informatyki',
          classes: [
            {
              type: 'wykład',
              pass: 'egzamin',
              deadline: null,
            },
            {
              type: 'konwersatorium',
              pass: 'kolokwium',
              deadline: '22/12',
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZW1PP',
          name: 'Podstawy przedsiębiorczości',
          classes: [
            {
              type: 'wykład',
              pass: 'test',
              deadline: '15/12',
            },
          ],
          materials: [],
        },
        {
          id: '1500-ZII1RMAT',
          name: 'Repetytorium z matematyki',
          classes: [
            {
              type: 'konwersatorium',
              pass: 'kolokwium',
              deadline: '06/12',
            },
          ],
          materials: [],
        },
      ],
    };
  },
});
</script>
