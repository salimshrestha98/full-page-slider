import { __ } from '@wordpress/i18n';

export const ctaNewsletter = {
	id: 'cta-newsletter',
	name: __('CTA - Newsletter', 'full-page-slider'),
	description: __('Email capture section for newsletter signup', 'full-page-slider'),
	category: 'cta',
	tags: ['cta', 'newsletter', 'email', 'subscribe'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#0f172a"/>
			<rect x="50" y="50" width="200" height="15" rx="7" fill="white"/>
			<rect x="75" y="80" width="150" height="8" rx="4" fill="white" opacity="0.7"/>
			<rect x="50" y="120" width="140" height="35" rx="6" fill="#1e293b"/>
			<rect x="200" y="120" width="50" height="35" rx="6" fill="#667eea"/>
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
					color: { background: '#0f172a' }
				}
			}, [
				['core/group', {
					layout: { type: 'constrained', contentSize: '600px' },
					style: { spacing: { blockGap: '24px' } }
				}, [
					['core/heading', {
						level: 2,
						content: __('Stay in the Loop', 'full-page-slider'),
						textAlign: 'center',
						style: {
							typography: { fontSize: '2.5rem', fontWeight: '700' },
							color: { text: '#ffffff' }
						}
					}],
					['core/paragraph', {
						content: __('Subscribe to our newsletter and get the latest updates, tips, and exclusive offers delivered straight to your inbox.', 'full-page-slider'),
						align: 'center',
						style: {
							typography: { fontSize: '1.1rem', lineHeight: '1.6' },
							color: { text: '#94a3b8' }
						}
					}],
					['core/group', {
						layout: { type: 'flex', justifyContent: 'center', flexWrap: 'wrap' },
						style: { spacing: { blockGap: '12px', margin: { top: '16px' } } }
					}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '16px', bottom: '16px', left: '20px', right: '20px' } },
								border: { radius: '8px' },
								color: { background: '#1e293b' },
								layout: { selfStretch: 'fixed', flexSize: '300px' }
							}
						}, [
							['core/paragraph', {
								content: __('Enter your email address', 'full-page-slider'),
								style: {
									typography: { fontSize: '1rem' },
									color: { text: '#64748b' }
								}
							}]
						]],
						['core/buttons', {}, [
							['core/button', {
								text: __('Subscribe', 'full-page-slider'),
								style: {
									color: { background: '#667eea', text: '#ffffff' },
									border: { radius: '8px' },
									spacing: { padding: { top: '16px', bottom: '16px', left: '28px', right: '28px' } },
									typography: { fontWeight: '600' }
								}
							}]
						]]
					]],
					['core/paragraph', {
						content: __('We respect your privacy. Unsubscribe at any time.', 'full-page-slider'),
						align: 'center',
						style: {
							typography: { fontSize: '0.875rem' },
							color: { text: '#64748b' },
							spacing: { margin: { top: '16px' } }
						}
					}]
				]]
			]]
		]]
	]
};
