document.addEventListener('DOMContentLoaded', () => {
    const macosLinks = Array.from(document.querySelectorAll('[data-download-os="macos"]'));
    if (macosLinks.length === 0) {
        return;
    }

    const parseRepoSlug = () => {
        const canonical = document.querySelector('link[rel="canonical"]');
        const canonicalHref = canonical ? canonical.getAttribute('href') : '';
        if (typeof canonicalHref === 'string') {
            const match = canonicalHref.match(/github\.com\/([^\/]+)\/([^\/?#]+)/i);
            if (match) {
                return `${match[1]}/${match[2]}`;
            }
        }
        return 'parrotnavy/browser-chooser';
    };

    const parseVersionFromName = (fileName) => {
        const match = fileName.match(/^Browser-Chooser-(\d+(?:\.\d+)+)\.dmg$/i);
        if (!match) {
            return null;
        }

        const versionParts = match[1].split('.').map((part) => Number.parseInt(part, 10));
        if (versionParts.some((part) => Number.isNaN(part))) {
            return null;
        }

        return {
            fileName,
            version: match[1],
            versionParts
        };
    };

    const compareVersions = (left, right) => {
        const partCount = Math.max(left.versionParts.length, right.versionParts.length);

        for (let index = 0; index < partCount; index += 1) {
            const leftPart = left.versionParts[index] ?? 0;
            const rightPart = right.versionParts[index] ?? 0;

            if (leftPart !== rightPart) {
                return leftPart - rightPart;
            }
        }

        return 0;
    };

    const applyLatestDownload = (latestFileName, latestVersion) => {
        macosLinks.forEach((link) => {
            const basePath = link.getAttribute('data-download-base') || './';
            const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
            link.setAttribute('href', `${normalizedBasePath}${latestFileName}`);

            const subLabel = link.querySelector('.btn-sub');
            if (subLabel) {
                subLabel.textContent = `v${latestVersion}`;
            }
        });
    };

    const repoSlug = parseRepoSlug();
    const apiUrl = `https://api.github.com/repos/${repoSlug}/contents/dl`;

    fetch(apiUrl, {
        headers: {
            Accept: 'application/vnd.github+json'
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to list dl directory (${response.status})`);
            }
            return response.json();
        })
        .then((entries) => {
            if (!Array.isArray(entries)) {
                throw new Error('Unexpected dl directory response shape.');
            }

            const macosArtifacts = entries
                .map((entry) => parseVersionFromName(entry && typeof entry.name === 'string' ? entry.name : ''))
                .filter(Boolean);

            if (macosArtifacts.length === 0) {
                return;
            }

            macosArtifacts.sort(compareVersions);
            const latestArtifact = macosArtifacts[macosArtifacts.length - 1];
            applyLatestDownload(latestArtifact.fileName, latestArtifact.version);
        })
        .catch(() => {
            // Keep fallback href from markup when API lookup fails.
        });
});
