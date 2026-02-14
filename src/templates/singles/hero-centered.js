import { __ } from '@wordpress/i18n';

export const heroCentered = {
	id: 'hero-centered',
	name: __('Hero - Centered CTA', 'full-page-slider'),
	description: __('Classic centered hero with headline, subtext and CTA button', 'full-page-slider'),
	category: 'hero',
	tags: ['hero', 'cta', 'centered', 'landing'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#667eea"/>
			<rect x="50" y="60" width="200" height="20" rx="10" fill="white"/>
			<rect x="75" y="100" width="150" height="10" rx="5" fill="white" opacity="0.8"/>
			<rect x="100" y="130" width="100" height="30" rx="15" fill="white"/>
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
					spacing: { padding: { top: '80px', bottom: '80px', left: '40px', right: '40px' } },
					dimensions: { minHeight: '100vh' },
					color: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
				}
			}, [
				['core/heading', {
					level: 1,
					content: __('Build Something Amazing', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '4rem', fontWeight: '800', lineHeight: '1.1' },
						color: { text: '#ffffff' },
						spacing: { margin: { bottom: '24px' } }
					}
				}],
				['core/paragraph', {
					content: __('Create stunning full-page experiences with just a few clicks. No coding required.', 'full-page-slider'),
					align: 'center',
					style: {
						typography: { fontSize: '1.25rem', lineHeight: '1.6' },
						color: { text: 'rgba(255,255,255,0.9)' },
						spacing: { margin: { bottom: '40px' } },
						layout: { selfStretch: 'fixed', flexSize: '600px' }
					}
				}],
				['core/buttons', { layout: { type: 'flex', justifyContent: 'center' } }, [
					['core/button', {
						text: __('Get Started', 'full-page-slider'),
						style: {
							color: { background: '#ffffff', text: '#667eea' },
							border: { radius: '50px' },
							spacing: { padding: { top: '16px', bottom: '16px', left: '32px', right: '32px' } },
							typography: { fontSize: '1.1rem', fontWeight: '600' }
						}
					}],
					['core/button', {
						text: __('Learn More', 'full-page-slider'),
						style: {
							color: { text: '#ffffff' },
							border: { radius: '50px', width: '2px', color: '#ffffff' },
							spacing: { padding: { top: '14px', bottom: '14px', left: '30px', right: '30px' } },
							typography: { fontSize: '1.1rem', fontWeight: '600' }
						},
						className: 'is-style-outline'
					}]
				]]
			]]
		]]
	]
};
