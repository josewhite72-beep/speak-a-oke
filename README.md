# 🎤 Speak-a-Oke

Real-time speech-to-text PWA for English classroom projection.  
Teacher speaks → students read + listen simultaneously.

## Features
- 🎙 Real-time speech transcription (Web Speech API)
- 🔊 Text-to-speech playback with native English voices
- 🌐 English → Spanish translation (DeepSeek AI)
- ✏️ Edit mode for teacher corrections
- 💾 Session history (localStorage)
- 📤 Export to clipboard or .txt
- ⛶ Fullscreen mode for projector/TV
- 📱 Mobile + landscape optimized

## Project Structure
```
speak-a-oke/
├── index.html        # Main PWA (single file)
├── manifest.json     # PWA manifest
├── sw.js             # Service Worker (offline support)
├── vercel.json       # Vercel config
├── api/
│   └── translate.js  # Serverless: DeepSeek translation
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Add environment variable:
   - **Name:** `DEEPSEEK_API_KEY`
   - **Value:** your key from [platform.deepseek.com](https://platform.deepseek.com)
4. Deploy ✓

## Local Testing
Open `index.html` directly in Chrome or Edge.  
Translation won't work locally (needs the serverless function) — everything else works via `file://`.

## Browser Support
- ✅ Chrome / Chrome Android (recommended)
- ✅ Edge
- ⚠️ Safari — speech recognition limited
- ❌ Firefox — no Web Speech API
