import { __ } from '@wordpress/i18n';

export const ctaContact = {
	id: 'cta-contact',
	name: __('CTA - Contact Split', 'full-page-slider'),
	description: __('Contact section with info and form placeholder', 'full-page-slider'),
	category: 'cta',
	tags: ['cta', 'contact', 'form', 'split'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="150" height="200" fill="#0f172a"/>
			<rect x="150" width="150" height="200" fill="#ffffff"/>
			<rect x="20" y="40" width="100" height="15" rx="7" fill="white"/>
			<rect x="20" y="70" width="80" height="8" rx="4" fill="white" opacity="0.7"/>
			<rect x="20" y="100" width="110" height="8" rx="4" fill="white" opacity="0.5"/>
			<rect x="20" y="120" width="110" height="8" rx="4" fill="white" opacity="0.5"/>
			<rect x="170" y="40" width="110" height="30" rx="6" fill="#f1f5f9"/>
			<rect x="170" y="80" width="110" height="30" rx="6" fill="#f1f5f9"/>
			<rect x="170" y="120" width="110" height="50" rx="6" fill="#f1f5f9"/>
		</svg>
	`)}`,

	template: [
		['full-page-slider/slide', {
			title: '',
			showTitle: false,
		}, [
			['core/columns', {
				style: { spacing: { blockGap: '0' } },
				isStackedOnMobile: true
			}, [
				['core/column', { width: '45%' }, [
					['core/group', {
						layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' },
						style: {
							spacing: { padding: { top: '80px', bottom: '80px', left: '60px', right: '60px' } },
							dimensions: { minHeight: '100vh' },
							color: { background: '#0f172a' }
						}
					}, [
						['core/heading', {
							level: 2,
							content: __("Let's Talk", 'full-page-slider'),
							style: {
								typography: { fontSize: '2.5rem', fontWeight: '700' },
								color: { text: '#ffffff' },
								spacing: { margin: { bottom: '24px' } }
							}
						}],
						['core/paragraph', {
							content: __("Have a project in mind? We'd love to hear about it. Get in touch and let's create something amazing together.", 'full-page-slider'),
							style: {
								typography: { fontSize: '1.1rem', lineHeight: '1.7' },
								color: { text: '#94a3b8' },
								spacing: { margin: { bottom: '40px' } }
							}
						}],
						['core/group', { style: { spacing: { blockGap: '20px' } } }, [
							['core/group', {
								layout: { type: 'flex', flexWrap: 'nowrap' },
								style: { spacing: { blockGap: '12px' } }
							}, [
								['core/paragraph', {
									content: '📧',
									style: { typography: { fontSize: '1.25rem' } }
								}],
								['core/paragraph', {
									content: __('hello@company.com', 'full-page-slider'),
									style: {
										typography: { fontSize: '1rem' },
										color: { text: '#ffffff' }
									}
								}]
							]],
							['core/group', {
								layout: { type: 'flex', flexWrap: 'nowrap' },
								style: { spacing: { blockGap: '12px' } }
							}, [
								['core/paragraph', {
									content: '📱',
									style: { typography: { fontSize: '1.25rem' } }
								}],
								['core/paragraph', {
									content: __('+1 (555) 123-4567', 'full-page-slider'),
									style: {
										typography: { fontSize: '1rem' },
										color: { text: '#ffffff' }
									}
								}]
							]],
							['core/group', {
								layout: { type: 'flex', flexWrap: 'nowrap' },
								style: { spacing: { blockGap: '12px' } }
							}, [
								['core/paragraph', {
									content: '📍',
									style: { typography: { fontSize: '1.25rem' } }
								}],
								['core/paragraph', {
									content: __('123 Business Street, New York, NY 10001', 'full-page-slider'),
									style: {
										typography: { fontSize: '1rem' },
										color: { text: '#ffffff' }
									}
								}]
							]]
						]]
					]]
				]],
				['core/column', { width: '55%' }, [
					['core/group', {
						layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center' },
						style: {
							spacing: { padding: { top: '80px', bottom: '80px', left: '60px', right: '60px' } },
							dimensions: { minHeight: '100vh' },
							color: { background: '#ffffff' }
						}
					}, [
						['core/heading', {
							level: 3,
							content: __('Send us a message', 'full-page-slider'),
							style: {
								typography: { fontSize: '1.5rem', fontWeight: '600' },
								color: { text: '#0f172a' },
								spacing: { margin: { bottom: '32px' } }
							}
						}],
						['core/group', { style: { spacing: { blockGap: '20px' } } }, [
							['core/group', {
								style: {
									spacing: { padding: { top: '16px', bottom: '16px', left: '20px', right: '20px' } },
									border: { radius: '8px' },
									color: { background: '#f1f5f9' }
								}
							}, [
								['core/paragraph', {
									content: __('Your name', 'full-page-slider'),
									style: { color: { text: '#64748b' } }
								}]
							]],
							['core/group', {
								style: {
									spacing: { padding: { top: '16px', bottom: '16px', left: '20px', right: '20px' } },
									border: { radius: '8px' },
									color: { background: '#f1f5f9' }
								}
							}, [
								['core/paragraph', {
									content: __('Your email', 'full-page-slider'),
									style: { color: { text: '#64748b' } }
								}]
							]],
							['core/group', {
								style: {
									spacing: { padding: { top: '16px', bottom: '16px', left: '20px', right: '20px' } },
									border: { radius: '8px' },
									color: { background: '#f1f5f9' },
									dimensions: { minHeight: '120px' }
								}
							}, [
								['core/paragraph', {
									content: __('Your message...', 'full-page-slider'),
									style: { color: { text: '#64748b' } }
								}]
							]],
							['core/buttons', { style: { spacing: { margin: { top: '8px' } } } }, [
								['core/button', {
									text: __('Send Message', 'full-page-slider'),
									style: {
										color: { background: '#0f172a', text: '#ffffff' },
										border: { radius: '8px' },
										spacing: { padding: { top: '16px', bottom: '16px', left: '32px', right: '32px' } },
										typography: { fontWeight: '600' }
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
