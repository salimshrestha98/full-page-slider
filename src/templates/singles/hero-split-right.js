import { __ } from '@wordpress/i18n';

export const heroSplitRight = {
	id: 'hero-split-right',
	name: __('Hero - Split (Text Right)', 'full-page-slider'),
	description: __('50/50 layout with image on left and text on right', 'full-page-slider'),
	category: 'hero',
	tags: ['hero', 'split', 'image', 'landing'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="150" height="200" fill="#e5e5e5"/>
			<rect x="150" width="150" height="200" fill="#0f172a"/>
			<rect x="20" y="40" width="110" height="120" rx="8" fill="#ccc"/>
			<rect x="170" y="50" width="110" height="15" rx="7" fill="white"/>
			<rect x="170" y="80" width="90" height="8" rx="4" fill="white" opacity="0.7"/>
			<rect x="170" y="100" width="100" height="8" rx="4" fill="white" opacity="0.7"/>
			<rect x="170" y="130" width="70" height="25" rx="12" fill="#10b981"/>
		</svg>
	`)}`,

	template: [
		['full-page-slider/slide', {
			title: '',
			showTitle: false,
		}, [
			['core/columns', {
				style: {
					spacing: { padding: { top: '0', bottom: '0', left: '0', right: '0' }, blockGap: '0' },
				},
				isStackedOnMobile: true
			}, [
				['core/column', { width: '50%' }, [
					['core/cover', {
						url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=1000&fit=crop',
						dimRatio: 0,
						minHeight: 100,
						minHeightUnit: 'vh',
						style: { spacing: { padding: { top: '0', bottom: '0', left: '0', right: '0' } } }
					}, []]
				]],
				['core/column', { width: '50%' }, [
					['core/group', {
						layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' },
						style: {
							spacing: { padding: { top: '80px', bottom: '80px', left: '60px', right: '60px' } },
							dimensions: { minHeight: '100vh' },
							color: { background: '#0f172a' }
						}
					}, [
						['core/paragraph', {
							content: __('ABOUT US', 'full-page-slider'),
							style: {
								typography: { fontSize: '0.875rem', fontWeight: '600', letterSpacing: '0.1em' },
								color: { text: '#10b981' },
								spacing: { margin: { bottom: '16px' } }
							}
						}],
						['core/heading', {
							level: 1,
							content: __('Crafting Digital Excellence Since 2015', 'full-page-slider'),
							style: {
								typography: { fontSize: '2.75rem', fontWeight: '700', lineHeight: '1.2' },
								color: { text: '#ffffff' },
								spacing: { margin: { bottom: '24px' } }
							}
						}],
						['core/paragraph', {
							content: __('We are a team of passionate designers and developers dedicated to creating beautiful, functional websites that drive results for our clients.', 'full-page-slider'),
							style: {
								typography: { fontSize: '1.1rem', lineHeight: '1.7' },
								color: { text: 'rgba(255,255,255,0.7)' },
								spacing: { margin: { bottom: '32px' } }
							}
						}],
						['core/buttons', {}, [
							['core/button', {
								text: __('Learn Our Story', 'full-page-slider'),
								style: {
									color: { background: '#10b981', text: '#ffffff' },
									border: { radius: '8px' },
									spacing: { padding: { top: '16px', bottom: '16px', left: '28px', right: '28px' } },
									typography: { fontWeight: '600' }
								}
							}]
						]]
					]]
				]]
			]]
		]]
	]
};
