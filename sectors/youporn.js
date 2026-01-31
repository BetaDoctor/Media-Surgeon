/**
 * -----------------------------------------------------------------------
 * SPECIALIST: YOUPORN
 * -----------------------------------------------------------------------
 * YouPorn specialist - Based on proven general.js approach
 * Max Quality: 1080p (standard for free content)
 * Strategy: Full browser impersonation + Cloudflare bypass
 * ----------------------------------------------------------------------- */
export default {
    id: 'youporn',
    domain: 'youporn.com',
    
    getAuditCommand: (url) => {
        const userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`;
        
        // Format: Cap at 1080p (avoid premium content)
        const format = `-f "best[height<=1080][ext=mp4]/best[ext=mp4]/best"`;
        
        // YouPorn-specific headers
        const headers = [
            `--add-header "Referer:https://www.youporn.com"`,
            `--add-header "Origin:https://www.youporn.com"`,
            `--add-header "Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"`,
            `--add-header "Accept-Language:en-US,en;q=0.9"`,
            `--add-header "Accept-Encoding:gzip, deflate, br"`,
            `--add-header "DNT:1"`,
            `--add-header "Connection:keep-alive"`,
            `--add-header "Upgrade-Insecure-Requests:1"`
        ].join(' ');
        
        const impersonate = `--impersonate chrome`;
        const network = `--force-ipv4`;
        const cloudflare = `--sleep-requests 1`;
        const security = `--no-check-certificates`;
        const retry = `--extractor-retries 3`;
        
        // PORTABLE: No hardcoded paths
        return `bin\\yt-dlp.exe -J ${format} ${security} --user-agent "${userAgent}" ${headers} ${impersonate} ${network} ${cloudflare} ${retry} --no-playlist --ignore-config "${url}"`;
    },

    getDownloadCommand: (url, formatId, outputPath) => {
        const userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`;
        
        const headers = [
            `--add-header "Referer:https://www.youporn.com"`,
            `--add-header "Origin:https://www.youporn.com"`,
            `--add-header "Accept:*/*"`,
            `--add-header "Accept-Language:en-US,en;q=0.9"`,
            `--add-header "DNT:1"`
        ].join(' ');
        
        const impersonate = `--impersonate chrome`;
        const network = `--force-ipv4`;
        const cloudflare = `--sleep-requests 1`;
        const security = `--no-check-certificates`;
        const fragments = `--fragment-retries 10 --newline --no-warnings`;
        
        // PORTABLE: No hardcoded paths
        return `bin\\yt-dlp.exe -f ${formatId} -o "${outputPath}" ${security} --user-agent "${userAgent}" ${headers} ${impersonate} ${network} ${cloudflare} ${fragments} --no-playlist --ignore-config "${url}"`;
    },

    search: async function(query, page = 1) {
        return [];
    }
};

/**
 * =====================================================================
 * YOUPORN EXTRACTION NOTES
 * =====================================================================
 * 
 * MAX QUALITY: 1080p
 * YouPorn caps free content at 1080p
 * 
 * STRATEGY (From general.js):
 * - Chrome impersonation
 * - Cloudflare bypass (sleep-requests)
 * - Full browser headers
 * - IPv4 only (more reliable)
 * - Fragment retry on download
 * 
 * RELIABILITY: High
 * Site has stable infrastructure, clean URLs
 * 
 * =====================================================================
 */
