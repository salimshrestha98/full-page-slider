import { __ } from '@wordpress/i18n';

export const testimonialGrid = {
	id: 'testimonial-grid',
	name: __('Testimonial - Grid', 'full-page-slider'),
	description: __('Multiple testimonials in a grid layout', 'full-page-slider'),
	category: 'social-proof',
	tags: ['testimonial', 'reviews', 'grid', 'social-proof'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#ffffff"/>
			<rect x="20" y="40" width="125" height="120" rx="12" fill="#f8fafc"/>
			<rect x="155" y="40" width="125" height="120" rx="12" fill="#f8fafc"/>
			<circle cx="55" cy="70" r="15" fill="#e5e7eb"/>
			<circle cx="190" cy="70" r="15" fill="#e5e7eb"/>
			<rect x="80" y="60" width="50" height="8" rx="4" fill="#1a1a1a"/>
			<rect x="215" y="60" width="50" height="8" rx="4" fill="#1a1a1a"/>
			<rect x="80" y="75" width="40" height="5" rx="2" fill="#9ca3af"/>
			<rect x="215" y="75" width="40" height="5" rx="2" fill="#9ca3af"/>
			<rect x="35" y="100" width="95" height="5" rx="2" fill="#6b7280"/>
			<rect x="170" y="100" width="95" height="5" rx="2" fill="#6b7280"/>
			<rect x="35" y="115" width="85" height="5" rx="2" fill="#6b7280"/>
			<rect x="170" y="115" width="85" height="5" rx="2" fill="#6b7280"/>
			<rect x="35" y="130" width="70" height="5" rx="2" fill="#6b7280"/>
			<rect x="170" y="130" width="70" height="5" rx="2" fill="#6b7280"/>
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
				['core/heading', {
					level: 2,
					content: __('What Our Customers Say', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '2.5rem', fontWeight: '700' },
						color: { text: '#0f172a' },
						spacing: { margin: { bottom: '48px' } }
					}
				}],
				['core/columns', { style: { spacing: { blockGap: '24px' } } }, [
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '32px', bottom: '32px', left: '28px', right: '28px' } },
								border: { radius: '16px' },
								color: { background: '#f8fafc' }
							}
						}, [
							['core/group', {
								layout: { type: 'flex', flexWrap: 'nowrap' },
								style: { spacing: { blockGap: '12px', margin: { bottom: '20px' } } }
							}, [
								['core/image', {
									url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
									alt: __('Customer', 'full-page-slider'),
									width: 48,
									height: 48,
									style: { border: { radius: '50%' } }
								}],
								['core/group', {
									layout: { type: 'flex', orientation: 'vertical' },
									style: { spacing: { blockGap: '2px' } }
								}, [
									['core/paragraph', {
										content: __('David Miller', 'full-page-slider'),
										style: {
											typography: { fontSize: '1rem', fontWeight: '600' },
											color: { text: '#0f172a' }
										}
									}],
									['core/paragraph', {
										content: __('Marketing Director', 'full-page-slider'),
										style: {
											typography: { fontSize: '0.875rem' },
											color: { text: '#64748b' }
										}
									}]
								]]
							]],
							['core/paragraph', {
								content: __('Absolutely incredible! This has saved our team countless hours and improved our productivity by 200%.', 'full-page-slider'),
								style: {
									typography: { fontSize: '1rem', lineHeight: '1.6' },
									color: { text: '#475569' }
								}
							}],
							['core/paragraph', {
								content: '★★★★★',
								style: {
									typography: { fontSize: '1rem' },
									color: { text: '#fbbf24' },
									spacing: { margin: { top: '16px' } }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '32px', bottom: '32px', left: '28px', right: '28px' } },
								border: { radius: '16px' },
								color: { background: '#f8fafc' }
							}
						}, [
							['core/group', {
								layout: { type: 'flex', flexWrap: 'nowrap' },
								style: { spacing: { blockGap: '12px', margin: { bottom: '20px' } } }
							}, [
								['core/image', {
									url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
									alt: __('Customer', 'full-page-slider'),
									width: 48,
									height: 48,
									style: { border: { radius: '50%' } }
								}],
								['core/group', {
									layout: { type: 'flex', orientation: 'vertical' },
									style: { spacing: { blockGap: '2px' } }
								}, [
									['core/paragraph', {
										content: __('Lisa Thompson', 'full-page-slider'),
										style: {
											typography: { fontSize: '1rem', fontWeight: '600' },
											color: { text: '#0f172a' }
										}
									}],
									['core/paragraph', {
										content: __('Startup Founder', 'full-page-slider'),
										style: {
											typography: { fontSize: '0.875rem' },
											color: { text: '#64748b' }
										}
									}]
								]]
							]],
							['core/paragraph', {
								content: __('The best investment we made for our startup. The support team is amazing and always ready to help.', 'full-page-slider'),
								style: {
									typography: { fontSize: '1rem', lineHeight: '1.6' },
									color: { text: '#475569' }
								}
							}],
							['core/paragraph', {
								content: '★★★★★',
								style: {
									typography: { fontSize: '1rem' },
									color: { text: '#fbbf24' },
									spacing: { margin: { top: '16px' } }
								}
							}]
						]]
					]]
				]]
			]]
		]]
	]
};
