" ==== Format for handlebar file
function! FormatHandlebars()
	silent! exec 'setlocal filetype=html'
	silent! exec 'CocCommand prettier.formatFile'
	sleep 100m
	silent! exec 'setlocal filetype=html.handlebars'
endfunction

command! FormatHandlebars call FormatHandlebars()

" AutoPrefixer CSS
function! AutoPrefixer()
  call inputrestore()
  	silent exec "%! postcss --use autoprefixer --no-map " . escape(expand('%'), '%')
	silent exec "w!"
endfunction

command! AutoPrefixer call AutoPrefixer()
