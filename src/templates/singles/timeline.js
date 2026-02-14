import { __ } from '@wordpress/i18n';

export const timeline = {
	id: 'timeline',
	name: __('Timeline - Process Steps', 'full-page-slider'),
	description: __('Step-by-step process or timeline visualization', 'full-page-slider'),
	category: 'content',
	tags: ['timeline', 'process', 'steps', 'how-it-works'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#f8fafc"/>
			<line x1="60" y1="60" x2="60" y2="160" stroke="#e5e7eb" stroke-width="3"/>
			<circle cx="60" cy="60" r="15" fill="#667eea"/>
			<circle cx="60" cy="110" r="15" fill="#10b981"/>
			<circle cx="60" cy="160" r="15" fill="#f59e0b"/>
			<rect x="90" y="50" width="80" height="12" rx="4" fill="#1a1a1a"/>
			<rect x="90" y="68" width="150" height="6" rx="3" fill="#9ca3af"/>
			<rect x="90" y="100" width="80" height="12" rx="4" fill="#1a1a1a"/>
			<rect x="90" y="118" width="150" height="6" rx="3" fill="#9ca3af"/>
			<rect x="90" y="150" width="80" height="12" rx="4" fill="#1a1a1a"/>
			<rect x="90" y="168" width="150" height="6" rx="3" fill="#9ca3af"/>
		</svg>
	`)}`,

	template: [
		['full-page-slider/slide', {
			title: '',
			showTitle: false,
		}, [
			['core/group', {
				layout: { type: 'constrained', contentSize: '900px' },
				style: {
					spacing: { padding: { top: '80px', bottom: '80px', left: '40px', right: '40px' } },
					dimensions: { minHeight: '100vh' },
					color: { background: '#f8fafc' }
				}
			}, [
				['core/heading', {
					level: 2,
					content: __('How It Works', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '2.5rem', fontWeight: '700' },
						color: { text: '#0f172a' },
						spacing: { margin: { bottom: '16px' } }
					}
				}],
				['core/paragraph', {
					content: __('Get started in just three simple steps', 'full-page-slider'),
					align: 'center',
					style: {
						typography: { fontSize: '1.25rem' },
						color: { text: '#64748b' },
						spacing: { margin: { bottom: '60px' } }
					}
				}],
				['core/columns', { style: { spacing: { blockGap: '40px' } } }, [
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '32px', bottom: '32px', left: '24px', right: '24px' } },
								border: { radius: '16px' },
								color: { background: '#ffffff' }
							}
						}, [
							['core/paragraph', {
								content: '01',
								align: 'center',
								style: {
									typography: { fontSize: '2.5rem', fontWeight: '800' },
									color: { text: '#667eea' },
									spacing: { margin: { bottom: '16px' } }
								}
							}],
							['core/heading', {
								level: 3,
								content: __('Sign Up', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.25rem', fontWeight: '600' },
									color: { text: '#0f172a' },
									spacing: { margin: { bottom: '12px' } }
								}
							}],
							['core/paragraph', {
								content: __('Create your free account in less than 2 minutes. No credit card required.', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '0.95rem', lineHeight: '1.6' },
									color: { text: '#64748b' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '32px', bottom: '32px', left: '24px', right: '24px' } },
								border: { radius: '16px' },
								color: { background: '#ffffff' }
							}
						}, [
							['core/paragraph', {
								content: '02',
								align: 'center',
								style: {
									typography: { fontSize: '2.5rem', fontWeight: '800' },
									color: { text: '#10b981' },
									spacing: { margin: { bottom: '16px' } }
								}
							}],
							['core/heading', {
								level: 3,
								content: __('Configure', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.25rem', fontWeight: '600' },
									color: { text: '#0f172a' },
									spacing: { margin: { bottom: '12px' } }
								}
							}],
							['core/paragraph', {
								content: __('Customize your settings and connect your existing tools with our easy setup wizard.', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '0.95rem', lineHeight: '1.6' },
									color: { text: '#64748b' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '32px', bottom: '32px', left: '24px', right: '24px' } },
								border: { radius: '16px' },
								color: { background: '#ffffff' }
							}
						}, [
							['core/paragraph', {
								content: '03',
								align: 'center',
								style: {
									typography: { fontSize: '2.5rem', fontWeight: '800' },
									color: { text: '#f59e0b' },
									spacing: { margin: { bottom: '16px' } }
								}
							}],
							['core/heading', {
								level: 3,
								content: __('Launch', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.25rem', fontWeight: '600' },
									color: { text: '#0f172a' },
									spacing: { margin: { bottom: '12px' } }
								}
							}],
							['core/paragraph', {
								content: __('Go live and start seeing results immediately. Our team is here to help you succeed.', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '0.95rem', lineHeight: '1.6' },
									color: { text: '#64748b' }
								}
							}]
						]]
					]]
				]]
			]]
		]]
	]
};
