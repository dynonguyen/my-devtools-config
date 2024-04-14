import { clsx } from 'clsx';

export type KbdProps = {
	icon?: string;
	text?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg';
};

const sizeMapping: Record<
	Required<KbdProps>['size'],
	{ padding: number; height: number }
> = {
	xs: { padding: 4, height: 16 },
	sm: { padding: 4, height: 20 },
	md: { padding: 8, height: 24 },
	lg: { padding: 8, height: 32 },
};

export const Kbd = (props: KbdProps) => {
	const { icon, text, size = 'md' } = props;

	return (
		<div
			class='flex-center rounded-1 bg-grey-300 dark:bg-neutral/50'
			style={sizeMapping[size]}
		>
			<span
				class={clsx(
					'w-4 h-4 text-grey-700 dark:text-grey-400 flex-center text-xs font-500',
					icon,
				)}
			>
				{text}
			</span>
		</div>
	);
};

export default Kbd;
