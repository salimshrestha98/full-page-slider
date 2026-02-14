import { __ } from '@wordpress/i18n';

export const logoCloud = {
	id: 'logo-cloud',
	name: __('Logo Cloud', 'full-page-slider'),
	description: __('Showcase partner or client logos', 'full-page-slider'),
	category: 'social-proof',
	tags: ['logos', 'clients', 'partners', 'trust'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#ffffff"/>
			<rect x="50" y="30" width="200" height="12" rx="4" fill="#1a1a1a"/>
			<rect x="30" y="70" width="60" height="30" rx="4" fill="#e5e7eb"/>
			<rect x="110" y="70" width="60" height="30" rx="4" fill="#e5e7eb"/>
			<rect x="190" y="70" width="60" height="30" rx="4" fill="#e5e7eb"/>
			<rect x="30" y="120" width="60" height="30" rx="4" fill="#e5e7eb"/>
			<rect x="110" y="120" width="60" height="30" rx="4" fill="#e5e7eb"/>
			<rect x="190" y="120" width="60" height="30" rx="4" fill="#e5e7eb"/>
		</svg>
	`)}`,

	template: [
		['full-page-slider/slide', {
			title: '',
			showTitle: false,
		}, [
			['core/group', {
				layout: { type: 'constrained', contentSize: '1000px' },
				style: {
					spacing: { padding: { top: '100px', bottom: '100px', left: '40px', right: '40px' } },
					dimensions: { minHeight: '100vh' },
					color: { background: '#ffffff' }
				}
			}, [
				['core/heading', {
					level: 2,
					content: __('Trusted by Leading Companies', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '2rem', fontWeight: '600' },
						color: { text: '#1e293b' },
						spacing: { margin: { bottom: '16px' } }
					}
				}],
				['core/paragraph', {
					content: __('Join thousands of companies already using our platform', 'full-page-slider'),
					align: 'center',
					style: {
						typography: { fontSize: '1.1rem' },
						color: { text: '#64748b' },
						spacing: { margin: { bottom: '60px' } }
					}
				}],
				['core/columns', { style: { spacing: { blockGap: '40px' } } }, [
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '24px', bottom: '24px', left: '32px', right: '32px' } },
								border: { radius: '8px', width: '1px', color: '#e5e7eb' }
							},
							layout: { type: 'flex', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('Acme Corp', 'full-page-slider'),
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '700' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '24px', bottom: '24px', left: '32px', right: '32px' } },
								border: { radius: '8px', width: '1px', color: '#e5e7eb' }
							},
							layout: { type: 'flex', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('TechFlow', 'full-page-slider'),
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '700' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '24px', bottom: '24px', left: '32px', right: '32px' } },
								border: { radius: '8px', width: '1px', color: '#e5e7eb' }
							},
							layout: { type: 'flex', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('CloudBase', 'full-page-slider'),
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '700' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '24px', bottom: '24px', left: '32px', right: '32px' } },
								border: { radius: '8px', width: '1px', color: '#e5e7eb' }
							},
							layout: { type: 'flex', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('DataSync', 'full-page-slider'),
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '700' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]]
				]],
				['core/columns', { style: { spacing: { blockGap: '40px', margin: { top: '24px' } } } }, [
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '24px', bottom: '24px', left: '32px', right: '32px' } },
								border: { radius: '8px', width: '1px', color: '#e5e7eb' }
							},
							layout: { type: 'flex', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('Innovate', 'full-page-slider'),
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '700' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '24px', bottom: '24px', left: '32px', right: '32px' } },
								border: { radius: '8px', width: '1px', color: '#e5e7eb' }
							},
							layout: { type: 'flex', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('Startup.io', 'full-page-slider'),
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '700' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '24px', bottom: '24px', left: '32px', right: '32px' } },
								border: { radius: '8px', width: '1px', color: '#e5e7eb' }
							},
							layout: { type: 'flex', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('Quantum', 'full-page-slider'),
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '700' },
									color: { text: '#94a3b8' }
								}
							}]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '24px', bottom: '24px', left: '32px', right: '32px' } },
								border: { radius: '8px', width: '1px', color: '#e5e7eb' }
							},
							layout: { type: 'flex', justifyContent: 'center' }
						}, [
							['core/paragraph', {
								content: __('Nexus AI', 'full-page-slider'),
								style: {
									typography: { fontSize: '1.5rem', fontWeight: '700' },
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
