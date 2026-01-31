/**
 * -----------------------------------------------------------------------
 * SPECIALIST: PORNHUB (4K UNLOCKED EDITION)
 * -----------------------------------------------------------------------
 * Uses --impersonate chrome to access Premium formats WITHOUT cookies!
 * Shows fragment counts cleanly: "Downloading fragment 30 of 71"
 * ----------------------------------------------------------------------- */
export default {
    id: 'pornhub',
    domain: 'pornhub.com',
    
    /**
     * getAuditCommand
     * 🔥 MAGIC: --impersonate chrome tricks PH into serving all formats!
     */
    getAuditCommand: (url) => {
        const headers = `--add-header "Referer:https://www.pornhub.com" --add-header "Origin:https://www.pornhub.com"`;
        const format = `-f "best[height<=2160][ext=mp4]/best[height<=1440][ext=mp4]/best[height<=1080][ext=mp4]/best[ext=mp4]/best"`;
        const impersonate = `--impersonate chrome --force-ipv4`;
        
        // PORTABLE: No cache-dir path
        return `bin\\yt-dlp.exe -J ${format} --no-check-certificate --user-agent "Mozilla/5.0" ${headers} ${impersonate} --no-playlist --ignore-config "${url}"`;
    },

    getDownloadCommand: (url, formatId, outputPath) => {
        const headers = `--add-header "Referer:https://www.pornhub.com" --add-header "Origin:https://www.pornhub.com"`;
        const impersonate = `--impersonate chrome --force-ipv4`;
        
        // PORTABLE: No cache-dir path
        return `bin\\yt-dlp.exe -f ${formatId} -o "${outputPath}" --no-check-certificate --user-agent "Mozilla/5.0" ${headers} ${impersonate} --no-playlist --ignore-config --newline --no-warnings "${url}"`;
    },

    search: async function(query, page = 1) {
        const proxy = 'https://api.allorigins.win/raw?url=';
        const target = `https://www.pornhub.com/video/search?search=${encodeURIComponent(query)}&page=${page}`;
        try {
            const res = await fetch(`${proxy}${encodeURIComponent(target)}`);
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            let results = [];
            doc.querySelectorAll('.videoBox, .phimage').forEach((el) => {
                const a = el.querySelector('a[href*="/view_video.php"]');
                const img = el.querySelector('img');
                if (a && img) {
                    results.push({
                        title: img.alt || a.title || "Video",
                        link: a.href.startsWith('http') ? a.href : 'https://www.pornhub.com' + a.getAttribute('href'),
                        thumb: img.getAttribute('data-src') || img.getAttribute('src'),
                        source: 'PORNHUB'
                    });
                }
            });
            return results;
        } catch (e) { return []; }
    }
};
