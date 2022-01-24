" =============================================================================
" File:          plugin/better-comments.vim
" Description:   Create more human-friendly comments in your code!
" Author:        Javier Blanco <http://jbgutierrez.info>
" =============================================================================

if ( exists('g:loaded_bettercomments') && g:loaded_bettercomments ) || v:version < 700 || &cp
  finish
endif
let g:loaded_bettercomments = 1

" Functions {{{

function! s:AddMatchesGroup(name, rules)
  let containedin=join(map(['LineComment'], 'b:bettercomments_syntax_prefix."".v:val'), ",").',Comment'
  exe 'syn match '.a:name.'BetterComments "\(^\s*\)\@<=\([^0-9A-Za-z_ ]\+ *\)\? \?\('.join(a:rules, '\|').'\)...\+" containedin='.containedin
  exe 'syn match '.a:name.'LineBetterComments "\(\/\{2\}\|#\{1\}\|\"\{1\}\) *\('.join(a:rules, '\|').'\)...\+" containedin='.b:bettercomments_syntax_prefix.'LineComment'
endfunction

function! s:BetterComments()
  let language = substitute(&filetype, '\..*', '', '')
  if exists("g:bettercomments_skipped") |
    if index(g:bettercomments_skipped, language) > -1 | return | endif
  endif
  if exists("g:bettercomments_included") |
    if index(g:bettercomments_included, language) == -1 | return | endif
  endif

  let b:bettercomments_syntax_prefix = exists('g:bettercomments_language_aliases[language]') ? g:bettercomments_language_aliases[language] : language

  call s:AddMatchesGroup("Todo", [ 'TODO', 'NOTE' ])
  call s:AddMatchesGroup("Render", [ 'RENDER', 'RETURN'])
  call s:AddMatchesGroup("Event", [ 'EV', 'EVENT'])
  call s:AddMatchesGroup("Important", [ '!', 'IMPORTANT'])
  call s:AddMatchesGroup("Error", [ '!', 'ERROR'])
  call s:AddMatchesGroup("Warn", [ '@', 'WARN'])
  call s:AddMatchesGroup("Api", [ 'API'])
  call s:AddMatchesGroup("Fake", [ 'FAKE'])

  let containedin=join(map(['LineComment'], 'b:bettercomments_syntax_prefix."".v:val'), ",").',Comment'
  exe 'syn match StrikeoutBetterComments "\(\/\{4\}\|#\{2\}\|\"\{2\}\).\+" containedin='.containedin
endfunction

"}}}

" Autocommands {{{

augroup betterCommentsPluginAuto
  autocmd!
  au FileType * call s:BetterComments()
augroup END

" }}}

" Syntax {{{

hi def link TodoLineBetterComments DTodo
hi def link RenderLineBetterComments DRender
hi def link EventLineBetterComments DEvent
hi def link ImportantLineBetterComments DImportant
hi def link ErrorLineBetterComments DError
hi def link WarnLineBetterComments DWarn
hi def link ApiLineBetterComments DApi
hi def link FakeLineBetterComments DApi

hi DTodo guifg=#ffffff guibg=#39A635 guisp=NONE gui=italic cterm=NONE
hi DRender guifg=#ffffff guibg=#06AEED guisp=NONE gui=italic cterm=NONE
hi DEvent guifg=#ffffff guibg=#857c11 guisp=NONE gui=italic cterm=NONE
hi DImportant guifg=#ffffff guibg=#FF28EC guisp=NONE gui=italic cterm=NONE
hi DError guifg=#ffffff guibg=#EA2424 guisp=NONE gui=italic cterm=NONE
hi DWarn guifg=#ffffff guibg=#332b00 guisp=NONE gui=italic cterm=NONE
hi DApi guifg=#ffffff guibg=#ffca28 guisp=NONE gui=italic cterm=NONE
hi DFake guifg=#ffffff guibg=#ee9e70 guisp=NONE gui=italic cterm=NONE

"}}}

" vim:fen:fdm=marker:fmr={{{,}}}:fdl=0:fdc=1:ts=2:sw=2:sts=2
