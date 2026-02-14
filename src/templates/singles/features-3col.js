import { __ } from '@wordpress/i18n';

export const features3Col = {
	id: 'features-3col',
	name: __('Features - 3 Column Icons', 'full-page-slider'),
	description: __('Three column feature grid with icons', 'full-page-slider'),
	category: 'content',
	tags: ['features', 'icons', 'grid', 'services'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#ffffff"/>
			<rect x="50" y="20" width="200" height="15" rx="7" fill="#1a1a1a"/>
			<rect x="20" y="60" width="80" height="80" rx="8" fill="#f3f4f6"/>
			<rect x="110" y="60" width="80" height="80" rx="8" fill="#f3f4f6"/>
			<rect x="200" y="60" width="80" height="80" rx="8" fill="#f3f4f6"/>
			<circle cx="60" cy="85" r="15" fill="#667eea"/>
			<circle cx="150" cy="85" r="15" fill="#f59e0b"/>
			<circle cx="240" cy="85" r="15" fill="#10b981"/>
			<rect x="35" y="110" width="50" height="8" rx="4" fill="#1a1a1a"/>
			<rect x="125" y="110" width="50" height="8" rx="4" fill="#1a1a1a"/>
			<rect x="215" y="110" width="50" height="8" rx="4" fill="#1a1a1a"/>
			<rect x="30" y="125" width="60" height="5" rx="2" fill="#999"/>
			<rect x="120" y="125" width="60" height="5" rx="2" fill="#999"/>
			<rect x="210" y="125" width="60" height="5" rx="2" fill="#999"/>
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
					spacing: { padding: { top: '100px', bottom: '100px', left: '40px', right: '40px' } },
					dimensions: { minHeight: '100vh' },
					color: { background: '#ffffff' }
				}
			}, [
				['core/heading', {
					level: 2,
					content: __('Why Choose Us?', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '2.75rem', fontWeight: '700' },
						color: { text: '#1a1a1a' },
						spacing: { margin: { bottom: '16px' } }
					}
				}],
				['core/paragraph', {
					content: __('Everything you need to build amazing products, all in one place.', 'full-page-slider'),
					align: 'center',
					style: {
						typography: { fontSize: '1.25rem' },
						color: { text: '#6b7280' },
						spacing: { margin: { bottom: '60px' } }
					}
				}],
				['core/columns', { style: { spacing: { blockGap: '40px' } } }, [
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '40px', bottom: '40px', left: '32px', right: '32px' } },
								border: { radius: '16px' },
								color: { background: '#f8fafc' }
							}
						}, [
							['core/paragraph', {
								content: '⚡',
								align: 'center',
								style: { typography: { fontSize: '3rem' }, spacing: { margin: { bottom: '20px' } } }
							}],
							['core/heading', {
								level: 3,
								content: __('Lightning Fast', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '600' },
									color: { text: '#1a1a1a' },
									spacing: { margin: { bottom: '12px' } }
								}
							}],
							['core/paragraph', {
								content: __('Optimized for speed with cutting-edge technology that delivers results in milliseconds.', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '1rem', lineHeight: '1.6' },
									color: { text: '#6b7280' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '40px', bottom: '40px', left: '32px', right: '32px' } },
								border: { radius: '16px' },
								color: { background: '#f8fafc' }
							}
						}, [
							['core/paragraph', {
								content: '🔒',
								align: 'center',
								style: { typography: { fontSize: '3rem' }, spacing: { margin: { bottom: '20px' } } }
							}],
							['core/heading', {
								level: 3,
								content: __('Secure by Design', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '600' },
									color: { text: '#1a1a1a' },
									spacing: { margin: { bottom: '12px' } }
								}
							}],
							['core/paragraph', {
								content: __('Enterprise-grade security with end-to-end encryption to protect your data at all times.', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '1rem', lineHeight: '1.6' },
									color: { text: '#6b7280' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '40px', bottom: '40px', left: '32px', right: '32px' } },
								border: { radius: '16px' },
								color: { background: '#f8fafc' }
							}
						}, [
							['core/paragraph', {
								content: '🎯',
								align: 'center',
								style: { typography: { fontSize: '3rem' }, spacing: { margin: { bottom: '20px' } } }
							}],
							['core/heading', {
								level: 3,
								content: __('Easy to Use', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '600' },
									color: { text: '#1a1a1a' },
									spacing: { margin: { bottom: '12px' } }
								}
							}],
							['core/paragraph', {
								content: __('Intuitive interface designed for everyone. No technical skills required to get started.', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '1rem', lineHeight: '1.6' },
									color: { text: '#6b7280' }
								}
							}]
						]]
					]]
				]]
			]]
		]]
	]
};
