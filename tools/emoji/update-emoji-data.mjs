/**
 * update-emoji-data.mjs
 * Fetches latest Unicode emoji-test.txt specification and parses it into
 * src/assets/emoji-data.json and src/app/game/emoji-data.ts with version tags and metadata.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNICODE_EMOJI_URL = 'https://unicode.org/Public/emoji/15.1/emoji-test.txt';
const LOCAL_FALLBACK_FILE = path.join(__dirname, 'emoji-test.txt');
const TARGET_JSON_PATH = path.join(__dirname, '../../src/assets/emoji-data.json');
const TARGET_TS_PATH = path.join(__dirname, '../../src/app/game/emoji-data.ts');

const groupStartId = '# group: ';
const subGroupStartId = '# subgroup: ';
const qualifiedId = '; fully-qualified';

// Unwanted or controversial symbols for a casual puzzle game
const skipList = [
  'spade suit',
  'heart suit',
  'diamond suit',
  'club suit',
  'crown',
  'pregnant man',
  'troll',
  'identification',
  'bubbles',
  'crutch',
  'x-ray',
  'middle finger',
  'flag:',
];

function parseLine(line) {
  const lineSegments = line.split(';');
  const listArray = lineSegments[0].trim().split(/\s+/);
  const hexArray = listArray.map((l) => Number(`0x${l}`));

  const afterHash = line.split('#')[1]?.trim() || '';
  const match = afterHash.match(/^\S+\s+E(\d+(?:\.\d+)?)\s+(.+)$/);

  let versionStr = 'E1.0';
  let versionNum = 1.0;
  let desc = afterHash;

  if (match) {
    versionStr = `E${match[1]}`;
    versionNum = parseFloat(match[1]);
    desc = match[2].trim();
  }

  return {
    sequence: hexArray,
    version: versionStr,
    versionNum,
    desc,
  };
}

async function loadEmojiTestContent() {
  try {
    console.info(`Fetching latest emoji test data from ${UNICODE_EMOJI_URL}...`);
    const res = await fetch(UNICODE_EMOJI_URL, { signal: AbortSignal.timeout(10000) });
    if (res.ok) {
      console.info('Successfully downloaded Unicode emoji data.');
      return { content: await res.text(), source: UNICODE_EMOJI_URL, version: '15.1' };
    }
  } catch (err) {
    console.warn(`Network fetch failed (${err.message}). Falling back to local ${LOCAL_FALLBACK_FILE}...`);
  }

  if (fs.existsSync(LOCAL_FALLBACK_FILE)) {
    const content = fs.readFileSync(LOCAL_FALLBACK_FILE, { encoding: 'utf-8' });
    return { content, source: LOCAL_FALLBACK_FILE, version: '14.0' };
  }

  throw new Error('Unable to obtain emoji-test.txt from network or local file.');
}

async function main() {
  const { content, source, version } = await loadEmojiTestContent();
  const emojiData = [];

  let currentGroup = null;
  let currentSubGroup = null;
  let totalEmojis = 0;

  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith(groupStartId)) {
      const groupId = line.replace(groupStartId, '').trim();
      currentGroup = { id: groupId, subGroup: [] };
      emojiData.push(currentGroup);
      currentSubGroup = null;
    } else if (line.startsWith(subGroupStartId)) {
      if (!currentGroup) continue;
      const subGroupId = line.replace(subGroupStartId, '').trim();
      currentSubGroup = { id: subGroupId, codes: [] };
      currentGroup.subGroup.push(currentSubGroup);
    } else if (line.includes(qualifiedId)) {
      if (!currentGroup || !currentSubGroup) continue;
      const lower = line.toLowerCase();
      if (skipList.every((skip) => !lower.includes(skip))) {
        const item = parseLine(line);
        currentSubGroup.codes.push(item);
        totalEmojis++;
      }
    }
  }

  // Filter out non-playable groups (Flags, Component)
  const filteredData = emojiData.filter((g) => g.id !== 'Flags' && g.id !== 'Component');

  // Filter out any empty subgroups
  for (const group of filteredData) {
    group.subGroup = group.subGroup.filter((sg) => sg.codes.length > 0);
  }

  const payload = {
    metadata: {
      unicodeVersion: version,
      generatedAt: new Date().toISOString().split('T')[0],
      source,
      groupCount: filteredData.length,
      totalEmojis,
    },
    groups: filteredData,
  };

  const targetDir = path.dirname(TARGET_JSON_PATH);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(TARGET_JSON_PATH, JSON.stringify(payload, null, 2), 'utf-8');
  console.info(`Saved ${totalEmojis} emojis to ${TARGET_JSON_PATH}`);

  const tsContent = `// - Generated file, do not modify -
// Original data: https://unicode.org (Unicode Emoji v${version})

import { EmojiGroup } from './services/emoji-support';

export const EmojiData: EmojiGroup[] = ${JSON.stringify(filteredData, null, 2)};
`;
  fs.writeFileSync(TARGET_TS_PATH, tsContent, 'utf-8');
  console.info(`Saved TypeScript EmojiData (${totalEmojis} emojis) to ${TARGET_TS_PATH}`);
}

main().catch((err) => {
  console.error('Failed to update emoji data:', err);
  process.exit(1);
});
