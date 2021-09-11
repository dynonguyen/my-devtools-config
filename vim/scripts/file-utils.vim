" ==== Create a file
function! NewFile(fp)
	let l:name = a:fp
  silent! exec 'e ' . l:name
	silent! exec 'w'
	silent! exec 'NERDTreeRefreshRoot'
	echo ''
endfunction

command! -nargs=* -complete=file -bang NewFile call NewFile(<q-args>)

" ==== Create a folder
function! NewFolder(fp)
	let l:name = a:fp
	silent! exec '! md ' . l:name
	silent! exec 'NERDTreeRefreshRoot'
	echo ''
endfunction

command! -nargs=* -complete=file -bang NewFolder call NewFolder(<q-args>)

" ==== Delete file to my trash
function! DeleteFile()
		let olddir = expand('%:p')
    let name = expand('%:t')
		let l:bfnr = bufnr('%')

		silent! exec l:bfnr . 'bd!'
    silent! exec 'save! ' . ' C:/my-trash/' . name . ' | bd!'
    call delete(l:olddir)
		silent! exec 'NERDTreeRefreshRoot'
		silent! exec 'NERDTreeFocus'
		silent! exec 'wincmd l'
		exec 'echo "File Deleted"'
endfunction

command! -nargs=* DelFile call DeleteFile()

" ==== Rename file and buffer
command! -nargs=* -complete=file -bang Rename call Rename(<q-args>, '<bang>')

function! Rename(name, bang)
	let l:name    = a:name
	let l:oldfile = expand('%:p')

	if bufexists(fnamemodify(l:name, ':p'))
		if (a:bang ==# '!')
			silent exe bufnr(fnamemodify(l:name, ':p')) . 'bwipe!'
		else
			echohl ErrorMsg
			echomsg 'A buffer with that name already exists (use ! to override).'
			echohl None
			return 0
		endif
	endif

	let l:status = 1
	
	let v:errmsg = ''
	silent! exe 'saveas' . a:bang . ' ' . l:name

	if v:errmsg =~# '^$\|^E329'
		let l:lastbufnr = bufnr('$')

		if expand('%:p') !=# l:oldfile && filewritable(expand('%:p'))
			if fnamemodify(bufname(l:lastbufnr), ':p') ==# l:oldfile
				silent exe l:lastbufnr . 'bwipe!'
			else
				echohl ErrorMsg
				echomsg 'Could not wipe out the old buffer for some reason.'
				echohl None
				let l:status = 0
			endif

			if delete(l:oldfile) != 0
				echohl ErrorMsg
				echomsg 'Could not delete the old file: ' . l:oldfile
				echohl None
				let l:status = 0
			endif
		else
			echohl ErrorMsg
			echomsg 'Rename failed for some reason.'
			echohl None
			let l:status = 0
		endif
	else
		echoerr v:errmsg
		let l:status = 0
	endif
	
	silent! exec 'NERDTreeRefreshRoot'
	return l:status
endfunction

