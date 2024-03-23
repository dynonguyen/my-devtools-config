import { ComponentChild } from 'preact';
import { Color } from '~/types/common.type';

type ChipProps = {
	color?: Color;
	label?: ComponentChild;
	icon?: ComponentChild;
};

export const Chip = (props: ChipProps) => {
	const { label, color, icon } = props;

	return (
		<div
			class='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium'
			style={{
				color: `rgb(var(--${color}))`,
				backgroundColor: `rgba(var(--${color}), 0.2)`,
			}}
		>
			{icon}
			{label}
		</div>
	);
};

export default Chip;
