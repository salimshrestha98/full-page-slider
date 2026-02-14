import { __ } from '@wordpress/i18n';

export const ctaSimple = {
	id: 'cta-simple',
	name: __('CTA - Simple', 'full-page-slider'),
	description: __('Clean call-to-action with heading and button', 'full-page-slider'),
	category: 'cta',
	tags: ['cta', 'call-to-action', 'conversion', 'simple'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#667eea"/>
					<stop offset="100%" stop-color="#764ba2"/>
				</linearGradient>
			</defs>
			<rect width="300" height="200" fill="url(#ctaGrad)"/>
			<rect x="50" y="60" width="200" height="20" rx="10" fill="white"/>
			<rect x="75" y="100" width="150" height="10" rx="5" fill="white" opacity="0.8"/>
			<rect x="100" y="140" width="100" height="30" rx="15" fill="white"/>
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
					color: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
				}
			}, [
				['core/group', {
					layout: { type: 'constrained', contentSize: '700px' },
					style: { spacing: { blockGap: '24px' } }
				}, [
					['core/heading', {
						level: 2,
						content: __('Ready to Get Started?', 'full-page-slider'),
						textAlign: 'center',
						style: {
							typography: { fontSize: '3rem', fontWeight: '800', lineHeight: '1.2' },
							color: { text: '#ffffff' }
						}
					}],
					['core/paragraph', {
						content: __('Join thousands of satisfied customers and take your business to the next level today.', 'full-page-slider'),
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
								color: { background: '#ffffff', text: '#667eea' },
								border: { radius: '50px' },
								spacing: { padding: { top: '18px', bottom: '18px', left: '36px', right: '36px' } },
								typography: { fontSize: '1.1rem', fontWeight: '600' }
							}
						}]
					]],
					['core/paragraph', {
						content: __('No credit card required. Cancel anytime.', 'full-page-slider'),
						align: 'center',
						style: {
							typography: { fontSize: '0.95rem' },
							color: { text: 'rgba(255,255,255,0.7)' },
							spacing: { margin: { top: '8px' } }
						}
					}]
				]]
			]]
		]]
	]
};
