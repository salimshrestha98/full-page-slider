import { __ } from '@wordpress/i18n';

export const heroGradient = {
	id: 'hero-gradient',
	name: __('Hero - Gradient Wave', 'full-page-slider'),
	description: __('Modern gradient background with animated wave effect', 'full-page-slider'),
	category: 'hero',
	tags: ['hero', 'gradient', 'modern', 'saas'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#6366f1"/>
					<stop offset="100%" stop-color="#a855f7"/>
				</linearGradient>
			</defs>
			<rect width="300" height="200" fill="url(#grad1)"/>
			<path d="M0 150 Q75 130 150 150 T300 150 L300 200 L0 200 Z" fill="white" opacity="0.1"/>
			<rect x="50" y="50" width="200" height="20" rx="10" fill="white"/>
			<rect x="75" y="90" width="150" height="10" rx="5" fill="white" opacity="0.8"/>
			<rect x="100" y="120" width="100" height="30" rx="15" fill="white"/>
		</svg>
	`)}`,

	template: [
		['full-page-slider/slide', {
			title: '',
			showTitle: false,
		}, [
			['core/group', {
				layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' },
				style: {
					spacing: { padding: { top: '100px', bottom: '100px', left: '40px', right: '40px' } },
					dimensions: { minHeight: '100vh' },
					color: { background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)' }
				}
			}, [
				['core/group', {
					layout: { type: 'constrained', contentSize: '800px' },
					style: { spacing: { blockGap: '24px' } }
				}, [
					['core/paragraph', {
						content: __('INTRODUCING', 'full-page-slider'),
						align: 'center',
						style: {
							typography: { fontSize: '0.875rem', fontWeight: '600', letterSpacing: '0.2em' },
							color: { text: 'rgba(255,255,255,0.8)' }
						}
					}],
					['core/heading', {
						level: 1,
						content: __('The Future of Digital Products', 'full-page-slider'),
						textAlign: 'center',
						style: {
							typography: { fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1' },
							color: { text: '#ffffff' }
						}
					}],
					['core/paragraph', {
						content: __('Build, launch, and scale your SaaS product with our all-in-one platform. Join thousands of successful founders.', 'full-page-slider'),
						align: 'center',
						style: {
							typography: { fontSize: '1.25rem', lineHeight: '1.6' },
							color: { text: 'rgba(255,255,255,0.9)' }
						}
					}],
					['core/buttons', { layout: { type: 'flex', justifyContent: 'center' } }, [
						['core/button', {
							text: __('Start Free Trial', 'full-page-slider'),
							style: {
								color: { background: '#ffffff', text: '#6366f1' },
								border: { radius: '8px' },
								spacing: { padding: { top: '18px', bottom: '18px', left: '32px', right: '32px' } },
								typography: { fontSize: '1rem', fontWeight: '600' }
							}
						}],
						['core/button', {
							text: __('See Demo', 'full-page-slider'),
							style: {
								color: { text: '#ffffff' },
								border: { radius: '8px', width: '2px', color: 'rgba(255,255,255,0.5)' },
								spacing: { padding: { top: '16px', bottom: '16px', left: '30px', right: '30px' } },
								typography: { fontSize: '1rem', fontWeight: '600' }
							},
							className: 'is-style-outline'
						}]
					]],
					['core/paragraph', {
						content: __('No credit card required. 14-day free trial.', 'full-page-slider'),
						align: 'center',
						style: {
							typography: { fontSize: '0.875rem' },
							color: { text: 'rgba(255,255,255,0.7)' },
							spacing: { margin: { top: '16px' } }
						}
					}]
				]]
			]]
		]]
	]
};
