import { __ } from '@wordpress/i18n';

export const statsNumbers = {
	id: 'stats-numbers',
	name: __('Stats - Big Numbers', 'full-page-slider'),
	description: __('Impressive statistics with large numbers and labels', 'full-page-slider'),
	category: 'content',
	tags: ['stats', 'numbers', 'metrics', 'data'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#0f172a"/>
			<text x="50" y="90" fill="#667eea" font-size="36" font-weight="bold">500+</text>
			<text x="50" y="115" fill="#94a3b8" font-size="12">Clients</text>
			<text x="150" y="90" fill="#10b981" font-size="36" font-weight="bold">99%</text>
			<text x="150" y="115" fill="#94a3b8" font-size="12">Uptime</text>
			<text x="240" y="90" fill="#f59e0b" font-size="36" font-weight="bold">24/7</text>
			<text x="240" y="115" fill="#94a3b8" font-size="12">Support</text>
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
					color: { background: '#0f172a' }
				}
			}, [
				['core/heading', {
					level: 2,
					content: __('Trusted by Industry Leaders', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '2.5rem', fontWeight: '700' },
						color: { text: '#ffffff' },
						spacing: { margin: { bottom: '16px' } }
					}
				}],
				['core/paragraph', {
					content: __('Our numbers speak for themselves', 'full-page-slider'),
					align: 'center',
					style: {
						typography: { fontSize: '1.25rem' },
						color: { text: '#94a3b8' },
						spacing: { margin: { bottom: '80px' } }
					}
				}],
				['core/columns', { style: { spacing: { blockGap: '40px' } } }, [
					['core/column', {}, [
						['core/group', {
							style: { spacing: { padding: { top: '32px', bottom: '32px' } } },
							layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('500+', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '4rem', fontWeight: '800' },
									color: { text: '#667eea' },
									spacing: { margin: { bottom: '8px' } }
								}
							}],
							['core/paragraph', {
								content: __('Happy Clients', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '1.1rem', fontWeight: '500' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: { spacing: { padding: { top: '32px', bottom: '32px' } } },
							layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('99.9%', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '4rem', fontWeight: '800' },
									color: { text: '#10b981' },
									spacing: { margin: { bottom: '8px' } }
								}
							}],
							['core/paragraph', {
								content: __('Uptime Guarantee', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '1.1rem', fontWeight: '500' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: { spacing: { padding: { top: '32px', bottom: '32px' } } },
							layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('24/7', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '4rem', fontWeight: '800' },
									color: { text: '#f59e0b' },
									spacing: { margin: { bottom: '8px' } }
								}
							}],
							['core/paragraph', {
								content: __('Expert Support', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '1.1rem', fontWeight: '500' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: { spacing: { padding: { top: '32px', bottom: '32px' } } },
							layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('$2M+', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '4rem', fontWeight: '800' },
									color: { text: '#ec4899' },
									spacing: { margin: { bottom: '8px' } }
								}
							}],
							['core/paragraph', {
								content: __('Revenue Generated', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '1.1rem', fontWeight: '500' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]]
				]]
			]]
		]]
	]
};
