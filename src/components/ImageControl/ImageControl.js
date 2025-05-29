// ImageControl.js

import './style.scss';

import { Button, Flex, FlexBlock, FlexItem, Spinner } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';

import {__} from '@wordpress/i18n';

const ImageControl = ({
    label = null,
    value,
    onSelect,
    allowedTypes = ['image'],
    previewSize = 'thumbnail',
    ...mediaUploadProps
}) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (value?.id) {
            wp.media.attachment(value?.id).fetch().then((img) => setImage(img));
        } else {
            setImage(null);
        }
    }, [value]);

    const removeImage = () => {
        onSelect(null);
        setImage(null);
    };

	const placeholderImage = fullPageSliderL10n.pluginURL + '/assets/image/default-placeholder.jpg';

    return (
        <div className="full-page-slider-image-control">

			{label && (<label>{label}</label>)}

            <MediaUploadCheck>
                <Flex direction="column" gap="8px">
                    <FlexBlock>
						<div className='preview'>
							<img
								src={image ? (image.sizes?.[previewSize]?.url || image.url) : placeholderImage}
								alt={image ? image.alt : ''}
							/>
						</div>
                    </FlexBlock>

                    <Flex justify="start" gap="8px">
                        <MediaUpload
                            onSelect={(media) => {
                                onSelect(media);
                                setImage(media);
                            }}
                            allowedTypes={allowedTypes}
                            value={value?.id}
                            render={({ open }) => (
                                <Button
                                    variant="secondary"
                                    onClick={open}
                                    isSmall
                                >
                                    {image ? 'Change Image' : 'Add Image'}
                                </Button>
                            )}
                            {...mediaUploadProps}
                        />

                        {image && (
                            <Button
                                variant="secondary"
                                onClick={removeImage}
                                isSmall
                                isDestructive
                            >
                                {__('Remove', 'full-page-slider')}
                            </Button>
                        )}
                    </Flex>
                </Flex>
            </MediaUploadCheck>
        </div>
    );
};

export default ImageControl;
