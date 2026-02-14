import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import {
	Button,
	Modal,
	__experimentalText as Text,
	__experimentalHeading as Heading,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { SINGLE_TEMPLATES, BUNDLE_TEMPLATES, TEMPLATE_CATEGORIES, buildBundleTemplate } from '../../templates';

export default function TemplateSelector({ clientId, activeSlideIndex = 0, onClose, onInsert }) {
	const [selectedTemplate, setSelectedTemplate] = useState(null);
	const [activeCategory, setActiveCategory] = useState('all');
	const [isInserting, setIsInserting] = useState(false);

	const { replaceInnerBlocks, insertBlock } = useDispatch(blockEditorStore);

	const { innerBlocksCount, activeSlideClientId } = useSelect((select) => {
		const { getBlock, getBlockOrder } = select(blockEditorStore);
		const block = getBlock(clientId);
		const slideOrder = getBlockOrder(clientId);
		return {
			innerBlocksCount: block?.innerBlocks?.length || 0,
			activeSlideClientId: slideOrder[activeSlideIndex] || null
		};
	}, [clientId, activeSlideIndex]);

	// Filter templates based on category
	const filteredTemplates = SINGLE_TEMPLATES.filter(template => {
		return activeCategory === 'all' || template.category === activeCategory;
	});

	const applyTemplate = (mode) => {
		if (!selectedTemplate || isInserting) return;

		setIsInserting(true);

		let templateData;

		// Check if it's a bundle or single template
		if (selectedTemplate.slides) {
			// It's a bundle - build from slide IDs
			templateData = buildBundleTemplate(selectedTemplate);
		} else {
			// It's a single template
			templateData = selectedTemplate.template;
		}

		// Create blocks from template
		const newBlocks = createBlocksFromInnerBlocksTemplate(templateData);

		// Calculate which slide to navigate to after insertion
		let targetSlideIndex;

		// Delay needed for DOM to update
		let delay = 150;

		if (mode === 'replace') {
			// Replace mode: replace only the active slide's content (inner blocks)
			// Templates create slide blocks, so we need to extract the inner content
			if (activeSlideClientId && newBlocks.length > 0) {
				// Get the inner blocks from the first template slide
				const templateSlide = newBlocks[0];
				const slideInnerBlocks = templateSlide.innerBlocks || [];
				// Replace the active slide's inner blocks with template content
				replaceInnerBlocks(activeSlideClientId, slideInnerBlocks);
			}
			// Stay on the current active slide
			targetSlideIndex = activeSlideIndex;
		} else {
			// Append new blocks one by one using insertBlock (same as addSlide button)
			newBlocks.forEach((block, index) => {
				insertBlock(block, innerBlocksCount + index, clientId, false);
			});
			// Navigate to the first newly added slide
			targetSlideIndex = innerBlocksCount;
		}

		// Notify parent to re-init swiper and navigate to new slide, then close
		setTimeout(() => {
			if (onInsert) onInsert(targetSlideIndex);
			onClose();
		}, delay);
	};

	// Handle double-click to quickly add template
	const handleDoubleClick = (template) => {
		if (isInserting) return;
		setIsInserting(true);

		let templateData;
		if (template.slides) {
			templateData = buildBundleTemplate(template);
		} else {
			templateData = template.template;
		}
		const newBlocks = createBlocksFromInnerBlocksTemplate(templateData);

		// Insert blocks one by one using insertBlock (same as addSlide button)
		newBlocks.forEach((block, index) => {
			insertBlock(block, innerBlocksCount + index, clientId, false);
		});

		// Navigate to the first newly added slide
		const targetSlideIndex = innerBlocksCount;

		setTimeout(() => {
			if (onInsert) onInsert(targetSlideIndex);
			onClose();
		}, 150);
	};

	// Custom title with action buttons
	const modalTitle = (
		<HStack alignment="center" style={{ width: '100%', justifyContent: 'space-between' }}>
			<span>{__('Template Library', 'full-page-slider')}</span>
			<HStack spacing={2}>
				<Button
					variant="secondary"
					onClick={() => applyTemplate('append')}
					disabled={!selectedTemplate || isInserting}
					size="compact"
				>
					{__('Add', 'full-page-slider')}
				</Button>
				<Button
					variant="primary"
					onClick={() => applyTemplate('replace')}
					disabled={!selectedTemplate || isInserting}
					isDestructive
					size="compact"
				>
					{__('Replace', 'full-page-slider')}
				</Button>
			</HStack>
		</HStack>
	);

	return (
		<Modal
			title={modalTitle}
			onRequestClose={onClose}
			className="fps-template-selector-modal"
			style={{ maxWidth: '1000px', width: '95vw' }}
			isFullScreen={false}
		>
			<VStack spacing={4}>
				{/* Category tabs */}
				<div style={{
					display: 'flex',
					gap: '8px',
					flexWrap: 'wrap',
					borderBottom: '1px solid #e5e7eb',
					paddingBottom: '12px',
				}}>
					{TEMPLATE_CATEGORIES.map((cat) => (
						<Button
							key={cat.id}
							variant={activeCategory === cat.id ? 'primary' : 'tertiary'}
							onClick={() => setActiveCategory(cat.id)}
							size="compact"
							style={{
								borderRadius: '20px',
								...(activeCategory === cat.id ? {} : { color: '#64748b' })
							}}
						>
							{cat.label}
						</Button>
					))}
					<Button
						variant={activeCategory === 'bundle' ? 'primary' : 'tertiary'}
						onClick={() => setActiveCategory('bundle')}
						size="compact"
						style={{
							borderRadius: '20px',
							...(activeCategory === 'bundle' ? {} : { color: '#64748b' })
						}}
					>
						{__('Starter Bundles', 'full-page-slider')}
					</Button>
				</div>

				{/* Template grid */}
				<div className="fps-template-grid" style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
					gap: '16px',
					maxHeight: '55vh',
					overflowY: 'auto',
					padding: '4px',
				}}>
					{activeCategory === 'bundle' ? (
						// Show bundles
						BUNDLE_TEMPLATES.map((template) => (
							<TemplateCard
								key={template.id}
								template={template}
								isSelected={selectedTemplate?.id === template.id}
								onClick={() => setSelectedTemplate(template)}
								onDoubleClick={() => handleDoubleClick(template)}
								isBundle={true}
							/>
						))
					) : (
						// Show single templates
						filteredTemplates.length > 0 ? (
							filteredTemplates.map((template) => (
								<TemplateCard
									key={template.id}
									template={template}
									isSelected={selectedTemplate?.id === template.id}
									onClick={() => setSelectedTemplate(template)}
									onDoubleClick={() => handleDoubleClick(template)}
								/>
							))
						) : (
							<div style={{
								gridColumn: '1 / -1',
								textAlign: 'center',
								padding: '40px',
								color: '#64748b'
							}}>
								{__('No templates found.', 'full-page-slider')}
							</div>
						)
					)}
				</div>

				{/* Help text */}
				<Text style={{ color: '#94a3b8', fontSize: '12px', textAlign: 'center' }}>
					{__('Select a template and click Add to insert a new slide, or Replace to replace all slides. Double-click to quickly add.', 'full-page-slider')}
				</Text>
			</VStack>
		</Modal>
	);
}

/**
 * Individual template card component
 */
function TemplateCard({ template, isSelected, onClick, onDoubleClick, isBundle = false }) {
	return (
		<div
			className={`fps-template-card ${isSelected ? 'selected' : ''}`}
			style={{
				border: isSelected ? '2px solid #667eea' : '1px solid #e5e7eb',
				borderRadius: '12px',
				padding: '12px',
				cursor: 'pointer',
				transition: 'all 0.15s ease',
				backgroundColor: isSelected ? '#f0f4ff' : '#fff',
				boxShadow: isSelected ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none',
			}}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			onMouseEnter={(e) => {
				if (!isSelected) {
					e.currentTarget.style.borderColor = '#cbd5e1';
					e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
				}
			}}
			onMouseLeave={(e) => {
				if (!isSelected) {
					e.currentTarget.style.borderColor = '#e5e7eb';
					e.currentTarget.style.boxShadow = 'none';
				}
			}}
		>
			<div style={{ marginBottom: '10px', position: 'relative' }}>
				<img
					src={template.preview}
					alt={template.name}
					style={{
						width: '100%',
						height: '100px',
						objectFit: 'cover',
						borderRadius: '8px',
						backgroundColor: '#f1f5f9',
					}}
				/>
				{isBundle && (
					<span style={{
						position: 'absolute',
						top: '8px',
						right: '8px',
						backgroundColor: '#667eea',
						color: '#fff',
						fontSize: '10px',
						fontWeight: '600',
						padding: '2px 8px',
						borderRadius: '10px',
						textTransform: 'uppercase',
					}}>
						{__('Bundle', 'full-page-slider')}
					</span>
				)}
			</div>

			<VStack spacing={1}>
				<Heading level={4} style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
					{template.name}
				</Heading>

				<Text style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
					{template.description}
				</Text>

				<div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
					{template.tags.slice(0, 3).map((tag) => (
						<span
							key={tag}
							style={{
								fontSize: '10px',
								padding: '2px 6px',
								backgroundColor: isSelected ? '#e0e7ff' : '#f1f5f9',
								borderRadius: '10px',
								color: isSelected ? '#4f46e5' : '#64748b',
							}}
						>
							{tag}
						</span>
					))}
				</div>
			</VStack>
		</div>
	);
}
