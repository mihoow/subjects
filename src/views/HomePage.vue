<template>
  <Box
    transparent
    customClass="bg-white"
  >
    <p>Calculate the expression:</p>
    <ul>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%5Cfrac%7B2%7D%7B9%7D+%2B+%5Cfrac%7B1%7D%7B12%7D%7D" target="_blank">1.9</a></li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%5Cfrac%7B4%7D%7B25%7D+%2B+%5Cfrac%7B2%7D%7B15%7D%7D" target="_blank">1.10</a></li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+4%5Cfrac%7B7%7D%7B8%7D+%2B+1%5Cfrac%7B1%7D%7B6%7D%7D" target="_blank">1.11</a></li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%281%2C2%29%5E%7B50%7D+%5Ccdot+%5Cleft%28%5Cfrac%7B5%7D%7B6%7D%5Cright%29%5E%7B50%7D%7D" target="_blank">1.12</a></li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%5Cfrac%7B2%5E3+%5Ccdot+2%5E%7B-1%7D+%2B+5%5E3+%5Ccdot+5%5E4%7D%7B10%5E%7B-3%7D+%5Ccdot+10%5E2+-+0%2C25%5E0%7D%7D" target="_blank">1.13<sup>k</sup></a></li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%5Cfrac%7B3%5E%7B-1%7D+%5Ccdot+9%5E2+-+%283%5E%7B-2%7D%29%5E3%7D%7B%28-27%29%5E%7B-2%7D%7D%7D" target="_blank">1.14</a></li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%5Cleft%28%5B%5Cfrac%7B1%7D%7B3%7D%5D%5E%7B-1%7D+-+2%5E%7B-2%7D%5Cright%29%5E%7B-3%7D%7D" target="_blank">1.15</a></li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%5Cfrac%7B2+%5Ccdot+3%5E%7B20%7D+-+5+%5Ccdot+3%5E%7B19%7D%7D%7B9%5E9%7D%7D" target="_blank">1.16</a></li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+3%5Csqrt%7B27%7D+%5Ccdot+9%5E%7B-1%2C5%7D+%5Ccdot+3%5E%7B-0%2C75%7D+%5Ccdot+81%5E2%7D" target="_blank">1.17</a></li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+x+%3D+%5Cfrac%7Bn%7D%7B48%7D+%5Cleft%28%5Cfrac%7B%28n%2B2%29%5E3%7D%7Bn-2%7D%5Cright%29+%5Cfrac%7Bn%5E2+%2B+4n+%2B+4%7D%7B3n%5E2+-+12n+%2B+12%7D%7D" target="_blank">1.18</a> dla \( n = 32 \)</li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%5Cfrac%7B%5Cleft%28%28x%5E2+%2B+a%5E2%29%5E%7B-%5Cfrac%7B1%7D%7B4%7D%7D+%2B+%28x%5E2+-+a%5E2%29%5E%7B-%5Cfrac%7B1%7D%7B4%7D%7D%5Cright%29%5E%7B-2%7D%7D%7B%28x%5E2+%2B+a%5E2%29%5E%7B-%5Cfrac%7B1%7D%7B2%7D%7D+-+%28x%5E2+-+a%5E2%29%5E%7B-%5Cfrac%7B1%7D%7B2%7D%7D%7D%7D" target="_blank">1.19</a> dla \( x = \sqrt{\frac{m^2 + n^2}{2mn}} \), gdzie \( a > 0, n > m > 0 \)</li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%5Cfrac%7Bx%5E2+-+2x%5Csqrt%7B3%7D+-+%5Csqrt%5B4%5D%7B4%7D+%2B+3%7D%7Bx+-+%5Csqrt%7B3%7D%7D%7D" target="_blank">1.20</a> dla \( x = \sqrt{3} - \sqrt{2} \)</li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%5Cleft%5Ba%5E%7B-%5Cfrac%7B1%7D%7B4%7D%7D+b+%28ab%5E%7B-2%7D%29%5E%7B-%5Cfrac%7B1%7D%7B4%7D%7D+%28a%5E%7B-1%7D%29%5E%7B-%5Cfrac%7B3%7D%7B8%7D%7D%5Cright%5D%5E3%7D" target="_blank">1.21<sup>K</sup></a> dla \( a = \frac{\sqrt{2}}{2}, \, b = \frac{1}{\sqrt{2}} \)</li>
        <li><a href="https://www.wolframalpha.com/input?i=text%2F%7BCalculate+%5Cfrac%7Bx%2B1%7D%7Bx%2B%5Csqrt%7Bx%5E2%2Bx%7D%7D+%2B+%5Cfrac%7Bx-1%7D%7Bx-%5Csqrt%7Bx%5E2-x%7D%7D%7D" target="_blank">1.22</a> dla \( x = \frac{2}{\sqrt{3}} \)</li>
    </ul>
  </Box>
</template>

<script>
import Box from '@/components/Box.vue';

export default {
  name: 'HomePage',
  components: {
    Box,
  },
};
</script>
