import { __ } from '@wordpress/i18n';

export const features2Col = {
	id: 'features-2col',
	name: __('Features - 2 Column Large', 'full-page-slider'),
	description: __('Two large feature blocks side by side', 'full-page-slider'),
	category: 'content',
	tags: ['features', 'two-column', 'cards', 'services'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#f8fafc"/>
			<rect x="20" y="30" width="125" height="140" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
			<rect x="155" y="30" width="125" height="140" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
			<rect x="35" y="50" width="40" height="40" rx="8" fill="#dbeafe"/>
			<rect x="170" y="50" width="40" height="40" rx="8" fill="#dcfce7"/>
			<rect x="35" y="105" width="80" height="10" rx="4" fill="#1a1a1a"/>
			<rect x="170" y="105" width="80" height="10" rx="4" fill="#1a1a1a"/>
			<rect x="35" y="125" width="95" height="6" rx="3" fill="#9ca3af"/>
			<rect x="170" y="125" width="95" height="6" rx="3" fill="#9ca3af"/>
			<rect x="35" y="140" width="70" height="6" rx="3" fill="#9ca3af"/>
			<rect x="170" y="140" width="70" height="6" rx="3" fill="#9ca3af"/>
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
					spacing: { padding: { top: '100px', bottom: '100px', left: '40px', right: '40px' } },
					dimensions: { minHeight: '100vh' },
					color: { background: '#f8fafc' }
				}
			}, [
				['core/heading', {
					level: 2,
					content: __('Powerful Features', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '2.5rem', fontWeight: '700' },
						color: { text: '#0f172a' },
						spacing: { margin: { bottom: '60px' } }
					}
				}],
				['core/columns', { style: { spacing: { blockGap: '32px' } } }, [
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '48px', bottom: '48px', left: '40px', right: '40px' } },
								border: { radius: '20px' },
								color: { background: '#ffffff' }
							}
						}, [
							['core/group', {
								style: {
									spacing: { padding: { top: '16px', bottom: '16px', left: '16px', right: '16px' }, margin: { bottom: '24px' } },
									border: { radius: '12px' },
									color: { background: '#dbeafe' },
									layout: { selfStretch: 'fixed', flexSize: '64px' }
								}
							}, [
								['core/paragraph', {
									content: '📊',
									style: { typography: { fontSize: '2rem' } }
								}]
							]],
							['core/heading', {
								level: 3,
								content: __('Advanced Analytics', 'full-page-slider'),
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '600' },
									color: { text: '#0f172a' },
									spacing: { margin: { bottom: '16px' } }
								}
							}],
							['core/paragraph', {
								content: __('Get deep insights into your data with our powerful analytics dashboard. Track key metrics, visualize trends, and make data-driven decisions with confidence.', 'full-page-slider'),
								style: {
									typography: { fontSize: '1rem', lineHeight: '1.7' },
									color: { text: '#64748b' }
								}
							}],
							['core/list', { style: { spacing: { margin: { top: '24px' } } } }, [
								['core/list-item', { content: __('Real-time data tracking', 'full-page-slider') }],
								['core/list-item', { content: __('Custom report builder', 'full-page-slider') }],
								['core/list-item', { content: __('Export to PDF/Excel', 'full-page-slider') }]
							]]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '48px', bottom: '48px', left: '40px', right: '40px' } },
								border: { radius: '20px' },
								color: { background: '#ffffff' }
							}
						}, [
							['core/group', {
								style: {
									spacing: { padding: { top: '16px', bottom: '16px', left: '16px', right: '16px' }, margin: { bottom: '24px' } },
									border: { radius: '12px' },
									color: { background: '#dcfce7' },
									layout: { selfStretch: 'fixed', flexSize: '64px' }
								}
							}, [
								['core/paragraph', {
									content: '🤝',
									style: { typography: { fontSize: '2rem' } }
								}]
							]],
							['core/heading', {
								level: 3,
								content: __('Team Collaboration', 'full-page-slider'),
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '600' },
									color: { text: '#0f172a' },
									spacing: { margin: { bottom: '16px' } }
								}
							}],
							['core/paragraph', {
								content: __('Work together seamlessly with your team. Share projects, leave comments, and track progress in real-time. Collaboration has never been easier.', 'full-page-slider'),
								style: {
									typography: { fontSize: '1rem', lineHeight: '1.7' },
									color: { text: '#64748b' }
								}
							}],
							['core/list', { style: { spacing: { margin: { top: '24px' } } } }, [
								['core/list-item', { content: __('Unlimited team members', 'full-page-slider') }],
								['core/list-item', { content: __('Real-time chat & comments', 'full-page-slider') }],
								['core/list-item', { content: __('Role-based permissions', 'full-page-slider') }]
							]]
						]]
					]]
				]]
			]]
		]]
	]
};
