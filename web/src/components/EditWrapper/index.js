import React, { Fragment } from 'react';
import { string, array, object, bool } from 'prop-types';
import classnames from 'classnames';
import { ReactSVG } from 'react-svg';
import { STATIC_ICONS } from 'config/icons';
import { convertToFormatted } from 'utils/string';

const defaultRender = (children) => <Fragment>{children}</Fragment>;

const EditWrapper = ({
	children,
	stringId,
	iconId,
	position,
	style,
	reverse,
	sectionId,
	backgroundId,
	render = defaultRender,
	strings,
}) => {
	const [x = 5, y = 0] = position;
	const triggerStyles = {
		transform: `translate(${x}px, ${y}px)`,
	};

	return (
		<div
			className={classnames('edit-wrapper__container', { reverse: reverse })}
			style={style}
		>
			{strings && Array.isArray(strings)
				? strings.map((string, index) => {
						if (Array.isArray(render) && typeof render[index] === 'function') {
							return render[index](convertToFormatted(string));
						} else if (typeof render === 'function') {
							return render(convertToFormatted(string));
						} else {
							return defaultRender(convertToFormatted(string));
						}
				  })
				: render(convertToFormatted(children))}
			<div className="edit-wrapper__icons-container" style={triggerStyles}>
				{stringId && (
					<div className="edit-wrapper__icon-wrapper" data-string-id={stringId}>
						<ReactSVG
							src={STATIC_ICONS['EDIT_STRING']}
							className="edit-wrapper__icon"
						/>
					</div>
				)}
				{iconId && (
					<div className="edit-wrapper__icon-wrapper" data-icon-id={iconId}>
						<ReactSVG
							src={STATIC_ICONS['OPERATOR_EDIT_ICON']}
							className="edit-wrapper__icon"
						/>
					</div>
				)}
				{sectionId && (
					<div
						className="edit-wrapper__icon-wrapper large"
						data-section-id={sectionId}
					>
						<ReactSVG
							src={STATIC_ICONS['EDIT_SECTION']}
							className="edit-wrapper__icon"
						/>
					</div>
				)}
				{backgroundId && (
					<div
						className="edit-wrapper__icon-wrapper"
						data-icon-id={backgroundId}
					>
						<ReactSVG
							src={STATIC_ICONS['EDIT_BACKGROUND']}
							className="edit-wrapper__icon"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

EditWrapper.propTypes = {
	stringId: string,
	iconId: string,
	position: array,
	style: object,
	reverse: bool,
};

EditWrapper.defaultProps = {
	stringId: '',
	iconId: '',
	position: [],
	style: {},
	reverse: false,
};

export default EditWrapper;
