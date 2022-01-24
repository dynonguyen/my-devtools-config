let s:file_extension_colors = {
  \ 'sass'     : s:pink,
  \ 'scss'     : s:pink,
  \ 'htm'      : s:darkOrange,
  \ 'html'     : s:darkOrange,
  \ 'ejs'      : s:yellow,
  \ 'css'      : s:blue,
  \ 'md'       : s:yellow,
  \ 'json'     : s:beige,
  \ 'js'       : s:beige,
  \ 'jsx'      : s:blue,
  \ 'php'      : s:purple,
  \ 'py'       : s:yellow,
  \ 'jpg'      : s:aqua,
  \ 'jpeg'     : s:aqua,
  \ 'bmp'      : s:aqua,
  \ 'png'      : s:aqua,
  \ 'webp'     : s:aqua,
  \ 'gif'      : s:aqua,
  \ 'ico'      : s:aqua,
  \ 'cpp'      : s:blue,
  \ 'c'        : s:blue,
  \ 'h'        : s:blue,
  \ 'java'     : s:purple,
  \ 'ps1'      : s:blue,
  \ 'db'       : s:blue,
  \ 'sql'      : s:darkBlue,
  \ 'go'       : s:beige,
  \ 'vim'      : s:green,
  \ 'ts'       : s:blue,
  \ 'tsx'      : s:blue,
\}

let s:file_node_exact_matches = {
  \ 'node_modules'                     : s:green
\}

let s:file_node_pattern_matches = {
  \ '.*jquery.*\.js$'       : s:blue
\}

let s:enabled_extensions = [
  \ 'c',
  \ 'cpp',
  \ 'cs',
  \ 'css',
  \ 'go',
  \ 'html',
  \ 'java',
  \ 'jpg',
  \ 'js',
  \ 'json',
  \ 'jsx',
  \ 'markdown',
  \ 'md',
  \ 'php',
  \ 'png',
  \ 'py',
  \ 'scss',
  \ 'sql',
  \ 'vim',
\]
