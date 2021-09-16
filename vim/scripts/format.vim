" ==== Format for handlebar file
function! FormatHandlebars()
	silent! exec 'bufdo setlocal filetype=html'
	silent! exec 'CocCommand prettier.formatFile'
	sleep 50m
	silent! exec 'bufdo setlocal filetype=html.handlebars'
endfunction

command! -nargs=* -bang FormatHandlebars call FormatHandlebars()
