import { __ } from '@wordpress/i18n';

export const heroVideo = {
	id: 'hero-video',
	name: __('Hero - Video Background', 'full-page-slider'),
	description: __('Full-screen hero with video background and overlay', 'full-page-slider'),
	category: 'hero',
	tags: ['hero', 'video', 'fullscreen', 'landing'],
	preview: `data:image/svg+xml;base64,${btoa(`
		<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="300" height="200" fill="#1a1a1a"/>
			<rect width="300" height="200" fill="black" opacity="0.5"/>
			<circle cx="150" cy="100" r="30" fill="white" opacity="0.3"/>
			<polygon points="145,85 145,115 170,100" fill="white"/>
			<rect x="50" y="150" width="200" height="15" rx="7" fill="white"/>
			<rect x="100" y="175" width="100" height="8" rx="4" fill="white" opacity="0.7"/>
		</svg>
	`)}`,

	template: [
		['full-page-slider/slide', {
			title: '',
			showTitle: false,
			backgroundVideo: {
				url: '',
				poster: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1920&h=1080&fit=crop',
				loop: true,
				muted: true
			},
			overlay: {
				enabled: true,
				color: 'rgba(0,0,0,0.5)',
				blendMode: 'normal'
			}
		}, [
			['core/group', {
				layout: { type: 'flex', orientation: 'vertical', justifyContent: 'center', verticalAlignment: 'center' },
				style: {
					spacing: { padding: { top: '80px', bottom: '80px', left: '40px', right: '40px' } },
					dimensions: { minHeight: '100vh' }
				}
			}, [
				['core/heading', {
					level: 1,
					content: __('Experience the Extraordinary', 'full-page-slider'),
					textAlign: 'center',
					style: {
						typography: { fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1' },
						color: { text: '#ffffff' },
						spacing: { margin: { bottom: '24px' } }
					}
				}],
				['core/paragraph', {
					content: __('Immerse yourself in our world of innovation and creativity. Watch the video to see what makes us different.', 'full-page-slider'),
					align: 'center',
					style: {
						typography: { fontSize: '1.25rem', lineHeight: '1.6' },
						color: { text: 'rgba(255,255,255,0.9)' },
						spacing: { margin: { bottom: '40px' } }
					}
				}],
				['core/buttons', { layout: { type: 'flex', justifyContent: 'center' } }, [
					['core/button', {
						text: __('Watch Video', 'full-page-slider'),
						style: {
							color: { background: 'transparent', text: '#ffffff' },
							border: { radius: '50px', width: '2px', color: '#ffffff' },
							spacing: { padding: { top: '16px', bottom: '16px', left: '32px', right: '32px' } },
							typography: { fontSize: '1.1rem', fontWeight: '600' }
						}
					}],
					['core/button', {
						text: __('Get Started', 'full-page-slider'),
						style: {
							color: { background: '#ffffff', text: '#1a1a1a' },
							border: { radius: '50px' },
							spacing: { padding: { top: '16px', bottom: '16px', left: '32px', right: '32px' } },
							typography: { fontSize: '1.1rem', fontWeight: '600' }
						}
					}]
				]]
			]]
		]]
	]
};
