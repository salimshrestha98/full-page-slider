import { __ } from '@wordpress/i18n';

export const testimonialSingle = {
	id: 'testimonial-single',
	name: __('Testimonial - Single Large', 'full-page-slider'),
	description: __('Large featured testimonial with quote and photo', 'full-page-slider'),
	category: 'social-proof',
	tags: ['testimonial', 'quote', 'review', 'social-proof'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#f8fafc"/>
			<text x="50" y="50" fill="#667eea" font-size="40">"</text>
			<rect x="50" y="70" width="200" height="8" rx="4" fill="#1a1a1a"/>
			<rect x="50" y="90" width="180" height="8" rx="4" fill="#1a1a1a"/>
			<rect x="50" y="110" width="160" height="8" rx="4" fill="#1a1a1a"/>
			<circle cx="80" cy="155" r="20" fill="#e5e7eb"/>
			<rect x="110" y="145" width="80" height="8" rx="4" fill="#1a1a1a"/>
			<rect x="110" y="160" width="60" height="6" rx="3" fill="#9ca3af"/>
		</svg>
	`)}`,

	template: [
		['full-page-slider/slide', {
			title: '',
			showTitle: false,
		}, [
			['core/group', {
				layout: { type: 'constrained', contentSize: '800px' },
				style: {
					spacing: { padding: { top: '100px', bottom: '100px', left: '40px', right: '40px' } },
					dimensions: { minHeight: '100vh' },
					color: { background: '#f8fafc' }
				}
			}, [
				['core/paragraph', {
					content: '"',
					align: 'center',
					style: {
						typography: { fontSize: '6rem', fontWeight: '700', lineHeight: '1' },
						color: { text: '#667eea' },
						spacing: { margin: { bottom: '0' } }
					}
				}],
				['core/paragraph', {
					content: __('This product completely transformed our business operations. The results exceeded our expectations in every way possible. I would recommend it to anyone looking for a game-changing solution.', 'full-page-slider'),
					align: 'center',
					style: {
						typography: { fontSize: '1.75rem', lineHeight: '1.6', fontWeight: '500' },
						color: { text: '#1e293b' },
						spacing: { margin: { bottom: '40px' } }
					}
				}],
				['core/group', {
					layout: { type: 'flex', justifyContent: 'center', flexWrap: 'nowrap' },
					style: { spacing: { blockGap: '16px' } }
				}, [
					['core/image', {
						url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
						alt: __('Customer photo', 'full-page-slider'),
						width: 64,
						height: 64,
						style: { border: { radius: '50%' } }
					}],
					['core/group', {
						layout: { type: 'flex', orientation: 'vertical' },
						style: { spacing: { blockGap: '4px' } }
					}, [
						['core/paragraph', {
							content: __('Sarah Johnson', 'full-page-slider'),
							style: {
								typography: { fontSize: '1.1rem', fontWeight: '600' },
								color: { text: '#0f172a' }
							}
						}],
						['core/paragraph', {
							content: __('CEO, TechCorp Inc.', 'full-page-slider'),
							style: {
								typography: { fontSize: '0.95rem' },
								color: { text: '#64748b' }
							}
						}]
					]]
				]],
				['core/paragraph', {
					content: '★★★★★',
					align: 'center',
					style: {
						typography: { fontSize: '1.5rem' },
						color: { text: '#fbbf24' },
						spacing: { margin: { top: '24px' } }
					}
				}]
			]]
		]]
	]
};
