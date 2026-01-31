/**
 * -----------------------------------------------------------------------
 * SPECIALIST: XHAMSTER (4K/8K UNLOCKED - ANONYMOUS!)
 * -----------------------------------------------------------------------
 * xHamster serves 4K ANONYMOUSLY! No Premium, no login needed!
 * 
 * PROVEN WORKING APPROACH (from old MediaSurgeon project):
 * - Simple is better: minimal headers, basic impersonation
 * - --no-check-certificates (PLURAL!) is critical
 * - --impersonate chrome (not chrome124)
 * - --sleep-requests 1 is enough (proven to work)
 * ----------------------------------------------------------------------- */
export default {
    id: 'xhamster',
    domain: 'xhamster.com',
    
    /**
     * getAuditCommand
     * 🔥 xHamster serves 4K/8K for FREE! No auth needed!
     * 
     * PROVEN CLOUDFLARE BYPASS (from working old project):
     * - Minimal headers (less is more)
     * - Correct certificate flag (plural!)
     * - Basic chrome impersonation
     */
    getAuditCommand: (url) => {
        const userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`;
        const format = `-f "best[ext=mp4]/best"`;  // NO cap! Grab highest available (4K, 8K, whatever!)
        
        // PORTABLE: No cache-dir path
        // PROVEN WORKING FLAGS (from old project):
        return `bin\\yt-dlp.exe --user-agent "${userAgent}" --no-check-certificates --impersonate chrome --force-ipv4 --add-header "Referer:https://xhamster.com/" --sleep-requests 1 -J ${format} --no-playlist --ignore-config "${url}"`;
    },

    getDownloadCommand: (url, formatId, outputPath) => {
        const userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`;
        
        // PORTABLE: No cache-dir path
        // PROVEN WORKING FLAGS (from old project):
        return `bin\\yt-dlp.exe --user-agent "${userAgent}" --no-check-certificates --impersonate chrome --force-ipv4 --add-header "Referer:https://xhamster.com/" --sleep-requests 1 --newline --no-warnings -f ${formatId} -o "${outputPath}" --no-playlist --ignore-config "${url}"`;
    },

    search: async function(query, page = 1) {
        const proxy = 'https://api.allorigins.win/raw?url=';
        const target = `https://xhamster.com/search/${encodeURIComponent(query)}?page=${page}`;
        try {
            const res = await fetch(`${proxy}${encodeURIComponent(target)}`);
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            let results = [];
            doc.querySelectorAll('.thumb-list__item').forEach((el) => {
                const a = el.querySelector('a.video-thumb-info__name');
                const img = el.querySelector('img.thumb-image-container__image');
                if (a && img) {
                    results.push({
                        title: a.textContent.trim() || "Video",
                        link: a.href.startsWith('http') ? a.href : 'https://xhamster.com' + a.getAttribute('href'),
                        thumb: img.getAttribute('src') || img.getAttribute('data-src'),
                        source: 'XHAMSTER'
                    });
                }
            });
            return results;
        } catch (e) { return []; }
    }
};

/**
 * =====================================================================
 * TROUBLESHOOTING: HTTP 520 / 502 CLOUDFLARE ERRORS
 * =====================================================================
 * 
 * ISSUE: yt-dlp returns "HTTP Error 520" or null output
 * CAUSE: Cloudflare protection blocking yt-dlp's requests
 * 
 * SOLUTIONS (Try in order):
 * 
 * 1. INCREASE SLEEP TIME:
 *    Edit getAuditCommand: --sleep-requests 2 → --sleep-requests 5
 *    Edit getDownloadCommand: --sleep-requests 2 → --sleep-requests 5
 * 
 * 2. USE DIFFERENT BROWSER IMPERSONATION:
 *    Try: chrome124, firefox, safari
 *    Edit: --impersonate chrome124 → --impersonate firefox
 * 
 * 3. ADD COOKIES (if you have an xHamster account):
 *    Add: --cookies-from-browser chrome
 *    This uses your browser's cookies to bypass Cloudflare
 * 
 * 4. MANUAL EXTRACTION (GUARANTEED TO WORK):
 *    If yt-dlp is completely blocked, extract manifest URLs manually:
 * 
 *    a) Open video page in browser
 *    b) Press F12 → Console tab
 *    c) Run: window.initials.xplayerSettings.sources.hls.h264.url
 *    d) Copy the manifest URL (ends with .m3u8)
 *    e) Use yt-dlp directly with manifest:
 *       yt-dlp -o "video.mp4" "MANIFEST_URL_HERE"
 * 
 * VIDEO DATA STRUCTURE (for developers):
 * 
 * xHamster embeds all video data in window.initials JavaScript object:
 * 
 * window.initials = {
 *   xplayerSettings: {
 *     sources: {
 *       hls: {
 *         h264: {
 *           url: "https://video-cf.xhcdn.com/.../master.m3u8",  // H264 HLS
 *           fallback: "https://video-nss.xhcdn.com/..."        // Fallback CDN
 *         },
 *         av1: {
 *           url: "https://video-cf.xhcdn.com/.../master.av1.m3u8"  // AV1 HLS
 *         }
 *       },
 *       standard: {
 *         h264: [
 *           { url: "...144p.h264.mp4", quality: "144p" },
 *           { url: "...240p.h264.mp4", quality: "240p" },
 *           { url: "...480p.h264.mp4", quality: "480p" },
 *           { url: "...720p.h264.mp4", quality: "720p" },
 *           { url: "...1080p.h264.mp4", quality: "1080p" },   // Usually max
 *           { url: "...2160p.h264.mp4", quality: "2160p" }    // 4K if available
 *         ]
 *       }
 *     },
 *     duration: 1011,
 *     videoInfo: {
 *       idHash: "xhkUyyH",
 *       title: "Video Title",
 *       duration: 1011,
 *       isUHD: true  // Indicates 4K available
 *     }
 *   }
 * };
 * 
 * EXTRACTION SCRIPT (browser console):
 * 
 * // Get all available formats
 * const formats = window.initials.xplayerSettings.sources.standard.h264;
 * console.table(formats.map(f => ({ quality: f.quality, url: f.url })));
 * 
 * // Get best HLS manifest
 * const hlsUrl = window.initials.xplayerSettings.sources.hls.h264.url;
 * console.log('HLS Manifest:', hlsUrl);
 * 
 * // Get 4K direct link (if available)
 * const uhd = formats.find(f => f.quality === '2160p');
 * if (uhd) console.log('4K Direct:', uhd.url);
 * 
 * =====================================================================
 */
