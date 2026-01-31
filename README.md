# MediaSurgeon v3.0 🎬

**A portable media extraction tool with site-specific optimization specialists**

MediaSurgeon is a self-contained, web-based video downloader that uses intelligent "specialists" to extract media from various platforms with optimized settings for each site. No installation required - just download the required tools and run!

---

## 🌟 Features

- **🎯 Site-Specific Specialists**: Custom extraction strategies for each supported platform
- **🌐 Web-Based Interface**: Clean, modern UI with real-time progress updates
- **⚡ WebSocket Bridge**: Live communication between browser and backend
- **📦 Portable**: Runs from any location - USB drive, network share, local folder
- **🔧 No Installation**: No registry changes, no system dependencies
- **🎨 Custom Styling**: Tailwind CSS-powered responsive design

---

## 🎯 Supported Sites

| Site | Max Quality | Features |
|------|-------------|----------|
| **xHamster** | 4K/8K | Anonymous access to premium formats |
| **Pornhub** | 4K | Chrome impersonation for format unlocking |
| **xVideos** | 1080p | Clean extraction with fragment retry |
| **xNXX** | 1080p | Cloudflare bypass, full browser headers |
| **YouPorn** | 1080p | Full browser impersonation |
| **General Fallback** | Varies | Universal extraction for any site |

---

## 📋 Prerequisites

MediaSurgeon requires **4 executable tools** to function. These are **NOT included** in this repository due to their large file sizes (400+ MB total).

### Required Downloads

#### 1. **yt-dlp** (Video Downloader)
- **Purpose**: Core extraction engine
- **Size**: ~18 MB
- **Download**: [https://github.com/yt-dlp/yt-dlp/releases](https://github.com/yt-dlp/yt-dlp/releases)
- **Get**: Download `yt-dlp.exe` (Windows executable)
- **Location**: Place in `bin/` folder

#### 2. **FFmpeg** (Video Processor)
- **Purpose**: Video encoding/processing
- **Size**: ~190 MB
- **Download**: [https://github.com/BtbN/FFmpeg-Builds/releases](https://github.com/BtbN/FFmpeg-Builds/releases)
- **Get**: Download `ffmpeg-master-latest-win64-gpl.zip`
- **Extract**: `ffmpeg.exe` from the zip
- **Location**: Place in `bin/` folder

#### 3. **FFprobe** (Video Analysis)
- **Purpose**: Analyzes video streams
- **Size**: ~190 MB
- **Included**: In the same FFmpeg download as above
- **Extract**: `ffprobe.exe` from the zip
- **Location**: Place in `bin/` folder

#### 4. **websocketd** (WebSocket Bridge)
- **Purpose**: Bridges browser and command-line tools
- **Size**: ~7.5 MB
- **Download**: [https://github.com/joewalnes/websocketd/releases](https://github.com/joewalnes/websocketd/releases)
- **Get**: Download `websocketd-X.X.X-windows_amd64.zip`
- **Extract**: `websocketd.exe`
- **Location**: Place in `bin/` folder

#### 5. **Tailwind CSS CLI** (Styling - Optional)
- **Purpose**: CSS framework (only needed for development)
- **Size**: ~126 MB
- **Download**: [https://github.com/tailwindlabs/tailwindcss/releases](https://github.com/tailwindlabs/tailwindcss/releases)
- **Get**: Download `tailwindcss-windows-x64.exe`
- **Rename**: Rename to `tailwindcss.exe`
- **Location**: Place in `lib/` folder
- **Note**: Only required if you want to modify the styling

---

## 🚀 Setup Instructions

### Step 1: Clone or Download Repository

```bash
git clone https://github.com/YOUR_USERNAME/MediaSurgeon.git
cd MediaSurgeon
```

Or download as ZIP and extract.

### Step 2: Download Required Executables

Download the 4 required tools listed above (yt-dlp, ffmpeg, ffprobe, websocketd).

### Step 3: Place Executables in Correct Folders

Your folder structure should look like this:

```
MediaSurgeon/
├── bin/
│   ├── ffmpeg.exe          ✅ Download this
│   ├── ffprobe.exe         ✅ Download this
│   ├── websocketd.exe      ✅ Download this
│   ├── yt-dlp.exe          ✅ Download this
│   └── temp/               (created automatically)
├── lib/
│   ├── tailwindcss.exe     ⚠️ Optional (dev only)
│   ├── favicon.svg
│   ├── logo.svg
│   ├── video.min.js
│   ├── video-js.min.css
│   └── [site icons...]
├── sectors/
│   ├── general.js          (fallback specialist)
│   ├── pornhub.js
│   ├── xhamster.js
│   ├── xnxx.js
│   ├── xvideos.js
│   └── youporn.js
├── index.html
├── style.css
└── media_surgeon.bat       ⭐ Run this to start!
```

### Step 4: Run MediaSurgeon

**Double-click** `media_surgeon.bat`

This will:
1. Launch the web interface in your browser (`http://localhost:8080`)
2. Start the WebSocket bridge on port 8080
3. Open a command window showing real-time activity

---

## 💡 Usage

1. **Start the application** by running `media_surgeon.bat`
2. **Paste a video URL** in the web interface
3. MediaSurgeon automatically **detects the site** and uses the appropriate specialist
4. **View available formats** (resolutions, file sizes)
5. **Click download** to start extraction
6. **Watch progress** in real-time (fragment counts, percentage)
7. **Find your video** in the `MediaSurgeon` folder when complete

---

## 🔧 How It Works

### Architecture

```
Browser (UI)
    ↕ WebSocket
websocketd (Bridge)
    ↕ Command Line
yt-dlp + ffmpeg (Tools)
    ↕ Network
Video Platforms
```

### Specialist System

Each supported site has a custom "specialist" (JavaScript module) that:
- Provides optimized extraction commands
- Handles site-specific quirks (Cloudflare, headers, authentication)
- Maximizes success rate and video quality
- Falls back to general specialist for unknown sites

### Example: xHamster Specialist

```javascript
// Bypasses Cloudflare protection
// Enables 4K/8K anonymous access
// Uses proven working flags
getAuditCommand: (url) => {
    return `yt-dlp --impersonate chrome --no-check-certificates ...`;
}
```

---

## 🛠️ Troubleshooting

### "Command not found" or "Not recognized"
- ✅ Check that all `.exe` files are in the `bin/` folder
- ✅ Don't rename the files (except tailwindcss)
- ✅ Make sure you downloaded the Windows versions

### Port 8080 Already in Use
- Close other applications using port 8080
- Or edit `media_surgeon.bat` and change `--port=8080` to another port (e.g., `--port=8081`)

### Video Extraction Fails
- Some sites have aggressive bot detection
- Try waiting a few seconds between attempts
- Check if the site structure has changed (specialists may need updates)
- Use the general specialist by editing the URL detection logic

### Download Stalls at 99%
- This is normal for fragment-based downloads
- ffmpeg is merging fragments in the background
- Wait 30-60 seconds - it will complete

---

## 🎨 Development

### Modifying Styles

If you want to customize the appearance:

1. Download `tailwindcss.exe` and place in `lib/` folder
2. Edit `lib/tailwind-input.css` with your custom styles
3. Run: `lib\tailwindcss.exe -i lib\tailwind-input.css -o lib\tailwind-output.css`
4. Refresh the browser to see changes

### Adding New Specialists

To support a new site:

1. Create a new file in `sectors/` (e.g., `newsite.js`)
2. Follow the pattern from existing specialists
3. Export default object with `id`, `domain`, and command functions
4. Import in `index.html`

---

## ⚠️ Legal Disclaimer

This tool is for **personal use only**. Users are responsible for:
- Respecting copyright laws
- Following platform Terms of Service
- Only downloading content they have rights to access
- Complying with local regulations

The authors are not responsible for misuse of this software.

---

## 📝 License

This project is provided as-is for educational and personal use.

---

## 🙏 Credits

**Built with:**
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Video extraction engine
- [FFmpeg](https://ffmpeg.org/) - Video processing
- [websocketd](https://github.com/joewalnes/websocketd) - WebSocket bridge
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Video.js](https://videojs.com/) - Video player components

---

## 📧 Support

For issues or questions:
- Check the troubleshooting section above
- Review specialist code comments for site-specific tips
- Ensure all required executables are properly downloaded

---

**Happy downloading! 🎬**
