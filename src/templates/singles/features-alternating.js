import { __ } from '@wordpress/i18n';

export const featuresAlternating = {
	id: 'features-alternating',
	name: __('Features - Alternating', 'full-page-slider'),
	description: __('Zig-zag layout with image and text alternating', 'full-page-slider'),
	category: 'content',
	tags: ['features', 'alternating', 'image', 'zigzag'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#ffffff"/>
			<rect x="20" y="20" width="120" height="70" rx="8" fill="#e5e7eb"/>
			<rect x="160" y="30" width="100" height="12" rx="4" fill="#1a1a1a"/>
			<rect x="160" y="50" width="120" height="6" rx="3" fill="#9ca3af"/>
			<rect x="160" y="65" width="90" height="6" rx="3" fill="#9ca3af"/>
			<rect x="160" y="110" width="120" height="70" rx="8" fill="#e5e7eb"/>
			<rect x="20" y="120" width="100" height="12" rx="4" fill="#1a1a1a"/>
			<rect x="20" y="140" width="120" height="6" rx="3" fill="#9ca3af"/>
			<rect x="20" y="155" width="90" height="6" rx="3" fill="#9ca3af"/>
		</svg>
	`)}`,

	template: [
		['full-page-slider/slide', {
			title: '',
			showTitle: false,
		}, [
			['core/group', {
				layout: { type: 'constrained', contentSize: '1100px' },
				style: {
					spacing: { padding: { top: '80px', bottom: '80px', left: '40px', right: '40px' } },
					dimensions: { minHeight: '100vh' },
					color: { background: '#ffffff' }
				}
			}, [
				['core/columns', {
					verticalAlignment: 'center',
					style: { spacing: { blockGap: '60px', margin: { bottom: '60px' } } }
				}, [
					['core/column', { width: '50%' }, [
						['core/image', {
							url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
							alt: __('Feature image', 'full-page-slider'),
							style: { border: { radius: '16px' } }
						}]
					]],
					['core/column', { width: '50%' }, [
						['core/paragraph', {
							content: __('FEATURE ONE', 'full-page-slider'),
							style: {
								typography: { fontSize: '0.875rem', fontWeight: '600', letterSpacing: '0.1em' },
								color: { text: '#6366f1' },
								spacing: { margin: { bottom: '8px' } }
							}
						}],
						['core/heading', {
							level: 3,
							content: __('Intuitive Interface Design', 'full-page-slider'),
							style: {
								typography: { fontSize: '2rem', fontWeight: '700' },
								color: { text: '#1a1a1a' },
								spacing: { margin: { bottom: '16px' } }
							}
						}],
						['core/paragraph', {
							content: __('Our user-centric design approach ensures that every interaction feels natural and intuitive. No learning curve required.', 'full-page-slider'),
							style: {
								typography: { fontSize: '1.1rem', lineHeight: '1.7' },
								color: { text: '#6b7280' }
							}
						}]
					]]
				]],
				['core/columns', {
					verticalAlignment: 'center',
					style: { spacing: { blockGap: '60px' } }
				}, [
					['core/column', { width: '50%' }, [
						['core/paragraph', {
							content: __('FEATURE TWO', 'full-page-slider'),
							style: {
								typography: { fontSize: '0.875rem', fontWeight: '600', letterSpacing: '0.1em' },
								color: { text: '#10b981' },
								spacing: { margin: { bottom: '8px' } }
							}
						}],
						['core/heading', {
							level: 3,
							content: __('Seamless Integration', 'full-page-slider'),
							style: {
								typography: { fontSize: '2rem', fontWeight: '700' },
								color: { text: '#1a1a1a' },
								spacing: { margin: { bottom: '16px' } }
							}
						}],
						['core/paragraph', {
							content: __('Connect with your favorite tools in seconds. We support 100+ integrations out of the box, with more added every month.', 'full-page-slider'),
							style: {
								typography: { fontSize: '1.1rem', lineHeight: '1.7' },
								color: { text: '#6b7280' }
							}
						}]
					]],
					['core/column', { width: '50%' }, [
						['core/image', {
							url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
							alt: __('Feature image', 'full-page-slider'),
							style: { border: { radius: '16px' } }
						}]
					]]
				]]
			]]
		]]
	]
};
