import { __ } from '@wordpress/i18n';

export const galleryGrid = {
	id: 'gallery-grid',
	name: __('Gallery - Image Grid', 'full-page-slider'),
	description: __('Showcase work or portfolio in a grid layout', 'full-page-slider'),
	category: 'content',
	tags: ['gallery', 'portfolio', 'images', 'grid'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#ffffff"/>
			<rect x="20" y="20" width="80" height="75" rx="8" fill="#e5e7eb"/>
			<rect x="110" y="20" width="80" height="75" rx="8" fill="#d1d5db"/>
			<rect x="200" y="20" width="80" height="75" rx="8" fill="#e5e7eb"/>
			<rect x="20" y="105" width="80" height="75" rx="8" fill="#d1d5db"/>
			<rect x="110" y="105" width="80" height="75" rx="8" fill="#e5e7eb"/>
			<rect x="200" y="105" width="80" height="75" rx="8" fill="#d1d5db"/>
		</svg>
	`)}`,

	template: [
		['full-page-slider/slide', {
			title: '',
			showTitle: false,
		}, [
			['core/group', {
				layout: { type: 'constrained', contentSize: '1200px' },
				style: {
					spacing: { padding: { top: '80px', bottom: '80px', left: '40px', right: '40px' } },
					dimensions: { minHeight: '100vh' },
					color: { background: '#ffffff' }
				}
			}, [
				['core/heading', {
					level: 2,
					content: __('Our Work', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '2.5rem', fontWeight: '700' },
						color: { text: '#1a1a1a' },
						spacing: { margin: { bottom: '16px' } }
					}
				}],
				['core/paragraph', {
					content: __('A selection of our recent projects', 'full-page-slider'),
					align: 'center',
					style: {
						typography: { fontSize: '1.25rem' },
						color: { text: '#6b7280' },
						spacing: { margin: { bottom: '48px' } }
					}
				}],
				['core/columns', { style: { spacing: { blockGap: '24px' } } }, [
					['core/column', {}, [
						['core/group', {
							style: {
								border: { radius: '12px' },
								overflow: 'hidden'
							}
						}, [
							['core/cover', {
								url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
								dimRatio: 40,
								minHeight: 250,
								gradient: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)'
							}, [
								['core/paragraph', {
									content: __('E-commerce Platform', 'full-page-slider'),
									style: {
										typography: { fontSize: '1.25rem', fontWeight: '600' },
										color: { text: '#ffffff' }
									}
								}]
							]]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								border: { radius: '12px' },
								overflow: 'hidden'
							}
						}, [
							['core/cover', {
								url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
								dimRatio: 40,
								minHeight: 250,
								gradient: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)'
							}, [
								['core/paragraph', {
									content: __('Brand Identity', 'full-page-slider'),
									style: {
										typography: { fontSize: '1.25rem', fontWeight: '600' },
										color: { text: '#ffffff' }
									}
								}]
							]]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								border: { radius: '12px' },
								overflow: 'hidden'
							}
						}, [
							['core/cover', {
								url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
								dimRatio: 40,
								minHeight: 250,
								gradient: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)'
							}, [
								['core/paragraph', {
									content: __('Mobile App', 'full-page-slider'),
									style: {
										typography: { fontSize: '1.25rem', fontWeight: '600' },
										color: { text: '#ffffff' }
									}
								}]
							]]
						]]
					]]
				]]
			]]
		]]
	]
};
