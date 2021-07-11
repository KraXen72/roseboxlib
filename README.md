# roseboxlib

a library that contains:
- utils.js - my universal js utils
- roseboxlib.css - rosebox style css

# usage
## web development / any general enviroment
utils.js: ``https://cdn.jsdelivr.net/gh/KraXen72/roseboxlib/utils.js``  
roseboxlib.css ``https://cdn.jsdelivr.net/gh/KraXen72/roseboxlib/roseboxlib.css``  
  
**importing**
  
import js: ``<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/KraXen72/roseboxlib/utils.js"></script>``    
import css in html: ``<link href="https://cdn.jsdelivr.net/gh/KraXen72/roseboxlib/roseboxlib.css" rel="stylesheet">``  
import css in css: ``@import url('https://cdn.jsdelivr.net/gh/KraXen72/roseboxlib/roseboxlib.css');``  

## using nodejs
this repo is a fully functional npm package so you can just ``yarn add https://github.com/KraXen72/roseboxlib.git --save`` or ``npm i https://github.com/KraXen72/roseboxlib.git --save-dev``  
  
then just import the files from ``./node_modules/roseboxlib`` depending on your enviroment  
example: electron  
``const utils = require('./node_modules/roseboxlib/utils.js')``