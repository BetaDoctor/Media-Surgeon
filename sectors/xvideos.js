/**
 * -----------------------------------------------------------------------
 * SPECIALIST: XVIDEOS (CLEAN CONSOLE EDITION)
 * -----------------------------------------------------------------------
 * Shows fragment counts cleanly: "Downloading fragment 30 of 71"
 * ----------------------------------------------------------------------- */
export default {
    id: 'xvideos',
    domain: 'xvideos.com',
    
    /**
     * getAuditCommand
     * Quiet mode for analysis (just need the JSON)
     */
    getAuditCommand: (url) => {
        const headers = `--add-header "Referer:https://www.xvideos.com" --add-header "Origin:https://www.xvideos.com"`;
        const format = `-f "best[height<=1080][ext=mp4]/best[ext=mp4]/best"`;
        
        // PORTABLE: No cache-dir path
        return `bin\\yt-dlp.exe -J ${format} --no-check-certificate --user-agent "Mozilla/5.0" ${headers} --no-playlist --ignore-config "${url}"`;
    },

    getDownloadCommand: (url, formatId, outputPath) => {
        const headers = `--add-header "Referer:https://www.xvideos.com" --add-header "Origin:https://www.xvideos.com"`;
        
        // PORTABLE: No cache-dir path
        return `bin\\yt-dlp.exe -f ${formatId} -o "${outputPath}" --no-check-certificate --user-agent "Mozilla/5.0" ${headers} --no-playlist --ignore-config --newline --no-warnings "${url}"`;
    },

    search: async function(query, page = 1) {
        const proxy = 'https://api.allorigins.win/raw?url=';
        const target = `https://www.xvideos.com/?k=${encodeURIComponent(query)}&p=${page}`;
        try {
            const res = await fetch(`${proxy}${encodeURIComponent(target)}`);
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            let results = [];
            doc.querySelectorAll('.mozaique > div').forEach((el) => {
                const a = el.querySelector('a[href*="/video"]');
                const img = el.querySelector('img');
                if (a && img) {
                    results.push({
                        title: img.alt || "Video",
                        link: a.href.startsWith('http') ? a.href : 'https://www.xvideos.com' + a.getAttribute('href'),
                        thumb: img.getAttribute('data-src') || img.getAttribute('src'),
                        source: 'XVIDEOS'
                    });
                }
            });
            return results;
        } catch (e) { return []; }
    }
};
