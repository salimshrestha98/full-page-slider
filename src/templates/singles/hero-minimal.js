import { __ } from '@wordpress/i18n';

export const heroMinimal = {
	id: 'hero-minimal',
	name: __('Hero - Minimal', 'full-page-slider'),
	description: __('Clean, minimal hero with large typography', 'full-page-slider'),
	category: 'hero',
	tags: ['hero', 'minimal', 'clean', 'typography'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#fafafa"/>
			<rect x="30" y="70" width="240" height="25" rx="4" fill="#1a1a1a"/>
			<rect x="30" y="110" width="180" height="10" rx="4" fill="#666"/>
			<rect x="30" y="145" width="80" height="25" rx="4" fill="#1a1a1a"/>
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
					spacing: { padding: { top: '80px', bottom: '80px', left: '60px', right: '60px' } },
					dimensions: { minHeight: '100vh' },
					color: { background: '#fafafa' }
				}
			}, [
				['core/group', {
					layout: { type: 'constrained', contentSize: '900px' },
					style: { spacing: { blockGap: '32px' } }
				}, [
					['core/heading', {
						level: 1,
						content: __('Less is more.', 'full-page-slider'),
						style: {
							typography: { fontSize: '5rem', fontWeight: '700', lineHeight: '1.1' },
							color: { text: '#1a1a1a' }
						}
					}],
					['core/paragraph', {
						content: __('We believe in the power of simplicity. Our designs strip away the unnecessary to focus on what truly matters.', 'full-page-slider'),
						style: {
							typography: { fontSize: '1.5rem', lineHeight: '1.6' },
							color: { text: '#666666' }
						}
					}],
					['core/buttons', {}, [
						['core/button', {
							text: __('Explore', 'full-page-slider'),
							style: {
								color: { background: '#1a1a1a', text: '#ffffff' },
								border: { radius: '0' },
								spacing: { padding: { top: '18px', bottom: '18px', left: '40px', right: '40px' } },
								typography: { fontSize: '1rem', fontWeight: '500', letterSpacing: '0.05em' }
							}
						}]
					]]
				]]
			]]
		]]
	]
};
