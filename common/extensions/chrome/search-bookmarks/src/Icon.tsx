// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Icon as Iconify } from '@iconify/react';
import { styled } from '@mui/joy';
import React from 'react';

// -----------------------------
type IconifyProps = React.ComponentProps<typeof Iconify>;

type IconSize = 'tiny' | 'small' | 'medium' | 'large' | 'extra';

export type IconProps = IconifyProps & {
	className?: string;
	/** tiny - 16, small - 20, medium - 24, large - 28, extra - 32 (Default: medium) */
	size?: IconSize | number;
	/** sx color (Default: grey.500) */
	color?: string;
	clickable?: boolean;
	active?: boolean;
	activeIcon?: string;
	icon: string;
};

// -----------------------------
const IconWithoutSx = React.forwardRef<IconifyProps['ref'], IconProps>(
	(props, ref) => {
		const { className, active, activeIcon, icon, ...others } = props;

		return (
			<Iconify
				ref={ref}
				icon={active ? activeIcon || icon : icon}
				className={className ? `${className} cads-icon` : ''}
				{...others}
			/>
		);
	},
);

const sizeMapping: { [key in IconSize]: number } = {
	tiny: 16,
	small: 20,
	medium: 24,
	large: 28,
	extra: 32,
};

// -----------------------------
export const Icon = styled(IconWithoutSx)(
	({ size = 'medium', clickable, color, theme }) => {
		const width =
			typeof size === 'number'
				? `${size}px !important`
				: `${sizeMapping[size]}px`;
		const colorSplit = color ? color.split('.') : [];

		return {
			width,
			height: width,
			transition: 'all 0.15s',
			...(color && {
				color: `${
					colorSplit.length > 1
						? theme.palette[colorSplit[0]]?.[colorSplit[1]]
						: color
				} !important`,
			}),
			...(clickable
				? { cursor: 'pointer', '&:hover': { filter: 'brightness(0.8)' } }
				: {}),
		};
	},
);

export default Icon;
