import { __ } from '@wordpress/i18n';

export const teamGrid = {
	id: 'team-grid',
	name: __('Team - Grid', 'full-page-slider'),
	description: __('Introduce your team members in a grid layout', 'full-page-slider'),
	category: 'content',
	tags: ['team', 'about', 'people', 'grid'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#f8fafc"/>
			<circle cx="60" cy="80" r="30" fill="#e5e7eb"/>
			<circle cx="150" cy="80" r="30" fill="#e5e7eb"/>
			<circle cx="240" cy="80" r="30" fill="#e5e7eb"/>
			<rect x="30" y="120" width="60" height="10" rx="4" fill="#1a1a1a"/>
			<rect x="120" y="120" width="60" height="10" rx="4" fill="#1a1a1a"/>
			<rect x="210" y="120" width="60" height="10" rx="4" fill="#1a1a1a"/>
			<rect x="35" y="138" width="50" height="6" rx="3" fill="#9ca3af"/>
			<rect x="125" y="138" width="50" height="6" rx="3" fill="#9ca3af"/>
			<rect x="215" y="138" width="50" height="6" rx="3" fill="#9ca3af"/>
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
					color: { background: '#f8fafc' }
				}
			}, [
				['core/heading', {
					level: 2,
					content: __('Meet Our Team', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '2.5rem', fontWeight: '700' },
						color: { text: '#0f172a' },
						spacing: { margin: { bottom: '16px' } }
					}
				}],
				['core/paragraph', {
					content: __('The talented people behind our success', 'full-page-slider'),
					align: 'center',
					style: {
						typography: { fontSize: '1.25rem' },
						color: { text: '#64748b' },
						spacing: { margin: { bottom: '60px' } }
					}
				}],
				['core/columns', { style: { spacing: { blockGap: '32px' } } }, [
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '32px', bottom: '32px', left: '24px', right: '24px' } },
								border: { radius: '16px' },
								color: { background: '#ffffff' }
							},
							layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' }
						}, [
							['core/image', {
								url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
								alt: __('Team member', 'full-page-slider'),
								width: 120,
								height: 120,
								style: { border: { radius: '50%' } },
								align: 'center'
							}],
							['core/heading', {
								level: 3,
								content: __('Sarah Johnson', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.25rem', fontWeight: '600' },
									color: { text: '#0f172a' },
									spacing: { margin: { top: '16px', bottom: '4px' } }
								}
							}],
							['core/paragraph', {
								content: __('CEO & Founder', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '0.95rem' },
									color: { text: '#6366f1' }
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
							},
							layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' }
						}, [
							['core/image', {
								url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
								alt: __('Team member', 'full-page-slider'),
								width: 120,
								height: 120,
								style: { border: { radius: '50%' } },
								align: 'center'
							}],
							['core/heading', {
								level: 3,
								content: __('Michael Chen', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.25rem', fontWeight: '600' },
									color: { text: '#0f172a' },
									spacing: { margin: { top: '16px', bottom: '4px' } }
								}
							}],
							['core/paragraph', {
								content: __('Lead Developer', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '0.95rem' },
									color: { text: '#6366f1' }
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
							},
							layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' }
						}, [
							['core/image', {
								url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
								alt: __('Team member', 'full-page-slider'),
								width: 120,
								height: 120,
								style: { border: { radius: '50%' } },
								align: 'center'
							}],
							['core/heading', {
								level: 3,
								content: __('Emily Davis', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.25rem', fontWeight: '600' },
									color: { text: '#0f172a' },
									spacing: { margin: { top: '16px', bottom: '4px' } }
								}
							}],
							['core/paragraph', {
								content: __('Design Lead', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '0.95rem' },
									color: { text: '#6366f1' }
								}
							}]
						]]
					]]
				]]
			]]
		]]
	]
};
