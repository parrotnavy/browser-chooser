# Browser Chooser Website

The official landing page for [Browser Chooser](https://github.com/parrotnavy/browser-chooser/) — a smart URL router that puts you in control of which browser opens your links.

## Features

- **Smart URL Routing**: Define exactly where your links go based on URL patterns, source app, or modifier keys
- **Multi-Profile Mastery**: Auto-detects profiles for Chrome, Edge, Brave, Vivaldi, and Arc
- **Privacy by Default**: Automatically strips tracking parameters (utm_source, fbclid, gclid)
- **Beautiful Prompt UI**: Choose between sleek Row layout or lightning-fast Radial menu
- **Native Performance**: Built with Swift 6 (macOS) and .NET 9 (Windows)
- **URL Expansion**: Automatically expands short URLs to see final destinations
- **Powerful Rule Engine**: Use operators like "contains", "regex", or "ends with"
- **Developer Friendly**: Custom URL scheme API (`x-browser-chooser://`)

## Running Locally

### Prerequisites
- Python 3.x (for local server)
- A modern web browser

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/parrotnavy/browser-chooser/.git
   cd browser-chooser
   ```

2. Start a local HTTP server:
   ```bash
   python -m http.server 8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

4. The site will be available at the root path. All internal links (Features, FAQ, Download) use anchor navigation and will work correctly.

## Deploying to GitHub Pages

### Prerequisites
- Repository must be public (or have GitHub Pro for private repos)
- Git configured locally

### Steps

1. **Enable GitHub Pages in Repository Settings:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select **main** branch and **(root)** folder
   - Click **Save**

2. **Push your changes:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Access your site:**
   - Your site will be available at: `https://username.github.io/browser-chooser/`
   - GitHub Pages will automatically build and deploy on each push to main
   - Initial deployment may take 1-2 minutes

### Troubleshooting GitHub Pages

- **Site not appearing**: Check that the repository is public and Pages is enabled
- **404 errors**: Verify the source branch is set to `main` and folder is `(root)`
- **Stale content**: GitHub Pages caches for 10 minutes; wait or hard-refresh your browser
- **Custom domain**: If using a custom domain, ensure CNAME file is in the root directory

## Updating Content

### Modifying the Landing Page

Edit `index.html` directly:
- **Hero section**: Lines 26-38 (title, subtitle, CTA buttons)
- **Features section**: Lines 41-124 (8 feature cards with icons and descriptions)
- **FAQ section**: Lines 127-148 (4 FAQ items)
- **Download section**: Lines 151-161 (version numbers and download buttons)
- **Footer**: Lines 165-178 (links and copyright)

### Updating Version Numbers

The version numbers appear in two places in `index.html`:
1. **Line 156**: macOS version in download button
2. **Line 157**: Windows version in download button
3. **Line 159**: Version note text

Update these when releasing new versions.

### Customizing Styling

All styles are in `assets/css/style.css`:
- **Color scheme**: CSS variables at the top of the file (`--color-primary`, `--color-bg`, etc.)
- **Typography**: Font family and sizing rules
- **Responsive breakpoints**: Mobile-first design with `@media (max-width: 768px)`
- **Component styles**: `.hero`, `.features`, `.faq`, `.download-cta`, `.site-footer`

### Adding New Sections

1. Add a new `<section>` with a unique `id` attribute
2. Add navigation link in the header (line 16-21) pointing to the section ID
3. Style the section in `assets/css/style.css`
4. Test locally with `python -m http.server 8000`

## Project Structure

```
browser-chooser/
├── index.html              # Main landing page
├── purchase.html           # Purchase/pricing page (if applicable)
├── README.md              # This file
├── CNAME                  # Custom domain configuration (if using custom domain)
├── assets/
│   ├── css/
│   │   └── style.css      # All styling
│   ├── js/
│   │   └── (scripts if any)
│   └── img/
│       └── (images and graphics)
└── api/
    └── (API endpoints if any)
```

## OpenGraph & Social Sharing

The site includes OpenGraph meta tags for proper social media sharing:
- **og:title**: "Browser Chooser - The Smart URL Router"
- **og:description**: "Route links to the right browser profile automatically..."
- **og:image**: Link to preview image
- **og:url**: Canonical URL
- **twitter:card**: "summary_large_image" for Twitter/X

To customize the preview image:
1. Create or upload an image (1200x630px recommended)
2. Update the `og:image` meta tag in `index.html` (line 10)

## Support

- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/parrotnavy/browser-chooser//issues)
- **Discussions**: Join the community on [GitHub Discussions](https://github.com/parrotnavy/browser-chooser//discussions)
- **Main Project**: Visit the [Browser Chooser repository](https://github.com/parrotnavy/browser-chooser/)
