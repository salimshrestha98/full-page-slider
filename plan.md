# Full Page Slider - Apple.com Level Feature Plan

## Vision Statement

Transform Full Page Slider into the **definitive Gutenberg-native full-page scroll plugin** capable of creating Apple.com-level landing pages without code. Target: 10,000+ active installations and $3,000+/month revenue within 18 months.

---

## Current State Analysis

### What We Have (v1.1.0)
- Basic slider with 4 effects (slide, cube, coverflow, flip)
- Vertical/horizontal direction
- 16 content animation types
- Background controls (color, gradient, image)
- Typography controls with Google Fonts
- Layout block (flex/grid)
- 6 multi-slide templates
- Navigation, pagination, scrollbar

### What's Missing for Apple-Level
- Parallax effects
- Video backgrounds
- Scroll-triggered animations
- Advanced text effects (shadows, gradients)
- Overlay/blend modes
- Responsive breakpoint controls
- Sticky/pinned sections
- Image sequence animations
- Single-page focused templates

---

## Priority Matrix

| Priority | Feature | Impact | Effort | ROI |
|----------|---------|--------|--------|-----|
| P0 | Security Fix (AJAX CSRF) | Critical | 2h | Must-do |
| P1 | Video Backgrounds | High | 8h | High |
| P1 | Parallax Effects | High | 12h | High |
| P1 | Template Refactor (Single-page) | High | 8h | High |
| P2 | Overlay & Blend Modes | Medium | 4h | Medium |
| P2 | Text Shadow/Effects | Medium | 4h | Medium |
| P2 | More Slide Effects | Medium | 6h | Medium |
| P3 | Scroll-Triggered Animations | High | 16h | Medium |
| P3 | Responsive Controls | Medium | 12h | Medium |
| P3 | Custom CSS Per Slide | Low | 4h | Low |

---

## Phase 1: Foundation & Quick Wins (v1.2.0)

**Goal**: Fix critical issues + add high-impact features fast

### 1.1 Security Fix (CRITICAL - Day 1)

**File**: `src/Ajax.php`

```php
// Add nonce verification to all AJAX handlers
public function disable_first_time_notice() {
    // Add this check
    check_ajax_referer('fps_admin_nonce', 'nonce');

    if (!current_user_can('manage_options')) {
        wp_send_json_error('Unauthorized');
    }

    update_option('fps_first_time_notice', false);
    wp_send_json_success();
}
```

**Checklist**:
- [ ] Add nonce generation in admin scripts
- [ ] Add `check_ajax_referer()` to all AJAX handlers
- [ ] Add capability checks
- [ ] Sanitize all inputs with `sanitize_text_field()`, `wp_kses_post()`

---

### 1.2 Video Background Support

**New attribute in `slide/block.json`**:
```json
{
  "backgroundVideo": {
    "type": "object",
    "default": {
      "url": "",
      "id": null,
      "poster": "",
      "loop": true,
      "muted": true
    }
  }
}
```

**Implementation**:

1. **BackgroundControl Enhancement** (`src/components/BackgroundControl.js`):
   - Add "Video" tab alongside Color/Gradient/Image
   - MediaUpload for video selection
   - Poster image fallback
   - Loop/Muted toggles (both required for autoplay)

2. **Frontend Rendering** (`src/blocks/slide/save.js`):
   ```jsx
   {backgroundVideo?.url && (
     <video
       className="fps-slide-video-bg"
       src={backgroundVideo.url}
       poster={backgroundVideo.poster}
       autoPlay
       muted
       loop
       playsInline
     />
   )}
   ```

3. **CSS Styling** (`style.scss`):
   ```scss
   .fps-slide-video-bg {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     object-fit: cover;
     z-index: 0;
   }
   ```

**Acceptance Criteria**:
- [ ] Upload video via Media Library
- [ ] Set poster/fallback image
- [ ] Autoplay works on all browsers (muted + playsinline)
- [ ] Video covers full slide area
- [ ] Works on mobile devices

---

### 1.3 Overlay & Blend Modes

**New attributes**:
```json
{
  "overlay": {
    "type": "object",
    "default": {
      "enabled": false,
      "color": "rgba(0,0,0,0.5)",
      "blendMode": "normal"
    }
  }
}
```

**Blend Mode Options**:
- normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, soft-light, hard-light

**Inspector Panel**:
```jsx
<PanelBody title="Overlay" initialOpen={false}>
  <ToggleControl
    label="Enable Overlay"
    checked={overlay.enabled}
    onChange={...}
  />
  {overlay.enabled && (
    <>
      <ColorPicker
        label="Overlay Color"
        value={overlay.color}
        onChange={...}
        enableAlpha={true}
      />
      <SelectControl
        label="Blend Mode"
        value={overlay.blendMode}
        options={blendModeOptions}
        onChange={...}
      />
    </>
  )}
</PanelBody>
```

**CSS Output**:
```scss
.fps-slide-overlay {
  position: absolute;
  inset: 0;
  background-color: var(--fps-overlay-color);
  mix-blend-mode: var(--fps-blend-mode);
  pointer-events: none;
  z-index: 1;
}
```

---

### 1.4 Template Refactor (Single-Page Focus)

**Current Problem**: Templates have 2-6 slides creating multi-page experiences. Need single-slide templates for modular building.

**New Template Categories**:

#### Hero Templates (Single Slide)
1. **Hero - Centered CTA**: Large heading, subtext, centered button
2. **Hero - Split (Text Left)**: 50/50 text and image/video
3. **Hero - Split (Text Right)**: Reversed layout
4. **Hero - Full Video**: Video background with overlay text
5. **Hero - Gradient Wave**: Animated gradient background
6. **Hero - Product Spotlight**: Product image with floating elements

#### Content Templates (Single Slide)
7. **Features - 3 Column Icons**: Icon + title + description grid
8. **Features - 2 Column Large**: Two big feature blocks
9. **Features - Alternating**: Zig-zag layout
10. **Stats/Numbers**: Big numbers with labels
11. **Timeline - Vertical**: Step-by-step process
12. **Comparison Table**: Side-by-side comparison

#### Social Proof Templates (Single Slide)
13. **Testimonial - Single Large**: Quote with photo
14. **Testimonial - Grid**: 2-3 testimonials
15. **Logo Cloud**: Partner/client logos
16. **Case Study Card**: Results-focused layout

#### CTA Templates (Single Slide)
17. **CTA - Simple**: Heading + button
18. **CTA - Newsletter**: Email capture form
19. **CTA - Pricing Cards**: 2-3 pricing tiers
20. **CTA - Contact Split**: Contact info + form

**New File Structure**:
```
src/templates/
├── index.js                    # Registry & exports
├── categories.js               # Category definitions
├── singles/
│   ├── hero-centered.js
│   ├── hero-split-left.js
│   ├── hero-split-right.js
│   ├── hero-video.js
│   ├── features-3col.js
│   ├── features-2col.js
│   ├── testimonial-single.js
│   ├── testimonial-grid.js
│   ├── cta-simple.js
│   ├── cta-pricing.js
│   └── ... (20 templates)
├── bundles/                    # Keep some multi-slide for quick starts
│   ├── landing-page-starter.js # Hero + Features + CTA
│   └── portfolio-starter.js    # Intro + Projects + Contact
└── utils/
    ├── templateHelpers.js
    └── colorSchemes.js
```

**Template Format (New)**:
```javascript
// src/templates/singles/hero-centered.js
export const heroCentered = {
  id: 'hero-centered',
  name: 'Hero - Centered CTA',
  description: 'Classic centered hero with headline, subtext and CTA button',
  category: 'hero',
  tags: ['hero', 'cta', 'centered', 'landing'],
  preview: 'data:image/svg+xml;base64,...',
  isPro: false,

  // Single slide template
  template: [
    ['full-page-slider/slide', {
      backgroundColor: '#1a1a2e',
      contentAlignment: 'center',
      showTitle: false,
    }, [
      ['core/group', {
        layout: { type: 'constrained' },
        style: { spacing: { padding: { top: '0', bottom: '0' } } }
      }, [
        ['core/heading', {
          level: 1,
          content: 'Build Something Amazing',
          textAlign: 'center',
          style: {
            typography: { fontSize: '4rem', fontWeight: '700' },
            color: { text: '#ffffff' }
          }
        }],
        ['core/paragraph', {
          content: 'Create stunning full-page experiences with just a few clicks.',
          align: 'center',
          style: {
            typography: { fontSize: '1.25rem' },
            color: { text: '#a0a0a0' },
            spacing: { margin: { top: '1.5rem', bottom: '2rem' } }
          }
        }],
        ['core/buttons', { layout: { type: 'flex', justifyContent: 'center' } }, [
          ['core/button', {
            text: 'Get Started',
            backgroundColor: '#667eea',
            style: {
              border: { radius: '8px' },
              typography: { fontSize: '1.1rem' },
              spacing: { padding: { top: '1rem', bottom: '1rem', left: '2rem', right: '2rem' } }
            }
          }]
        ]]
      ]]
    ]]
  ]
};
```

**TemplateSelector UI Updates**:
```jsx
// Add category filtering
const [activeCategory, setActiveCategory] = useState('all');
const categories = ['all', 'hero', 'content', 'social-proof', 'cta'];

// Add "Add to Slider" vs "Replace All" options
<ButtonGroup>
  <Button onClick={() => insertTemplate('append')}>
    Add Slide
  </Button>
  <Button onClick={() => insertTemplate('replace')} isDestructive>
    Replace All
  </Button>
</ButtonGroup>
```

---

## Phase 2: Parallax & Advanced Effects (v1.3.0)

**Goal**: Apple-level scroll effects

### 2.1 Swiper Parallax Integration

**Enable Parallax Module** (`view.js`):
```javascript
import Swiper from 'swiper';
import { Navigation, Pagination, Parallax, EffectCreative } from 'swiper/modules';

const swiper = new Swiper('.fps-slider', {
  modules: [Navigation, Pagination, Parallax, EffectCreative],
  parallax: true,
  speed: 1000,
  // ... other options
});
```

**New Slide Attributes**:
```json
{
  "parallax": {
    "type": "object",
    "default": {
      "enabled": false,
      "background": "-23%",
      "title": { "x": 0, "y": 0, "scale": 1, "opacity": 1 },
      "content": { "x": 0, "y": 100, "opacity": 0.5 }
    }
  }
}
```

**Inspector Panel**:
```jsx
<PanelBody title="Parallax Effects" initialOpen={false}>
  <ToggleControl
    label="Enable Parallax"
    checked={parallax.enabled}
  />
  {parallax.enabled && (
    <>
      <RangeControl
        label="Background Parallax"
        value={parseInt(parallax.background)}
        min={-100}
        max={100}
        help="Percentage of background movement"
      />
      <h4>Title Parallax</h4>
      <RangeControl label="X Offset" ... />
      <RangeControl label="Y Offset" ... />
      <RangeControl label="Scale" min={0.5} max={1.5} step={0.1} ... />
      <RangeControl label="Start Opacity" min={0} max={1} step={0.1} ... />
    </>
  )}
</PanelBody>
```

**Frontend Data Attributes** (`save.js`):
```jsx
<div
  className="fps-slide-bg"
  data-swiper-parallax={parallax.background}
  style={{ backgroundImage: `url(${backgroundImage})` }}
/>
<div
  className="fps-slide-title"
  data-swiper-parallax-x={parallax.title.x}
  data-swiper-parallax-y={parallax.title.y}
  data-swiper-parallax-scale={parallax.title.scale}
  data-swiper-parallax-opacity={parallax.title.opacity}
>
  {title}
</div>
```

---

### 2.2 More Slide Effects

**Add to effect options**:

| Effect | Description | Swiper Module |
|--------|-------------|---------------|
| `fade` | Simple fade between slides | EffectFade |
| `cards` | Card stack effect | EffectCards |
| `creative` | Custom 3D transforms | EffectCreative |

**Creative Effect Presets**:
```javascript
const creativePresets = {
  'slide-rotate': {
    prev: { translate: ['-100%', 0, 0], rotate: [0, 0, -15] },
    next: { translate: ['100%', 0, 0], rotate: [0, 0, 15] }
  },
  'scale-fade': {
    prev: { translate: [0, 0, -400], opacity: 0, scale: 0.8 },
    next: { translate: [0, 0, -400], opacity: 0, scale: 0.8 }
  },
  'flip-3d': {
    prev: { translate: [0, 0, -800], rotateY: -90 },
    next: { translate: [0, 0, -800], rotateY: 90 }
  },
  'zoom-out': {
    prev: { scale: 0.5, opacity: 0 },
    next: { scale: 0.5, opacity: 0 }
  }
};
```

---

### 2.3 Text Shadow & Effects

**New Typography Attributes**:
```json
{
  "titleTextShadow": {
    "type": "object",
    "default": {
      "enabled": false,
      "x": 0,
      "y": 4,
      "blur": 8,
      "color": "rgba(0,0,0,0.3)"
    }
  },
  "titleTextStroke": {
    "type": "object",
    "default": {
      "enabled": false,
      "width": 1,
      "color": "#ffffff"
    }
  },
  "titleGradient": {
    "type": "object",
    "default": {
      "enabled": false,
      "gradient": "linear-gradient(90deg, #667eea, #764ba2)"
    }
  }
}
```

**CSS Output**:
```scss
.fps-slide-title {
  // Text Shadow
  text-shadow: var(--fps-text-shadow-x, 0)
               var(--fps-text-shadow-y, 0)
               var(--fps-text-shadow-blur, 0)
               var(--fps-text-shadow-color, transparent);

  // Text Stroke (outline)
  -webkit-text-stroke: var(--fps-text-stroke-width) var(--fps-text-stroke-color);

  // Gradient Text
  &.has-gradient-text {
    background: var(--fps-text-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
```

---

## Phase 3: Pro-Level Features (v1.4.0 - Pro)

**Goal**: Features that justify Pro pricing

### 3.1 Scroll-Triggered Animations

**New Animation Trigger Options**:
```json
{
  "animationTrigger": {
    "type": "string",
    "default": "slide-active",
    "enum": ["slide-active", "viewport", "scroll-progress"]
  },
  "viewportThreshold": {
    "type": "number",
    "default": 0.3
  }
}
```

**Implementation** (`view.js`):
```javascript
// Intersection Observer for viewport-based animations
const observeSlideElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fps-animate-in');
        // Stagger child animations
        const children = entry.target.querySelectorAll('[data-fps-animate]');
        children.forEach((child, index) => {
          child.style.animationDelay = `${index * 100}ms`;
          child.classList.add('fps-animate-in');
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.fps-slide').forEach(slide => {
    observer.observe(slide);
  });
};
```

---

### 3.2 Animation Stagger Controls

**Allow staggered animations for child elements**:

```json
{
  "staggerAnimation": {
    "type": "object",
    "default": {
      "enabled": false,
      "delay": 100,
      "selector": "*"
    }
  }
}
```

**Inspector**:
```jsx
<ToggleControl
  label="Stagger Child Animations"
  checked={staggerAnimation.enabled}
/>
{staggerAnimation.enabled && (
  <>
    <RangeControl
      label="Delay Between Elements"
      value={staggerAnimation.delay}
      min={50}
      max={500}
      step={50}
    />
    <SelectControl
      label="Target Elements"
      value={staggerAnimation.selector}
      options={[
        { label: 'All Children', value: '*' },
        { label: 'Headings Only', value: 'h1,h2,h3,h4,h5,h6' },
        { label: 'Paragraphs Only', value: 'p' },
        { label: 'Images Only', value: 'img' },
        { label: 'Buttons Only', value: '.wp-block-button' },
      ]}
    />
  </>
)}
```

---

### 3.3 Responsive Breakpoint Controls

**Device-Specific Overrides**:

```json
{
  "responsive": {
    "type": "object",
    "default": {
      "desktop": {},
      "tablet": {},
      "mobile": {}
    }
  }
}
```

**Per-Setting Responsive Control Component**:
```jsx
const ResponsiveControl = ({
  label,
  value,
  onChange,
  devices = ['desktop', 'tablet', 'mobile']
}) => {
  const [activeDevice, setActiveDevice] = useState('desktop');

  return (
    <div className="fps-responsive-control">
      <div className="fps-responsive-control__header">
        <span>{label}</span>
        <ButtonGroup>
          {devices.map(device => (
            <Button
              key={device}
              icon={deviceIcons[device]}
              isPressed={activeDevice === device}
              onClick={() => setActiveDevice(device)}
            />
          ))}
        </ButtonGroup>
      </div>
      <div className="fps-responsive-control__value">
        {/* Render appropriate control based on type */}
        <RangeControl
          value={value[activeDevice]}
          onChange={(newValue) => onChange({
            ...value,
            [activeDevice]: newValue
          })}
        />
      </div>
    </div>
  );
};
```

**CSS Output with Media Queries**:
```scss
.fps-slide {
  --fps-font-size: 4rem;

  @media (max-width: 1024px) {
    --fps-font-size: 3rem;
  }

  @media (max-width: 768px) {
    --fps-font-size: 2rem;
  }
}
```

---

### 3.4 Custom CSS Per Slide (Pro)

**New Attribute**:
```json
{
  "customCSS": {
    "type": "string",
    "default": ""
  }
}
```

**Inspector Panel**:
```jsx
<PanelBody title="Custom CSS" initialOpen={false}>
  <TextareaControl
    label="Custom CSS"
    value={customCSS}
    onChange={setCustomCSS}
    help="CSS will be scoped to this slide. Use .this to target the slide container."
    rows={10}
    className="fps-code-editor"
  />
  <Notice status="warning" isDismissible={false}>
    Custom CSS is a Pro feature.
  </Notice>
</PanelBody>
```

**Scoped CSS Output**:
```php
// In PHP render
$scoped_css = str_replace('.this', ".fps-slide-{$slide_id}", $custom_css);
echo "<style>{$scoped_css}</style>";
```

---

### 3.5 Shape Dividers

**Add decorative dividers between slides**:

```json
{
  "shapeDivider": {
    "type": "object",
    "default": {
      "top": { "enabled": false, "shape": "wave", "color": "#ffffff", "height": 100, "flip": false },
      "bottom": { "enabled": false, "shape": "wave", "color": "#ffffff", "height": 100, "flip": false }
    }
  }
}
```

**Shape Options**:
- wave, wave-rough, triangle, tilt, arrow, curve, zigzag, cloud

**SVG Shapes Library** (`src/components/shapes/`):
```javascript
export const shapes = {
  wave: (color, height) => `
    <svg viewBox="0 0 1200 ${height}" preserveAspectRatio="none">
      <path fill="${color}" d="M0,0 C300,${height} 600,0 900,${height/2} L1200,0 L1200,${height} L0,${height} Z"/>
    </svg>
  `,
  // ... other shapes
};
```

---

## Phase 4: Premium Templates & Marketplace (v1.5.0)

### 4.1 Pro Template Pack (20 Premium Templates)

**Premium Hero Templates**:
1. SaaS Product Launch (video bg + floating UI elements)
2. App Store Style (phone mockup + parallax)
3. Agency Bold (large typography + geometric shapes)
4. E-commerce Product (360 view placeholder + specs)
5. Event/Conference (countdown + speaker grid)

**Premium Content Templates**:
6. Feature Comparison (animated check/x marks)
7. Process Timeline (connected steps)
8. Team Grid (hover effects)
9. Portfolio Masonry (image grid)
10. Services Carousel (horizontal scroll within slide)

**Premium Social Proof**:
11. Video Testimonial (video player)
12. Case Study Deep-Dive (metrics + quote + logo)
13. Press Mentions (logo cloud + quotes)
14. Awards/Badges (animated reveal)

**Premium CTA**:
15. Interactive Pricing Calculator
16. Multi-Step Form
17. Booking/Calendar Integration
18. Download Gate (email capture)

**Industry-Specific**:
19. Real Estate Property Tour
20. Restaurant Menu Showcase

---

### 4.2 Template Customizer

**Live Preview with Variable Editing**:
```jsx
const TemplateCustomizer = ({ template, onApply }) => {
  const [variables, setVariables] = useState(template.defaultVariables);

  return (
    <Modal title="Customize Template">
      <div className="fps-template-customizer">
        <div className="fps-template-preview">
          <TemplatePreview template={template} variables={variables} />
        </div>
        <div className="fps-template-controls">
          <ColorControl
            label="Primary Color"
            value={variables.primaryColor}
            onChange={(color) => setVariables({...variables, primaryColor: color})}
          />
          <ColorControl
            label="Background Color"
            value={variables.backgroundColor}
            onChange={(color) => setVariables({...variables, backgroundColor: color})}
          />
          <FontFamilyControl
            label="Heading Font"
            value={variables.headingFont}
            onChange={(font) => setVariables({...variables, headingFont: font})}
          />
          {/* More variable controls */}
        </div>
      </div>
      <Button isPrimary onClick={() => onApply(variables)}>
        Apply Template
      </Button>
    </Modal>
  );
};
```

---

## Implementation Timeline

### Version Roadmap

| Version | Focus | Features | Target |
|---------|-------|----------|--------|
| **1.2.0** | Foundation | Security fix, Video BG, Overlay, Template refactor | Week 2-3 |
| **1.3.0** | Effects | Parallax, New effects, Text shadows | Week 4-5 |
| **1.4.0** | Pro Launch | Responsive, Stagger, Custom CSS, Dividers | Week 6-8 |
| **1.5.0** | Marketplace | Pro templates, Customizer | Week 9-12 |

---

## File Changes Summary

### New Files to Create

```
src/
├── components/
│   ├── VideoBackgroundControl.js
│   ├── OverlayControl.js
│   ├── TextShadowControl.js
│   ├── ResponsiveControl.js
│   ├── ShapeDividerControl.js
│   └── shapes/
│       └── index.js
├── templates/
│   ├── index.js
│   ├── categories.js
│   ├── singles/
│   │   ├── hero-centered.js
│   │   ├── hero-split-left.js
│   │   ├── hero-video.js
│   │   ├── features-3col.js
│   │   ├── testimonial-single.js
│   │   ├── cta-simple.js
│   │   └── ... (14 more)
│   └── bundles/
│       ├── landing-starter.js
│       └── portfolio-starter.js
└── pro/
    ├── index.js
    ├── licensing.js
    └── features/
        ├── scroll-animations.js
        ├── responsive-controls.js
        └── custom-css.js
```

### Files to Modify

```
src/blocks/slide/
├── block.json          # Add video, overlay, parallax, text effects attributes
├── edit.js             # Add new inspector panels
├── inspector.js        # Add new controls
├── save.js             # Render new elements
└── style.scss          # New CSS for effects

src/blocks/full-page-slider/
├── block.json          # Add parallax, effects attributes
├── edit.js             # Update template selector
├── view.js             # Enable parallax module, new effects
├── template-library.js # DEPRECATED - move to src/templates/
└── TemplateSelector.js # Refactor for categories, single templates

src/
├── Ajax.php            # Security fixes
└── AssetsLoader.php    # Load new modules
```

---

## Monetization Strategy

### Free vs Pro Feature Split

| Feature | Free | Pro |
|---------|------|-----|
| Slides per slider | 10 | Unlimited |
| Basic effects (slide, fade) | Yes | Yes |
| Advanced effects (cube, cards, creative) | - | Yes |
| Video backgrounds | 1 per slider | Unlimited |
| Parallax | Basic | Advanced with per-element |
| Content animations | 8 types | 16+ types |
| Animation stagger | - | Yes |
| Templates | 10 basic | 30+ premium |
| Overlay & blend modes | Yes | Yes |
| Text shadows | - | Yes |
| Gradient text | - | Yes |
| Shape dividers | - | Yes |
| Responsive controls | - | Yes |
| Custom CSS | - | Yes |
| Priority support | - | Yes |

### Pricing (via Freemius)

- **Free**: Basic features, community support
- **Personal**: $49/year (1 site)
- **Business**: $99/year (5 sites)
- **Agency**: $199/year (unlimited sites)

---

## Success Metrics

### Phase 1 Goals (Month 1-2)
- [ ] 100+ active installations
- [ ] 5+ five-star reviews
- [ ] Zero security vulnerabilities
- [ ] 10 single-page templates

### Phase 2 Goals (Month 3-4)
- [ ] 500+ active installations
- [ ] 10+ five-star reviews
- [ ] Parallax working smoothly
- [ ] Video backgrounds stable

### Phase 3 Goals (Month 5-6)
- [ ] 1,000+ active installations
- [ ] Pro version launched
- [ ] First 10 paying customers
- [ ] $500+ MRR

### Phase 4 Goals (Month 7-12)
- [ ] 5,000+ active installations
- [ ] 50+ paying customers
- [ ] $2,000+ MRR
- [ ] Template marketplace beta

---

## Technical Debt to Address

1. **Testing**: Add Jest tests for JS, PHPUnit for PHP
2. **TypeScript**: Consider migrating edit.js to TypeScript
3. **Performance**: Lazy load Swiper modules
4. **Accessibility**: ARIA labels, keyboard navigation
5. **Documentation**: JSDoc comments, user documentation

---

## Appendix: Apple.com Design Patterns to Replicate

### What Makes Apple Special

1. **Image Sequences**: Animate through 100+ frames on scroll
2. **Sticky Sections**: Content pins while background changes
3. **Large Typography**: Headlines that command attention
4. **Negative Space**: Generous whitespace
5. **Subtle Parallax**: Background moves slower than content
6. **Video Integration**: Seamless autoplay videos
7. **Micro-interactions**: Hover states, transitions
8. **Consistent Rhythm**: Predictable scroll behavior

### Realistic Features for Our Plugin

| Apple Feature | Our Implementation | Complexity |
|---------------|-------------------|------------|
| Image sequences | Swiper parallax + creative effects | Medium |
| Sticky sections | Native Swiper behavior | Built-in |
| Large typography | Font size controls + Google Fonts | Built-in |
| Negative space | Padding/margin controls | Built-in |
| Parallax | Swiper parallax module | Phase 2 |
| Video backgrounds | HTML5 video element | Phase 1 |
| Hover effects | CSS + limited JS | Phase 3 |
| Scroll rhythm | Speed + easing controls | Built-in |

---

## References

- [Swiper.js API - Parallax](https://swiperjs.com/swiper-api#parallax)
- [Apple.com Scroll Effects Analysis](https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/)
- [WordPress Video Autoplay Best Practices](https://github.com/WordPress/gutenberg/issues/69218)
- [Freemius WordPress Monetization](https://freemius.com/blog/wordpress-gutenberg-block-plugin-business/)
