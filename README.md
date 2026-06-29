# 쉼터 교회 · Shimteo Church Website

A bilingual (Korean / English) church website built with Next.js 14 and Tailwind CSS. Sermon videos are automatically pulled from YouTube.

## Quick Start

### 1. Install dependencies

```bash
cd shimteo-church
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
YOUTUBE_API_KEY=your_api_key_here
YOUTUBE_CHANNEL_ID=your_channel_id_here
NEXT_PUBLIC_SITE_URL=https://shimteochurch.com
```

### 3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

## How to Get a YouTube API Key

1. Go to https://console.cloud.google.com/
2. Create a new project (or select an existing one)
3. Go to **APIs & Services > Library**
4. Search for **YouTube Data API v3** and enable it
5. Go to **APIs & Services > Credentials**
6. Click **Create Credentials > API Key**
7. Copy the key into your `.env.local` file as `YOUTUBE_API_KEY`

### Finding Your Channel ID

1. Go to your YouTube channel page
2. Click your profile picture > **View your channel**
3. The URL will be `youtube.com/channel/UCxxxxxxx` — the `UCxxxxxxx` part is your Channel ID
4. Copy it into `.env.local` as `YOUTUBE_CHANNEL_ID`

## How to Update Church Info

All church-specific information is in one file: **`/config/church.js`**

Edit this file to update:
- Church name and pastor name
- Address, phone, email
- Sunday service time
- Church tagline and introduction text
- YouTube channel URL

Look for any value starting with `YOUR_` — these are placeholders for you to fill in.

## How to Add Photos

Place your images in `/public/images/`:

| File | Purpose | Size |
|------|---------|------|
| `hero.jpg` | Homepage background | 1920 x 1080 px |
| `pastor.jpg` | Pastor photo (About page) | 800 x 800 px |
| `icon.png` | Favicon / logo | 512 x 512 px |
| `og-image.jpg` | Social share preview | 1200 x 630 px |

See `/public/images/README.md` for more details.

## How to Set Up Google Maps

1. Go to https://maps.google.com
2. Search for your church address
3. Click **Share** > **Embed a map**
4. Copy the `src` URL from the iframe code
5. Paste it into `components/ContactClient.js` where it says `REPLACE_WITH_YOUR_EMBED_URL`

## Deploy to Netlify

### First-time setup

1. Push this project to a GitHub repository
2. Go to https://app.netlify.com
3. Click **Add new site > Import an existing project**
4. Connect your GitHub repo
5. Netlify will auto-detect the build settings from `netlify.toml`

### Environment variables on Netlify

In your Netlify dashboard, go to **Site settings > Environment variables** and add:

- `YOUTUBE_API_KEY` — your YouTube API key
- `YOUTUBE_CHANNEL_ID` — your YouTube channel ID
- `NEXT_PUBLIC_SITE_URL` — your site URL (e.g. `https://shimteochurch.com`)

### Install the Netlify Next.js plugin

```bash
npm install -D @netlify/plugin-nextjs
```

## Project Structure

```
shimteo-church/
├── app/                    # Next.js pages
│   ├── page.js            # Home page
│   ├── about/page.js      # About + service info
│   ├── contact/page.js    # Directions + contact
│   └── sermons/
│       ├── page.js        # Sermon library
│       ├── [videoId]/     # Individual sermon
│       └── series/[playlistId]/  # Series page
├── components/            # React components
├── config/
│   └── church.js          # Church info (edit this!)
├── lib/
│   ├── youtube.js         # YouTube API functions
│   ├── playlists.js       # Playlist configuration
│   ├── translations.js    # Bilingual text strings
│   └── LanguageContext.js # Language toggle state
├── public/images/         # Your photos go here
└── netlify.toml           # Netlify deploy config
```

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **Noto Serif KR + Noto Sans KR** fonts (Google Fonts)
- **YouTube Data API v3** for sermon videos
- **Netlify** for hosting
