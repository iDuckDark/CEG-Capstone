#!/bin/bash
find . -type f \( -iname \*.js -o -iname \*.py -o -iname \*.jsx \)  -exec cat basename {} + | aha > foo.html
weasyprint foo.html out.pdf