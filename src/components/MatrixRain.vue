<template>
  <div class="relative w-screen h-screen">
    <canvas
      ref="matrixCanvas"
      class="fixed top-0 left-0 w-full h-full z-[-1]"
    />
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden bg-transparent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      matrixCanvas: null,
    };
  },
  mounted() {
    this.matrixCanvas = this.$refs.matrixCanvas;

    const { matrixCanvas: canvas } = this;
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const { width, height } = canvas;
    const columns = Math.floor(width / 20);
    const drops = Array.from({ length: columns }, () => Math.floor((Math.random() * height) / 20));
    const speeds = Array.from({ length: columns }, () => Math.random() * 1.5 + 0.5);

    const config = {
      speedRatio: 0.6,
    };

    const mathSymbols = [
      '∑',
      '∫',
      '√',
      'π',
      '∞',
      '∆',
      '∂',
      '∇',
      '≈',
      '≠',
      '∴',
      '∵',
      '∪',
      '∩',
      '⊂',
      '⊃',
      '⊆',
      '⊇',
      '⊕',
      '⊗',
      '⊥',
      '∠',
      '∡',
      '∢',
      '∥',
      '∦',
      '∧',
      '∨',
      '∩',
      '∪',
      '∫',
      '∬',
      '∭',
      '∮',
      '∯',
      '∰',
      '∱',
      '∲',
      '∳',
    ];

    // Fill the canvas with black initially
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, width, height);

      context.font = '20px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
        const x = i * 20;
        const y = drops[i] * 20;

        const gradient = context.createLinearGradient(x, 0, x, height);
        gradient.addColorStop(0, '#0000FF');
        gradient.addColorStop(1, '#800080');

        context.fillStyle = gradient;
        context.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += speeds[i] * config.speedRatio;
      }
    };

    setInterval(draw, 50);
  },
};
</script>

<style>
/* No additional styles needed as Tailwind CSS is used */
</style>
