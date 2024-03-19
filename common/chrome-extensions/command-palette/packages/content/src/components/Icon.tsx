import { Icon as Iconify } from '@iconify/react';
import { clsx } from 'clsx';
import { forwardRef } from 'preact/compat';

// -----------------------------
type IconifyProps = React.ComponentProps<typeof Iconify>;

type IconSize = 'tiny' | 'small' | 'medium' | 'large' | 'extra';

export type IconProps = IconifyProps & {
	className?: string;
	/** tiny - 16, small - 20, medium - 24, large - 28, extra - 32 (Default: medium) */
	size?: IconSize | number;
	color?:
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'info'
		| 'success'
		| 'warning'
		| 'error'
		| 'neutral'
		| 'grey-light'
		| 'grey'
		| 'grey-dark';
	clickable?: boolean;
	active?: boolean;
	activeIcon?: string;
	icon: string;
};

// -----------------------------
const sizeMapping: { [key in IconSize]: number } = {
	tiny: 16,
	small: 20,
	medium: 24,
	large: 28,
	extra: 32,
};

export const Icon = forwardRef<IconifyProps['ref'], IconProps>((props, ref) => {
	const {
		active,
		clickable,
		size = 'medium',
		color = 'grey-500',
		activeIcon,
		icon,
		...others
	} = props;

	const width =
		typeof size === 'number'
			? `${size}px !important`
			: `${sizeMapping[size as IconSize]}px`;

	return (
		<Iconify
			// @ts-ignore
			ref={ref}
			icon={active ? activeIcon || icon : icon}
			width={width}
			height={width}
			className={clsx('dcp-icon', clickable && 'dcp-icon--clickable')}
			color={`var(--${color})`}
			{...others}
		/>
	);
});

export default Icon;
