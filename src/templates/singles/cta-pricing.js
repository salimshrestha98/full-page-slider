import { __ } from '@wordpress/i18n';

export const ctaPricing = {
	id: 'cta-pricing',
	name: __('CTA - Pricing Cards', 'full-page-slider'),
	description: __('Pricing table with comparison tiers', 'full-page-slider'),
	category: 'cta',
	tags: ['cta', 'pricing', 'plans', 'comparison'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#f8fafc"/>
			<rect x="20" y="30" width="80" height="140" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
			<rect x="110" y="20" width="80" height="155" rx="12" fill="#667eea"/>
			<rect x="200" y="30" width="80" height="140" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1"/>
			<rect x="35" y="50" width="50" height="10" rx="4" fill="#1a1a1a"/>
			<rect x="125" y="40" width="50" height="10" rx="4" fill="white"/>
			<rect x="215" y="50" width="50" height="10" rx="4" fill="#1a1a1a"/>
			<rect x="35" y="80" width="50" height="20" rx="4" fill="#667eea"/>
			<rect x="125" y="70" width="50" height="20" rx="4" fill="white"/>
			<rect x="215" y="80" width="50" height="20" rx="4" fill="#667eea"/>
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
					content: __('Simple, Transparent Pricing', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '2.5rem', fontWeight: '700' },
						color: { text: '#0f172a' },
						spacing: { margin: { bottom: '16px' } }
					}
				}],
				['core/paragraph', {
					content: __('Choose the plan that fits your needs. All plans include a 14-day free trial.', 'full-page-slider'),
					align: 'center',
					style: {
						typography: { fontSize: '1.1rem' },
						color: { text: '#64748b' },
						spacing: { margin: { bottom: '48px' } }
					}
				}],
				['core/columns', { style: { spacing: { blockGap: '24px' } }, verticalAlignment: 'center' }, [
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '40px', bottom: '40px', left: '32px', right: '32px' } },
								border: { radius: '16px', width: '1px', color: '#e5e7eb' },
								color: { background: '#ffffff' }
							}
						}, [
							['core/heading', {
								level: 3,
								content: __('Starter', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.25rem', fontWeight: '600' },
									color: { text: '#0f172a' },
									spacing: { margin: { bottom: '16px' } }
								}
							}],
							['core/paragraph', {
								content: '$<strong>29</strong>/month',
								align: 'center',
								style: {
									typography: { fontSize: '2rem' },
									color: { text: '#0f172a' },
									spacing: { margin: { bottom: '24px' } }
								}
							}],
							['core/list', { style: { spacing: { blockGap: '12px' } } }, [
								['core/list-item', { content: __('Up to 5 projects', 'full-page-slider') }],
								['core/list-item', { content: __('Basic analytics', 'full-page-slider') }],
								['core/list-item', { content: __('Email support', 'full-page-slider') }]
							]],
							['core/buttons', { layout: { type: 'flex', justifyContent: 'center' }, style: { spacing: { margin: { top: '24px' } } } }, [
								['core/button', {
									text: __('Get Started', 'full-page-slider'),
									style: {
										color: { text: '#667eea' },
										border: { radius: '8px', width: '2px', color: '#667eea' },
										spacing: { padding: { top: '12px', bottom: '12px', left: '24px', right: '24px' } }
									},
									className: 'is-style-outline'
								}]
							]]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '48px', bottom: '48px', left: '32px', right: '32px' } },
								border: { radius: '16px' },
								color: { background: '#667eea' }
							}
						}, [
							['core/paragraph', {
								content: __('MOST POPULAR', 'full-page-slider'),
								align: 'center',
								style: {
									typography: { fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em' },
									color: { text: 'rgba(255,255,255,0.8)' },
									spacing: { margin: { bottom: '8px' } }
								}
							}],
							['core/heading', {
								level: 3,
								content: __('Professional', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.25rem', fontWeight: '600' },
									color: { text: '#ffffff' },
									spacing: { margin: { bottom: '16px' } }
								}
							}],
							['core/paragraph', {
								content: '$<strong>79</strong>/month',
								align: 'center',
								style: {
									typography: { fontSize: '2rem' },
									color: { text: '#ffffff' },
									spacing: { margin: { bottom: '24px' } }
								}
							}],
							['core/list', { style: { color: { text: '#ffffff' }, spacing: { blockGap: '12px' } } }, [
								['core/list-item', { content: __('Unlimited projects', 'full-page-slider') }],
								['core/list-item', { content: __('Advanced analytics', 'full-page-slider') }],
								['core/list-item', { content: __('Priority support', 'full-page-slider') }],
								['core/list-item', { content: __('Custom integrations', 'full-page-slider') }]
							]],
							['core/buttons', { layout: { type: 'flex', justifyContent: 'center' }, style: { spacing: { margin: { top: '24px' } } } }, [
								['core/button', {
									text: __('Get Started', 'full-page-slider'),
									style: {
										color: { background: '#ffffff', text: '#667eea' },
										border: { radius: '8px' },
										spacing: { padding: { top: '14px', bottom: '14px', left: '28px', right: '28px' } },
										typography: { fontWeight: '600' }
									}
								}]
							]]
						]]
					]],
					['core/column', {}, [
						['core/group', {
							style: {
								spacing: { padding: { top: '40px', bottom: '40px', left: '32px', right: '32px' } },
								border: { radius: '16px', width: '1px', color: '#e5e7eb' },
								color: { background: '#ffffff' }
							}
						}, [
							['core/heading', {
								level: 3,
								content: __('Enterprise', 'full-page-slider'),
								textAlign: 'center',
								style: {
									typography: { fontSize: '1.25rem', fontWeight: '600' },
									color: { text: '#0f172a' },
									spacing: { margin: { bottom: '16px' } }
								}
							}],
							['core/paragraph', {
								content: '$<strong>199</strong>/month',
								align: 'center',
								style: {
									typography: { fontSize: '2rem' },
									color: { text: '#0f172a' },
									spacing: { margin: { bottom: '24px' } }
								}
							}],
							['core/list', { style: { spacing: { blockGap: '12px' } } }, [
								['core/list-item', { content: __('Everything in Pro', 'full-page-slider') }],
								['core/list-item', { content: __('Dedicated manager', 'full-page-slider') }],
								['core/list-item', { content: __('SLA guarantee', 'full-page-slider') }]
							]],
							['core/buttons', { layout: { type: 'flex', justifyContent: 'center' }, style: { spacing: { margin: { top: '24px' } } } }, [
								['core/button', {
									text: __('Contact Sales', 'full-page-slider'),
									style: {
										color: { text: '#667eea' },
										border: { radius: '8px', width: '2px', color: '#667eea' },
										spacing: { padding: { top: '12px', bottom: '12px', left: '24px', right: '24px' } }
									},
									className: 'is-style-outline'
								}]
							]]
						]]
					]]
				]]
			]]
		]]
	]
};
