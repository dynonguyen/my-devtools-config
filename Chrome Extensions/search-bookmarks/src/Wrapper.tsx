import { ThemeProvider, extendTheme } from '@mui/joy';
import React from 'react';

const Wrapper = (props: { children: React.ReactNode }) => {
	const theme = React.useMemo(() => extendTheme({ spacing: 4 }), []);

	return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Wrapper;
