import Sub from 'markdown-it-sub';
import Sup from 'markdown-it-sup';
import Footnote from 'markdown-it-footnote';
import Deflist from 'markdown-it-deflist';
import Abbr from 'markdown-it-abbr';
import Ins from 'markdown-it-ins';
import Mark from 'markdown-it-mark';
import Anchor from 'markdown-it-anchor';
import Toc from 'markdown-it-toc-done-right';
import Tasklists from 'markdown-it-task-lists';
import Katex from 'markdown-it-katex';
import Highlightjs from 'markdown-it-highlightjs';

export const markdownPlugins = [
  { plugin: Sub },
  { plugin: Sup },
  { plugin: Footnote },
  { plugin: Deflist },
  { plugin: Abbr },
  { plugin: Ins },
  { plugin: Mark },
  { plugin: Anchor },
  { plugin: Toc },
  { plugin: Tasklists },
  { plugin: Katex },
  { plugin: Highlightjs, options: { inline: true } },
];
