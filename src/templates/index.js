/**
 * Template Registry
 *
 * Central registry for all Full Page Slider templates.
 * Templates are organized by category for easy browsing.
 */

import { __ } from '@wordpress/i18n';

// Import single-slide templates
import { heroCentered } from './singles/hero-centered';
import { heroSplitLeft } from './singles/hero-split-left';
import { heroSplitRight } from './singles/hero-split-right';
import { heroVideo } from './singles/hero-video';
import { heroGradient } from './singles/hero-gradient';
import { heroMinimal } from './singles/hero-minimal';
import { features3Col } from './singles/features-3col';
import { features2Col } from './singles/features-2col';
import { featuresAlternating } from './singles/features-alternating';
import { statsNumbers } from './singles/stats-numbers';
import { testimonialSingle } from './singles/testimonial-single';
import { testimonialGrid } from './singles/testimonial-grid';
import { logoCloud } from './singles/logo-cloud';
import { ctaSimple } from './singles/cta-simple';
import { ctaNewsletter } from './singles/cta-newsletter';
import { ctaPricing } from './singles/cta-pricing';
import { ctaContact } from './singles/cta-contact';
import { teamGrid } from './singles/team-grid';
import { timeline } from './singles/timeline';
import { galleryGrid } from './singles/gallery-grid';

/**
 * Template Categories
 */
export const TEMPLATE_CATEGORIES = [
	{
		id: 'all',
		label: __('All Templates', 'full-page-slider'),
		icon: 'grid-view',
	},
	{
		id: 'hero',
		label: __('Hero Sections', 'full-page-slider'),
		icon: 'star-filled',
		description: __('Eye-catching hero sections for landing pages', 'full-page-slider'),
	},
	{
		id: 'content',
		label: __('Content Sections', 'full-page-slider'),
		icon: 'text',
		description: __('Features, services, and content layouts', 'full-page-slider'),
	},
	{
		id: 'social-proof',
		label: __('Social Proof', 'full-page-slider'),
		icon: 'testimonial',
		description: __('Testimonials, reviews, and trust builders', 'full-page-slider'),
	},
	{
		id: 'cta',
		label: __('Call to Action', 'full-page-slider'),
		icon: 'megaphone',
		description: __('Conversion-focused sections', 'full-page-slider'),
	},
];

/**
 * All Single-Slide Templates
 */
export const SINGLE_TEMPLATES = [
	// Hero Templates
	heroCentered,
	heroSplitLeft,
	heroSplitRight,
	heroVideo,
	heroGradient,
	heroMinimal,

	// Content Templates
	features3Col,
	features2Col,
	featuresAlternating,
	statsNumbers,
	timeline,
	galleryGrid,
	teamGrid,

	// Social Proof Templates
	testimonialSingle,
	testimonialGrid,
	logoCloud,

	// CTA Templates
	ctaSimple,
	ctaNewsletter,
	ctaPricing,
	ctaContact,
];

/**
 * Starter Bundles (multi-slide quick starts)
 */
export const BUNDLE_TEMPLATES = [
	{
		id: 'landing-page-starter',
		name: __('Landing Page Starter', 'full-page-slider'),
		description: __('Complete landing page with hero, features, testimonial, and CTA', 'full-page-slider'),
		category: 'bundle',
		tags: ['landing', 'complete', 'starter'],
		slides: ['hero-centered', 'features-3col', 'testimonial-single', 'cta-simple'],
		preview: generateBundlePreview('#667eea', '#764ba2'),
	},
	{
		id: 'portfolio-starter',
		name: __('Portfolio Starter', 'full-page-slider'),
		description: __('Creative portfolio with intro, gallery, and contact', 'full-page-slider'),
		category: 'bundle',
		tags: ['portfolio', 'creative', 'starter'],
		slides: ['hero-split-left', 'gallery-grid', 'cta-contact'],
		preview: generateBundlePreview('#1a1a1a', '#333333'),
	},
	{
		id: 'saas-starter',
		name: __('SaaS Starter', 'full-page-slider'),
		description: __('SaaS product page with features, pricing, and signup', 'full-page-slider'),
		category: 'bundle',
		tags: ['saas', 'product', 'starter'],
		slides: ['hero-gradient', 'features-2col', 'cta-pricing', 'cta-newsletter'],
		preview: generateBundlePreview('#6366f1', '#8b5cf6'),
	},
];

/**
 * Generate a simple SVG preview for bundles
 */
function generateBundlePreview(color1, color2) {
	return `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="${color1}"/>
					<stop offset="100%" stop-color="${color2}"/>
				</linearGradient>
			</defs>
			<rect width="300" height="200" fill="url(#grad)"/>
			<rect x="20" y="20" width="60" height="40" rx="4" fill="white" opacity="0.3"/>
			<rect x="90" y="20" width="60" height="40" rx="4" fill="white" opacity="0.3"/>
			<rect x="160" y="20" width="60" height="40" rx="4" fill="white" opacity="0.3"/>
			<rect x="230" y="20" width="60" height="40" rx="4" fill="white" opacity="0.3"/>
			<rect x="50" y="80" width="200" height="20" rx="10" fill="white"/>
			<rect x="75" y="120" width="150" height="10" rx="5" fill="white" opacity="0.8"/>
			<rect x="100" y="150" width="100" height="30" rx="15" fill="white"/>
		</svg>
	`)}`;
}

/**
 * Get template by ID
 */
export function getTemplateById(id) {
	return SINGLE_TEMPLATES.find(t => t.id === id) || BUNDLE_TEMPLATES.find(t => t.id === id);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category) {
	if (category === 'all') {
		return SINGLE_TEMPLATES;
	}
	if (category === 'bundle') {
		return BUNDLE_TEMPLATES;
	}
	return SINGLE_TEMPLATES.filter(t => t.category === category);
}

/**
 * Build bundle template from slide IDs
 */
export function buildBundleTemplate(bundle) {
	const slides = [];
	for (const slideId of bundle.slides) {
		const template = SINGLE_TEMPLATES.find(t => t.id === slideId);
		if (template && template.template) {
			slides.push(...template.template);
		}
	}
	return slides;
}

export default SINGLE_TEMPLATES;
