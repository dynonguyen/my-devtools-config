" ==== Format for handlebar file
function! FormatHandlebars()
	silent! exec 'setlocal filetype=html'
	silent! exec 'CocCommand prettier.formatFile'
	sleep 100m
	silent! exec 'setlocal filetype=html.handlebars'
endfunction

command! -nargs=* -bang FormatHandlebars call FormatHandlebars()
